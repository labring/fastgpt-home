'use client';

import { useMemo, useState } from 'react';
import {
  buildEnvChecklist,
  lookupErrorCodes,
  PAYLOAD_RELEASES,
  resolveChunkIndexSettings,
  type ChunkIndexSettingsPayload,
  type ChunkSelection,
  type EnvDeployMode,
  type EnvFeature,
  type EnvVariablePayload,
  type ErrorCodePayload,
  type TuningValue
} from '@/lib/techInteractive';
import a2Settings from '@/content/tech-center/interactive/a2-chunk-index-settings.json';
import b3Codes from '@/content/tech-center/interactive/b3-error-code-lookup.json';
import b4Variables from '@/content/tech-center/interactive/b4-env-variable-checklist.json';
import styles from './InteractiveModule.module.css';

// Results are capped so a filtered list stays a readable table. The payloads hold at most a few
// hundred rows; raise this if a future payload grows past that.
// ponytail: fixed row cap, switch to paging if the payloads grow.
const MAX_RESULT_ROWS = 50;

type Copy = {
  version: string;
  verified: string;
  notProvided: string;
  fromSetting: string;
  modelLimit: string;
  upperBound: string;
  statuses: Record<TuningValue['status'], string>;
  tokens: Record<string, string>;
  parameters: Record<string, string>;
  groupLabels: Record<string, string>;
};

const COPY = {
  zh: {
    version: '取值口径',
    verified: '核验日',
    notProvided: '未提供',
    fromSetting: '按所设值',
    modelLimit: '向量模型最大长度（未提供）',
    upperBound: '（上限）',
    statuses: {
      set: '按所设值生效',
      fixed: '固定值',
      rewritten: '被改写',
      unavailable: '未提供'
    },
    tokens: {
      paragraph: '按段落',
      length: '按长度',
      delimiter: '按分隔符',
      forbid: '禁用',
      cleared: '被清空'
    },
    parameters: {
      chunkSplitMode: '分段方式',
      paragraphChunkAIMode: '段落 AI 识别',
      paragraphChunkDeep: '段落深度',
      paragraphChunkMinSize: '段落最小长度',
      chunkSize: '分块长度',
      indexSize: '索引长度',
      chunkSplitter: '自定义分隔符',
      minChunkSize: '分块长度下限'
    },
    groupLabels: {}
  },
  en: {
    version: 'Values from',
    verified: 'Verified',
    notProvided: 'Not provided',
    fromSetting: 'Your setting',
    modelLimit: 'Embedding model maximum length (not provided)',
    upperBound: ' (upper bound)',
    statuses: {
      set: 'Applied as set',
      fixed: 'Fixed value',
      rewritten: 'Rewritten',
      unavailable: 'Not provided'
    },
    tokens: {
      paragraph: 'By paragraph',
      length: 'By length',
      delimiter: 'By delimiter',
      forbid: 'Disabled',
      cleared: 'Cleared'
    },
    parameters: {
      chunkSplitMode: 'Split mode',
      paragraphChunkAIMode: 'Paragraph AI detection',
      paragraphChunkDeep: 'Paragraph depth',
      paragraphChunkMinSize: 'Paragraph minimum size',
      chunkSize: 'Chunk size',
      indexSize: 'Index size',
      chunkSplitter: 'Custom delimiter',
      minChunkSize: 'Chunk size lower bound'
    },
    groupLabels: {
      基础配置: 'Basic configuration',
      密钥: 'Secrets',
      服务地址与集成: 'Service addresses and integrations',
      '沙盒代理 (agent-sandbox-proxy) 与网络配置': 'Sandbox proxy and network',
      对象存储: 'Object storage',
      数据库与缓存: 'Database and cache',
      日志配置: 'Logging',
      域名与前端: 'Domain and frontend',
      安全配置: 'Security',
      功能开关与特殊配置: 'Feature switches',
      '对话日志推送（可选）': 'Chat log push (optional)',
      并发控制与限制: 'Concurrency and limits',
      资源限制: 'Resource limits',
      'PDF 增强解析（可选）': 'Enhanced PDF parsing (optional)',
      知识库处理并发控制: 'Knowledge base processing concurrency'
    }
  }
} as const satisfies Record<string, Copy>;

function VersionChips({
  copy,
  release,
  extra
}: {
  copy: Copy;
  release: { version: string; verified: string };
  extra?: string[];
}) {
  return (
    <div className={styles.chips}>
      <span className={styles.chip}>
        {copy.version} <b>{release.version}</b>
      </span>
      <span className={styles.chip}>
        {copy.verified} <b>{release.verified}</b>
      </span>
      {(extra ?? []).map((item) => (
        <span className={styles.chip} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function TuningRow({ value, copy }: { value: TuningValue; copy: Copy }) {
  const tokens = copy.tokens as Record<string, string>;
  let rendered: string;
  if (value.value === null) {
    rendered =
      value.qualifier === 'model-limit'
        ? copy.modelLimit
        : value.status === 'set'
        ? copy.fromSetting
        : copy.notProvided;
  } else if (typeof value.value === 'string') {
    rendered = tokens[value.value] ?? value.value;
  } else {
    rendered = String(value.value) + (value.qualifier === 'upper-bound' ? copy.upperBound : '');
  }

  return (
    <tr>
      <td>{(copy.parameters as Record<string, string>)[value.parameter] ?? value.parameter}</td>
      <td>
        <code>{value.parameter}</code>
      </td>
      <td className={styles.value}>{rendered}</td>
      <td>
        <span className={styles.tag}>{copy.statuses[value.status]}</span>
        {value.rule && <code className={styles.rule}>{value.rule}</code>}
      </td>
    </tr>
  );
}

function ChunkIndexEstimator({
  payload,
  copy,
  locale,
  release
}: {
  payload: ChunkIndexSettingsPayload;
  copy: Copy;
  locale: string;
  release: { version: string; verified: string };
}) {
  const zh = locale === 'zh';
  // Initial control state matches the defaults in the page tables; every parameter value itself
  // comes from the payload.
  const [selection, setSelection] = useState<ChunkSelection>({
    trainingType: 'chunk',
    settingMode: 'auto',
    chunkSplitMode: 'paragraph',
    chunkSize: payload.autoChunkSize,
    indexSize: payload.defaultIndexSize,
    fileCount: 0,
    avgChars: 0
  });
  const [fileCount, setFileCount] = useState('');
  const [avgChars, setAvgChars] = useState('');
  const auto = selection.settingMode === 'auto';
  const qa = selection.trainingType === 'qa';
  const update = (patch: Partial<ChunkSelection>) =>
    setSelection((current) => ({ ...current, ...patch }));
  const positive = (value: string) => (Number(value) > 0 ? Number(value) : 0);
  const settings = useMemo(
    () =>
      resolveChunkIndexSettings(payload, {
        ...selection,
        fileCount: positive(fileCount),
        avgChars: positive(avgChars)
      }),
    [payload, selection, fileCount, avgChars]
  );

  const labels = {
    trainingType: zh ? '处理方式' : 'Processing mode',
    chunkSettingMode: zh ? '设置方式' : 'Setting mode',
    chunkSplitMode: zh ? '分段方式' : 'Split mode',
    chunkSize: zh ? '分块长度' : 'Chunk size',
    indexSize: zh ? '索引长度' : 'Index size',
    fileCount: zh ? '文件数' : 'Files',
    avgChars: zh ? '平均字数' : 'Average characters per file',
    autoForces: zh ? '自动方式下不生效' : 'No effect in auto mode',
    effective: zh ? '各参数实际生效的值' : 'Effective value of each parameter',
    estimates: zh ? '按字数估算' : 'Estimated from character count',
    chunkCount: zh ? '分块条数' : 'Chunks',
    indexCount: zh ? '索引条数' : 'Index entries',
    effectiveChunkSize: zh ? '生效分块长度' : 'Effective chunk size'
  };

  return (
    <section className={styles.module} aria-label={labels.effective}>
      <div className={styles.head}>
        <VersionChips
          copy={copy}
          release={release}
          extra={[
            `${copy.parameters.indexSize} ${payload.defaultIndexSize}`,
            `${copy.parameters.minChunkSize} ${payload.minChunkSize}`
          ]}
        />
      </div>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>{labels.trainingType}</span>
          <select
            value={selection.trainingType}
            onChange={(event) =>
              update({ trainingType: event.target.value as ChunkSelection['trainingType'] })
            }
          >
            <option value="chunk">{zh ? '直接分段' : 'Direct split'}</option>
            <option value="qa">{zh ? '问答拆分' : 'QA split'}</option>
            <option value="image">{zh ? '图片解析' : 'Image parsing'}</option>
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.chunkSettingMode}</span>
          <select
            value={selection.settingMode}
            onChange={(event) =>
              update({ settingMode: event.target.value as ChunkSelection['settingMode'] })
            }
          >
            <option value="auto">{zh ? '自动' : 'Auto'}</option>
            <option value="custom">{zh ? '自定义' : 'Custom'}</option>
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.chunkSplitMode}</span>
          <select
            disabled={auto}
            value={selection.chunkSplitMode}
            onChange={(event) =>
              update({ chunkSplitMode: event.target.value as ChunkSelection['chunkSplitMode'] })
            }
          >
            <option value="paragraph">{copy.tokens.paragraph}</option>
            <option value="length">{copy.tokens.length}</option>
            <option value="delimiter">{copy.tokens.delimiter}</option>
          </select>
          {auto && <span className={styles.hint}>{labels.autoForces}</span>}
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.chunkSize}</span>
          <input
            disabled={auto}
            min={payload.minChunkSize}
            type="number"
            value={selection.chunkSize}
            onChange={(event) => update({ chunkSize: Number(event.target.value) })}
          />
          {auto && <span className={styles.hint}>{labels.autoForces}</span>}
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.indexSize}</span>
          <select
            disabled={auto || qa}
            value={selection.indexSize}
            onChange={(event) => update({ indexSize: Number(event.target.value) })}
          >
            {payload.indexSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {(auto || qa) && <span className={styles.hint}>{labels.autoForces}</span>}
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.fileCount}</span>
          <input
            min="0"
            type="number"
            value={fileCount}
            onChange={(event) => setFileCount(event.target.value)}
          />
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{labels.avgChars}</span>
          <input
            min="0"
            type="number"
            value={avgChars}
            onChange={(event) => setAvgChars(event.target.value)}
          />
        </label>
      </div>

      <div className={styles.stats} aria-live="polite">
        <div>
          <span>{labels.chunkCount}</span>
          <b>{settings.estimates.chunkCount ?? copy.notProvided}</b>
        </div>
        <div>
          <span>{labels.indexCount}</span>
          <b>{settings.estimates.indexCount ?? copy.notProvided}</b>
        </div>
        <div>
          <span>{labels.effectiveChunkSize}</span>
          <b>{settings.estimates.chunkSize ?? copy.notProvided}</b>
        </div>
        <p className={styles.statNote}>{labels.estimates}</p>
      </div>

      <div className={styles.tableWrap} tabIndex={0} role="region">
        <table>
          <caption>{labels.effective}</caption>
          <thead>
            <tr>
              <th scope="col">{zh ? '参数' : 'Parameter'}</th>
              <th scope="col">{zh ? '参数名' : 'Name'}</th>
              <th scope="col">{zh ? '生效值' : 'Effective value'}</th>
              <th scope="col">{zh ? '状态' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {settings.values.map((value) => (
              <TuningRow key={value.parameter} value={value} copy={copy} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ErrorCodeLookup({
  payload,
  copy,
  locale,
  release
}: {
  payload: ErrorCodePayload;
  copy: Copy;
  locale: string;
  release: { version: string; verified: string };
}) {
  const zh = locale === 'zh';
  const [code, setCode] = useState('');
  const [module, setModule] = useState('all');
  const [keyword, setKeyword] = useState('');
  const result = useMemo(
    () => lookupErrorCodes(payload, { code, module, keyword }),
    [payload, code, module, keyword]
  );
  const rows = result.matches.slice(0, MAX_RESULT_ROWS);

  return (
    <section className={styles.module} aria-label={zh ? '错误码定位器' : 'Error code lookup'}>
      <div className={styles.head}>
        <VersionChips
          copy={copy}
          release={release}
          extra={[
            `${zh ? '错误码' : 'Codes'} ${result.total}`,
            `${zh ? '模块' : 'Modules'} ${Object.keys(payload.modules).length}`,
            `${zh ? '一码多解' : 'Shared codes'} ${Object.keys(payload.ambiguousCodes).length}`
          ]}
        />
      </div>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>{zh ? '错误码' : 'Error code'}</span>
          <input
            inputMode="numeric"
            placeholder={zh ? '例如 500001' : 'e.g. 500001'}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ''))}
          />
        </label>
        <label className={styles.control}>
          <span className={styles.label}>{zh ? '模块' : 'Module'}</span>
          <select value={module} onChange={(event) => setModule(event.target.value)}>
            <option value="all">{zh ? '全部模块' : 'All modules'}</option>
            {Object.keys(payload.modules).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.label}>
            {zh ? '关键字（statusText）' : 'Keyword (statusText)'}
          </span>
          <input
            placeholder={zh ? '例如 permission' : 'e.g. permission'}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>
      </div>

      {result.ambiguous && (
        <p className={styles.warn} role="status">
          {zh
            ? '这个码值对应多种错误，需要看 statusText 区分：'
            : 'This code maps to several errors; tell them apart by statusText: '}
          {result.ambiguous.options
            .map((option) => `${option.module} ${option.statusText}`)
            .join(' / ')}
        </p>
      )}
      {result.outlier && (
        <p className={styles.warn} role="status">
          {zh
            ? `这个码值不在 ${result.outlier.module} 的基码 ${result.outlier.base} 区间内，按 statusText 判断。`
            : `This code sits outside the ${result.outlier.base} base range of ${result.outlier.module}; judge it by statusText.`}
        </p>
      )}

      <div className={styles.stats} aria-live="polite">
        <div>
          <span>{zh ? '命中' : 'Matches'}</span>
          <b>{result.matches.length}</b>
        </div>
        <div>
          <span>{zh ? '全部错误码' : 'All codes'}</span>
          <b>{result.total}</b>
        </div>
        {result.module && (
          <div>
            <span>
              {result.module.name} {zh ? '基码' : 'base'}
            </span>
            <b>{result.module.base}</b>
          </div>
        )}
      </div>

      {rows.length === 0 ? (
        <p className={styles.note} role="status">
          {zh ? '没有匹配的条目。' : 'No matching entry.'}
        </p>
      ) : (
        <div className={styles.tableWrap} tabIndex={0} role="region">
          <table>
            <thead>
              <tr>
                <th scope="col">{zh ? '码值' : 'Code'}</th>
                <th scope="col">{zh ? '模块' : 'Module'}</th>
                <th scope="col">statusText</th>
                <th scope="col">{zh ? '枚举' : 'Enum'}</th>
                <th scope="col">i18nKey</th>
                <th scope="col">{zh ? '来源' : 'Source'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => (
                <tr key={`${entry.code}-${entry.module}-${entry.statusText}`}>
                  <td className={styles.value}>{entry.code}</td>
                  <td>{entry.module}</td>
                  <td>
                    <code>{entry.statusText}</code>
                  </td>
                  <td>{entry.enum}</td>
                  <td>
                    <code>{entry.i18nKey}</code>
                  </td>
                  <td>
                    <code>{entry.source}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {result.matches.length > rows.length && (
        <p className={styles.note}>
          {zh
            ? `命中 ${result.matches.length} 条，先显示前 ${rows.length} 条。`
            : `${result.matches.length} matches; showing the first ${rows.length}.`}
        </p>
      )}
    </section>
  );
}

const ENV_FEATURES: { id: EnvFeature; zh: string; en: string }[] = [
  { id: 'storage', zh: '对象存储', en: 'Object storage' },
  { id: 'sandbox', zh: '沙箱', en: 'Sandbox' },
  { id: 'pdf', zh: 'PDF 增强解析', en: 'Enhanced PDF parsing' },
  { id: 'chatlog', zh: '对话日志推送', en: 'Chat log push' },
  { id: 'commercial', zh: '商业版对接', en: 'Commercial edition' }
];

const ENV_DEPLOY_MODES: { id: EnvDeployMode; zh: string; en: string }[] = [
  { id: 'single', zh: '单机 Docker Compose', en: 'Single-host Docker Compose' },
  { id: 'cluster', zh: '集群', en: 'Cluster' },
  { id: 'external', zh: '已有外部依赖', en: 'External dependencies' }
];

function EnvChecklist({
  payload,
  copy,
  locale,
  release
}: {
  payload: EnvVariablePayload;
  copy: Copy;
  locale: string;
  release: { version: string; verified: string };
}) {
  const zh = locale === 'zh';
  const [deployMode, setDeployMode] = useState<EnvDeployMode>('single');
  const [features, setFeatures] = useState<EnvFeature[]>([]);
  const [requiredOnly, setRequiredOnly] = useState(false);
  const [includeDisabled, setIncludeDisabled] = useState(false);
  const checklist = useMemo(
    () => buildEnvChecklist(payload, { deployMode, features, requiredOnly, includeDisabled }),
    [payload, deployMode, features, requiredOnly, includeDisabled]
  );
  const labels = {
    deployMode: zh ? '部署形态' : 'Deployment shape',
    features: zh ? '要启用的能力' : 'Features to enable',
    requiredOnly: zh ? '只看必填' : 'Required only',
    includeDisabled: zh ? '包含默认关闭项' : 'Include off-by-default',
    listed: zh ? '本次清单' : 'In checklist',
    required: zh ? '必须自己填' : 'Must fill in',
    disabled: zh ? '默认关闭' : 'Off by default',
    variable: zh ? '变量名' : 'Variable',
    default: zh ? '默认值' : 'Default',
    status: zh ? '状态' : 'Status',
    note: zh ? '说明' : 'Notes',
    noDefault: zh ? '无默认值' : 'No default',
    mustFill: zh ? '必须自己填' : 'Must fill in',
    onByDefault: zh ? '默认启用' : 'On by default',
    offByDefault: zh ? '默认关闭' : 'Off by default',
    noNote: zh ? '模板未附说明' : 'No note in the template',
    variables: zh ? '项' : 'variables'
  };

  return (
    <section
      className={styles.module}
      aria-label={zh ? '环境变量清单生成器' : 'Environment variable checklist'}
    >
      <div className={styles.head}>
        <VersionChips
          copy={copy}
          release={release}
          extra={[
            `${zh ? '变量' : 'Variables'} ${payload.total}`,
            `${zh ? '分组' : 'Groups'} ${Object.keys(payload.groups).length}`
          ]}
        />
      </div>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>{labels.deployMode}</span>
          <select
            value={deployMode}
            onChange={(event) => setDeployMode(event.target.value as EnvDeployMode)}
          >
            {ENV_DEPLOY_MODES.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {zh ? mode.zh : mode.en}
              </option>
            ))}
          </select>
        </label>
        <fieldset className={styles.control}>
          <legend className={styles.label}>{labels.features}</legend>
          {ENV_FEATURES.map((feature) => (
            <label className={styles.toggle} key={feature.id}>
              <input
                checked={features.includes(feature.id)}
                type="checkbox"
                onChange={(event) =>
                  setFeatures((current) =>
                    event.target.checked
                      ? [...current, feature.id]
                      : current.filter((item) => item !== feature.id)
                  )
                }
              />
              <span>{zh ? feature.zh : feature.en}</span>
            </label>
          ))}
        </fieldset>
        <div className={styles.control}>
          <span className={styles.label}>{zh ? '筛选' : 'Filters'}</span>
          <label className={styles.toggle}>
            <input
              checked={requiredOnly}
              type="checkbox"
              onChange={(event) => setRequiredOnly(event.target.checked)}
            />
            <span>{labels.requiredOnly}</span>
          </label>
          <label className={styles.toggle}>
            <input
              checked={includeDisabled}
              type="checkbox"
              onChange={(event) => setIncludeDisabled(event.target.checked)}
            />
            <span>{labels.includeDisabled}</span>
          </label>
        </div>
      </div>

      <div className={styles.stats} aria-live="polite">
        <div>
          <span>{labels.listed}</span>
          <b>{checklist.stats.listed}</b>
        </div>
        <div>
          <span>{labels.required}</span>
          <b>{checklist.stats.required}</b>
        </div>
        <div>
          <span>{labels.disabled}</span>
          <b>{checklist.stats.disabled}</b>
        </div>
      </div>

      {checklist.groups.map((group) => (
        <section className={styles.group} key={group.name}>
          <h3 className={styles.groupTitle}>
            {(copy.groupLabels as Record<string, string>)[group.name] ?? group.name}
            <span className={styles.groupCount}>
              {group.variables.length} / {group.counts.count} {labels.variables}
            </span>
          </h3>
          <div className={styles.tableWrap} tabIndex={0} role="region">
            <table>
              <thead>
                <tr>
                  <th scope="col">{labels.variable}</th>
                  <th scope="col">{labels.default}</th>
                  <th scope="col">{labels.status}</th>
                  <th scope="col">{labels.note}</th>
                </tr>
              </thead>
              <tbody>
                {group.variables.map((variable) => (
                  <tr key={variable.name}>
                    <td>
                      <code>{variable.name}</code>
                    </td>
                    <td className={styles.value}>
                      {variable.default === '' ? labels.noDefault : <code>{variable.default}</code>}
                    </td>
                    <td>
                      <span className={styles.tag}>
                        {variable.default === ''
                          ? labels.mustFill
                          : variable.enabledByDefault
                          ? labels.onByDefault
                          : labels.offByDefault}
                      </span>
                    </td>
                    <td>{(zh ? variable.note : variable.noteEn) || labels.noNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </section>
  );
}

export default function InteractiveModule({
  data,
  locale = 'zh'
}: {
  module: string;
  data: string;
  locale?: string;
}) {
  const copy: Copy = locale === 'en' ? COPY.en : COPY.zh;
  const release = PAYLOAD_RELEASES[data];
  if (!release) return null;
  if (data === 'a2-chunk-index-settings.json') {
    return (
      <ChunkIndexEstimator payload={a2Settings} copy={copy} locale={locale} release={release} />
    );
  }
  if (data === 'b3-error-code-lookup.json') {
    return <ErrorCodeLookup payload={b3Codes} copy={copy} locale={locale} release={release} />;
  }
  if (data === 'b4-env-variable-checklist.json') {
    return <EnvChecklist payload={b4Variables} copy={copy} locale={locale} release={release} />;
  }
  return null;
}
