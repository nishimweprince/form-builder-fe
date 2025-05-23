import React from 'react';
import { Pencil } from 'lucide-react'; // or any icon library you prefer

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void; // Optional edit handler
};

export function Table<T extends { id: string }>({ columns, data, onEdit }: Props<T>) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor as string} className="p-2 border-b font-semibold">
                {col.header}
              </th>
            ))}
            {onEdit && <th className="p-2 border-b font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.accessor as string} className="p-2 border-b">
                  {String(row[col.accessor])}
                </td>
              ))}
              {onEdit && (
                <td className="p-2 border-b">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit"
                  >
                    <Pencil className="w-4 h-4" />
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
