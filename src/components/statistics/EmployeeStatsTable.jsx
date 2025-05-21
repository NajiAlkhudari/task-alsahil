import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const EmployeeStatsTable = ({ customerStats }) => {
  const columns = [
    {
      header: "العميل",
      accessorKey: "customerName",
      cell: (info) => info.getValue(),
    },
    {
      header: "عدد الزيارات",
      accessorKey: "numberOfVisits",
      cell: (info) => info.getValue(),
    },
    {
      header: "إجمالي المدفوع",
      accessorKey: "totalAmountPaid",
      cell: (info) => `${info.getValue()} ليرة سورية`,
    },
    {
      header: "تاريخ آخر زيارة",
      accessorKey: "lastVisitDate",
      cell: (info) =>
        info.getValue()
          ? new Date(info.getValue()).toLocaleDateString("ar-EG")
          : "—",
    },
  ];

  const table = useReactTable({
    data: customerStats || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-blue-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-300 p-3 text-right text-sm font-semibold text-blue-700 uppercase tracking-wide select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-6 text-gray-500 italic"
              >
                لا توجد بيانات للعرض
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 cursor-pointer`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-gray-200 p-3 text-right text-gray-700 text-sm whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeStatsTable;
