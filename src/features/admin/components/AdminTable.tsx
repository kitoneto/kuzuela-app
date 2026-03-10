interface Column<T> { key: keyof T; label: string; render?: (v: T) => React.ReactNode; }
interface Props<T> { data: T[]; columns: Column<T>[]; }
export function AdminTable<T extends { id: string }>({ data, columns }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>{columns.map(c=><th key={String(c.key)} className="text-left px-4 py-3 font-semibold text-gray-600">{c.label}</th>)}</tr>
        </thead>
        <tbody>{data.map(row=>(
          <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
            {columns.map(c=><td key={String(c.key)} className="px-4 py-3 text-gray-700">{c.render ? c.render(row) : String(row[c.key] ?? '')}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
