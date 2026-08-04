import type { ComparisonTable } from '@/content/competitor';

export default function ComparisonTables({ table }: { table: ComparisonTable }) {
  return (
    <div className={`comparison-table comparison-table-${table.kind}`} role="table" aria-label={table.title}>
      <div className="comparison-table-head" role="row">
        {table.columns.map((column) => <div key={column} role="columnheader">{column}</div>)}
      </div>
      <div className="comparison-table-body">
        {table.rows.map((row) => (
          <div className="comparison-table-row" role="row" key={row.id}>
            {row.cells.map((cell, index) => (
              <div key={`${row.id}-${index}`} role="cell" data-label={table.columns[index] || '字段'}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
