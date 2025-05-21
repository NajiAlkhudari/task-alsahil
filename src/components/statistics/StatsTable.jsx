// import {
//   useReactTable,
//   createColumnHelper,
//   getCoreRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("name", { header: "الموظف" }),
//   columnHelper.accessor("visitCount", { header: "عدد الزيارات" }),
//   columnHelper.accessor("totalAmountReceived", {
//     header: "المبلغ الكلي",
//     cell: (info) => info.getValue().toLocaleString(),
//   }),
// ];

// const StatsTable = ({ statics }) => {
//   const table = useReactTable({
//     data: statics,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   return (
//      <table className="min-w-full divide-y divide-gray-200 border-neutral-500">
//           <thead className="bg-sky-900">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-4 py-3 text-right  font-semibold text-white"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {table.getRowModel().rows.length > 0 ? (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="hover:bg-gray-50 transition-colors border-neutral-500"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td
//                       key={cell.id}
//                       className="px-4 py-3  font-bold text-right text-black"
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="text-center py-4 text-lg"
//                 >
//                   لا يوجد إحصائيات متاحة
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>  );
// };

// export default StatsTable;

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
    <table className="min-w-full divide-y divide-gray-200 border-neutral-500">
      <thead className="bg-sky-900">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-right  font-semibold text-white"
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
      <tbody className="bg-white divide-y divide-gray-100">
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer border-neutral-500"
              onClick={() => router.push(`/dashboard/statistics/${row.original.userId}`)} // نستخدم row.original.id للانتقال
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3  font-bold text-right text-black"
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
  );
};

export default StatsTable;
