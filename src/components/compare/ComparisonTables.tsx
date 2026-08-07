import type { CSSProperties } from 'react';
import type { ComparisonTable } from '@/content/competitor';

const tableKindLabels = {
  capability: '能力路径',
  poc: '同条件验证',
  tco: '成本与边界',
  selection: '选型判据',
  generic: '对照清单'
} as const;

export default function ComparisonTables({ table }: { table: ComparisonTable }) {
  const dataColumnCount = Math.max(table.columns.length - 1, 1);
  const gridTemplate = `minmax(9rem, 0.82fr) repeat(${dataColumnCount}, minmax(0, 1fr))`;

  return (
    <div
      className={`comparison-table comparison-table-${table.kind}`}
      role="table"
      aria-label={table.title || tableKindLabels[table.kind]}
      style={{ '--comparison-grid': gridTemplate } as CSSProperties}
    >
      <div className="comparison-table-caption" aria-hidden="true">
        <span>{tableKindLabels[table.kind]}</span>
        <span>{table.rows.length} 项对照</span>
      </div>
      <div className="comparison-table-head" role="row" style={{ gridTemplateColumns: 'var(--comparison-grid)' }}>
        {table.columns.map((column) => <div key={column} role="columnheader">{column}</div>)}
      </div>
      <div className="comparison-table-body" role="rowgroup">
        {table.rows.map((row) => (
          <div
            className="comparison-table-row"
            role="row"
            key={row.id}
            data-evidence-status={row.evidenceStatus}
            style={{ gridTemplateColumns: 'var(--comparison-grid)' }}
          >
            {row.cells.map((cell, index) => (
              <div
                className={index === 0 ? 'comparison-table-cell comparison-table-cell-key' : 'comparison-table-cell'}
                key={`${row.id}-${index}`}
                role="cell"
                data-label={table.columns[index] || '字段'}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
