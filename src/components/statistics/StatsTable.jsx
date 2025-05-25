

"use client";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", { header: "الموظف" }),
  columnHelper.accessor("visitCount", { header: "عدد الزيارات" }),
  columnHelper.accessor("totalAmountReceived", {
    header: "المبلغ الكلي",
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

const StatsTable = ({ statics }) => {
  const router = useRouter();

  const table = useReactTable({
    data: statics,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
                  className="border-b border-gray-300 p-3 text-right text-xl font-semibold text-blue-700 uppercase tracking-wide select-none"
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
      <tbody className="">
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-100 transition-colors cursor-pointer border-neutral-500"
              onClick={() => router.push(`/dashboard/statistics/${row.original.userId}`)} 
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
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4 text-lg">
              لا يوجد إحصائيات متاحة
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default StatsTable;
