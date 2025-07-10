import { Pencil, Trash2 } from 'lucide-react';

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  onDelete?: (row: T) => void;
  onEdit?: (row: T) => void;
};

export function Table<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider select-none">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor as string}
                className="p-3 border-b font-semibold"
              >
                {col.header}
              </th>
            ))}
            {onEdit && (
              <th className="p-3 border-b font-semibold text-center w-16">
                Edit
              </th>
            )}
            {onDelete && (
              <th className="p-3 border-b font-semibold text-center w-16">
                Delete
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.map((row, i) => (
            <tr
              key={row.id}
              className={`transition-colors duration-200 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor as string}
                  className="p-3 border-b align-middle max-w-xs truncate"
                  title={String(row[col.accessor])}
                >
                  {String(row[col.accessor])}
                </td>
              ))}
              {onEdit && (
                <td className="p-3 border-b text-center align-middle">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </td>
              )}
              {onDelete && (
                <td className="p-3 border-b text-center align-middle">
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
