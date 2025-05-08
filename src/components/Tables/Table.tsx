// components/common/Table.tsx
import React from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

export function Table<T extends { id: string }>({ columns, data }: Props<T>) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
