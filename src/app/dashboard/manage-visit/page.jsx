"use client";
import { useVisit } from "@/store/visitStore";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Loading from "./loading";
import Card from "@/components/ui/Card";
import { FaSearch } from "react-icons/fa";

const page = () => {
  const {
    error,
    loading,
    visits,
    getVisits,
    currentPage,
    totalPage,
    pageSize,
    totalCount,
  } = useVisit();

  const [localPageSize, setLocalPageSize] = useState(pageSize);
  const [searchName, setSearchName] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
  };

  const handleSearch = async () => {
    if (searchName.trim() === "") {
      await getVisits(1, localPageSize);
    } else {
      await getVisits(1, localPageSize, searchName);
    }
    setSearchName(searchName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getVisits(1, localPageSize);
  }, [localPageSize]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("userName", { header: "الموظف" }),
    columnHelper.accessor("clientName", { header: "العميل" }),
    columnHelper.accessor("completionDate", {
      header: "التاريخ",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("ar-EG", {
          weekday: "long",
          month: "numeric",
          day: "numeric",
        });
      },
    }),

    columnHelper.accessor("amountReceived", { header: "المبلغ المقبوض" }),
    columnHelper.accessor("visitTasks", {
      header: "المهام",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.visitTasks.map((task, i) => (
            <div key={i}>
              <span className="font-semibold"></span> {task.task?.taskName} •
            </div>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("notes", { header: "ملاحظات" }),
  ];

  const table = useReactTable({
    data: visits,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNext = () => {
    if (currentPage < totalPage) getVisits(currentPage + 1, localPageSize);
  };

  const handlePrev = () => {
    if (currentPage > 1) getVisits(currentPage - 1, localPageSize);
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setLocalPageSize(newSize);
    getVisits(1, newSize);
  };

  if (loading) return <Loading />;
  return (
    <>
      <Card>
        <div className="p-6 flex flex-row  place-items-center justify-between ">
          <div>
            <h1 className="text-2xl font-bold mb-4">جدول الزيارات</h1>
            </div>
            <div className=" relative w-full sm:w-52 lg:w-64">
              <input
                type="text"
                placeholder="ابحث عن موظف او عميل ..."
                className="px-6 py-3 pl-10 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 shadow-md hover:shadow-lg"
                value={searchName}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-right text-xl font-semibold text-white border-b"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm text-right text-gray-800 border-b"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="mr-2 font-medium">عدد العناصر بالصفحة:</label>
            <select
              value={localPageSize}
              onChange={handlePageSizeChange}
              className="px-3 py-1 border rounded"
            >
              {[10, 20, 50, 500, 1000].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-600">
            عدد الزيارات الكلي: <span className="font-bold">{totalCount}</span>
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
            >
              <MdChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
            >
              <MdChevronRight size={24} />
            </button>
            <span className="font-medium">
              الصفحة {currentPage} من {totalPage}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default page;
