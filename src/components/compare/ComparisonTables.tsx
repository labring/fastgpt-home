import type { CSSProperties } from 'react';
import type { CompareLocale, ComparisonTable } from '@/content/competitor';
import { getComparisonCopy } from './comparisonCopy';

export default function ComparisonTables({ table, locale }: { table: ComparisonTable; locale: CompareLocale }) {
  const copy = getComparisonCopy(locale);
  const dataColumnCount = Math.max(table.columns.length - 1, 1);
  const gridTemplate = `minmax(9rem, 0.82fr) repeat(${dataColumnCount}, minmax(0, 1fr))`;

  return (
    <div
      className={`comparison-table comparison-table-${table.kind}`}
      role="table"
      aria-label={table.title || copy.tableLabels[table.kind]}
      style={{ '--comparison-grid': gridTemplate } as CSSProperties}
    >
      <div className="comparison-table-caption" aria-hidden="true">
        <span>{copy.tableLabels[table.kind]}</span>
        <span>{copy.tableRowCount(table.rows.length)}</span>
      </div>
      <div className="comparison-table-head" role="row">
        {table.columns.map((column) => <div key={column} role="columnheader">{column}</div>)}
      </div>
      <div className="comparison-table-body" role="rowgroup">
        {table.rows.map((row) => (
          <div
            className="comparison-table-row"
            role="row"
            key={row.id}
            data-evidence-status={row.evidenceStatus}
          >
            {row.cells.map((cell, index) => (
              <div
                className={index === 0 ? 'comparison-table-cell comparison-table-cell-key' : 'comparison-table-cell'}
                key={`${row.id}-${index}`}
                role="cell"
                data-label={table.columns[index] || copy.fallbackCellLabel}
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
