// Derivation for the technical-center interactive modules. Payloads ship with the page, so every
// value here comes from the data file the reader loaded: nothing is fetched, guessed or defaulted
// in code. Keep this module free of React and of JSON imports so Node can type-strip and test it.

export type TuningStatus = 'set' | 'fixed' | 'rewritten' | 'unavailable';

export type TuningValue = {
  parameter: string;
  status: TuningStatus;
  // Enum tokens are resolved to labels by the component; null means the reader's own setting.
  value: string | number | null;
  qualifier?: 'upper-bound' | 'model-limit';
  // Payload text shown verbatim next to the value, such as a cap expression.
  rule?: string;
};

export type ChunkIndexSettingsPayload = {
  minChunkSize: number;
  autoChunkSize: number;
  qaDefaultMaxChunkSize: number;
  defaultIndexSize: number;
  indexSizeOptions: number[];
  autoModeForced: {
    chunkSplitMode: string;
    paragraphChunkAIMode: string;
    paragraphChunkDeep: number;
    paragraphChunkMinSize: number;
    chunkSplitter: string | null;
  };
  customModeRules: {
    paragraphChunkDeepZeroUnlessParagraph: boolean;
    chunkSizeCappedBy: string;
    qaOverridesIndexSize: boolean;
  };
};

export type ChunkSelection = {
  trainingType: 'chunk' | 'qa' | 'image';
  settingMode: 'auto' | 'custom';
  chunkSplitMode: 'paragraph' | 'length' | 'delimiter';
  chunkSize: number;
  indexSize: number;
  fileCount: number;
  avgChars: number;
};

export type ChunkIndexSettings = {
  values: TuningValue[];
  estimates: { chunkCount: number | null; indexCount: number | null; chunkSize: number | null };
};

// Chunk and index counts follow from a character split only. QA pairs and image blocks are not cut
// by length, so the payload cannot answer those cases and the module reports them as unavailable.
export function resolveChunkIndexSettings(
  payload: ChunkIndexSettingsPayload,
  selection: ChunkSelection
): ChunkIndexSettings {
  const auto = selection.settingMode === 'auto';
  const forced = payload.autoModeForced;
  const rules = payload.customModeRules;
  const qa = selection.trainingType === 'qa';
  const paragraph = selection.chunkSplitMode === 'paragraph';

  const effectiveChunkSize = auto
    ? qa
      ? payload.qaDefaultMaxChunkSize
      : payload.autoChunkSize
    : selection.chunkSize;
  const totalChars = selection.fileCount * selection.avgChars;
  const splittable = selection.trainingType === 'chunk' && totalChars > 0 && effectiveChunkSize > 0;
  const chunkCount = splittable ? Math.ceil(totalChars / effectiveChunkSize) : null;

  const values: TuningValue[] = [
    auto
      ? { parameter: 'chunkSplitMode', status: 'rewritten', value: forced.chunkSplitMode }
      : { parameter: 'chunkSplitMode', status: 'set', value: selection.chunkSplitMode },
    auto
      ? {
          parameter: 'paragraphChunkAIMode',
          status: 'rewritten',
          value: forced.paragraphChunkAIMode
        }
      : { parameter: 'paragraphChunkAIMode', status: 'set', value: null },
    auto
      ? { parameter: 'paragraphChunkDeep', status: 'rewritten', value: forced.paragraphChunkDeep }
      : paragraph
      ? { parameter: 'paragraphChunkDeep', status: 'set', value: null }
      : {
          parameter: 'paragraphChunkDeep',
          status: 'rewritten',
          value: 0,
          rule: String(rules.paragraphChunkDeepZeroUnlessParagraph)
        },
    auto
      ? {
          parameter: 'paragraphChunkMinSize',
          status: 'rewritten',
          value: forced.paragraphChunkMinSize
        }
      : { parameter: 'paragraphChunkMinSize', status: 'set', value: null },
    auto
      ? {
          parameter: 'chunkSize',
          status: 'rewritten',
          value: effectiveChunkSize,
          qualifier: qa ? 'upper-bound' : undefined
        }
      : {
          parameter: 'chunkSize',
          status: 'set',
          value: selection.chunkSize,
          rule: rules.chunkSizeCappedBy
        },
    auto
      ? qa
        ? { parameter: 'indexSize', status: 'rewritten', value: null, qualifier: 'model-limit' }
        : { parameter: 'indexSize', status: 'rewritten', value: payload.defaultIndexSize }
      : qa
      ? { parameter: 'indexSize', status: 'rewritten', value: null, qualifier: 'model-limit' }
      : { parameter: 'indexSize', status: 'set', value: selection.indexSize },
    auto
      ? { parameter: 'chunkSplitter', status: 'rewritten', value: forced.chunkSplitter }
      : { parameter: 'chunkSplitter', status: 'set', value: null },
    { parameter: 'minChunkSize', status: 'fixed', value: payload.minChunkSize }
  ];

  return {
    values,
    // The counts need a character split to follow from; the effective size is known on its own.
    estimates: {
      chunkCount,
      indexCount: chunkCount,
      chunkSize: effectiveChunkSize > 0 ? effectiveChunkSize : null
    }
  };
}

export type ErrorCodeEntry = {
  code: number;
  module: string;
  statusText: string;
  enum: string;
  i18nKey: string;
  source: string;
};

export type ErrorCodePayload = {
  totalCodes: number;
  modules: Record<string, { base: number; count: number }>;
  ambiguousCodes: Record<string, { module: string; statusText: string; source: string }[]>;
  outliers: { code: number; module: string; statusText: string; base: number }[];
  codes: ErrorCodeEntry[];
};

export type ErrorCodeQuery = { code: string; module: string; keyword: string };

export type ErrorCodeResult = {
  matches: ErrorCodeEntry[];
  total: number;
  module: { name: string; base: number; count: number } | null;
  ambiguous: { code: string; options: { module: string; statusText: string }[] } | null;
  outlier: { code: number; module: string; statusText: string; base: number } | null;
};

// A code that two modules share matches both: showing one of them would read as a single correct
// answer, so the result carries every interpretation and the reader picks by statusText.
export function lookupErrorCodes(
  payload: ErrorCodePayload,
  query: ErrorCodeQuery
): ErrorCodeResult {
  const code = query.code.trim();
  const keyword = query.keyword.trim().toLowerCase();
  const matches = payload.codes.filter((entry) => {
    if (code && !String(entry.code).includes(code)) return false;
    if (query.module !== 'all' && entry.module !== query.module) return false;
    if (keyword) {
      const haystack = `${entry.statusText} ${entry.enum} ${entry.i18nKey}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });
  const ambiguous = payload.ambiguousCodes[code];
  const outlier = payload.outliers.find((entry) => String(entry.code) === code);
  const moduleEntry = query.module === 'all' ? null : payload.modules[query.module];

  return {
    matches,
    total: payload.totalCodes,
    module: moduleEntry ? { name: query.module, ...moduleEntry } : null,
    ambiguous: ambiguous
      ? {
          code,
          options: ambiguous.map(({ module: name, statusText }) => ({ module: name, statusText }))
        }
      : null,
    outlier: outlier ?? null
  };
}

export type EnvVariable = {
  name: string;
  group: string;
  default: string;
  enabledByDefault: boolean;
  note: string;
  noteEn: string;
};

export type EnvVariablePayload = {
  total: number;
  groups: Record<string, { count: number; withDefault: number; enabledByDefault: number }>;
  noDefault: string[];
  offByDefault: string[];
  variables: EnvVariable[];
};

export type EnvFeature = 'storage' | 'sandbox' | 'pdf' | 'chatlog' | 'commercial';
export type EnvDeployMode = 'single' | 'cluster' | 'external';

export type EnvSelection = {
  deployMode: EnvDeployMode;
  features: EnvFeature[];
  requiredOnly: boolean;
  includeDisabled: boolean;
};

export type EnvChecklist = {
  groups: {
    name: string;
    counts: EnvVariablePayload['groups'][string];
    variables: EnvVariable[];
  }[];
  stats: { listed: number; required: number; disabled: number };
};

// Each capability pulls in the payload groups (and the prefixed variables inside the shared service
// group) that only matter when it is used. Group names are payload keys; the regression test fails
// when a payload renames one.
const FEATURE_SCOPES: Record<EnvFeature, { groups: string[]; prefixes: string[] }> = {
  storage: { groups: ['对象存储'], prefixes: [] },
  sandbox: { groups: ['沙盒代理 (agent-sandbox-proxy) 与网络配置'], prefixes: ['AGENT_SANDBOX_'] },
  pdf: { groups: ['PDF 增强解析（可选）'], prefixes: [] },
  chatlog: { groups: ['对话日志推送（可选）'], prefixes: [] },
  commercial: { groups: [], prefixes: ['PRO_', 'CRM_'] }
};

const DATABASE_GROUP = '数据库与缓存';

export function envFeatureScopes(): typeof FEATURE_SCOPES {
  return FEATURE_SCOPES;
}

// A single-host deployment runs the built-in database and cache, so that group stays on its
// defaults. Cluster and external-dependency deployments fill it in, which is what pulls its
// off-by-default members into the checklist.
export function buildEnvChecklist(
  payload: EnvVariablePayload,
  selection: EnvSelection
): EnvChecklist {
  const scopes = selection.features.map((feature) => FEATURE_SCOPES[feature]);
  const inScope = (variable: EnvVariable) => {
    if (variable.enabledByDefault) return true;
    if (selection.includeDisabled) return true;
    if (variable.group === DATABASE_GROUP && selection.deployMode !== 'single') return true;
    return scopes.some(
      (scope) =>
        scope.groups.includes(variable.group) ||
        scope.prefixes.some((prefix) => variable.name.startsWith(prefix))
    );
  };

  const listed = payload.variables.filter(inScope);
  const required = listed.filter((variable) => variable.default === '');
  const groups = Object.keys(payload.groups)
    .map((name) => ({
      name,
      counts: payload.groups[name],
      variables: listed.filter((variable) =>
        selection.requiredOnly
          ? variable.group === name && variable.default === ''
          : variable.group === name
      )
    }))
    .filter((group) => group.variables.length > 0);

  return {
    groups,
    stats: {
      listed: listed.length,
      required: required.length,
      disabled: listed.filter((variable) => !variable.enabledByDefault).length
    }
  };
}

// Supporting data files are registered here: the renderer resolves a marker to a component by file
// name, and the version label tracks the payload rather than the component.
export const INTERACTIVE_DATA_FILES = [
  'a2-chunk-index-settings.json',
  'b3-error-code-lookup.json',
  'b4-env-variable-checklist.json'
];

export const PAYLOAD_RELEASES: Record<string, { version: string; verified: string }> = {
  'a2-chunk-index-settings.json': { version: 'v4.16.2', verified: '2026-09-09' },
  'b3-error-code-lookup.json': { version: 'v4.16.2', verified: '2026-09-09' },
  'b4-env-variable-checklist.json': { version: 'v4.16.2', verified: '2026-09-09' }
};
