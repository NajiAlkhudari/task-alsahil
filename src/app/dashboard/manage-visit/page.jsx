"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Loading from "./loading";
import Card from "@/components/ui/Card"; 
import { FaSearch } from "react-icons/fa";
import { useVisit } from "@/store/visitStore";

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
    amountReceived ,

  } = useVisit(); 

  const [localPageSize, setLocalPageSize] = useState(pageSize);
  const [searchName, setSearchName] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
  };

  const handleSearch = async () => {
    if (searchName.trim() === "") {
      await getVisits(1, localPageSize);
    } else {
      await getVisits(1, localPageSize, searchName  );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getVisits(1, localPageSize, searchName, firstDate, lastDate);
  }, [localPageSize, firstDate, lastDate]);
  
  const handleFirstDateChange = (event) => {
    setFirstDate(event.target.value);
  };

  const handleLastDateChange = (event) => {
    setLastDate(event.target.value);
  };
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("userName", {
      header: "الموظف",
      filterFn: "includesString",
    }),
    columnHelper.accessor("clientName", {
      header: "العميل",
      filterFn: "includesString",
    }),
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
      enableColumnFilter: false,
    }),

    columnHelper.accessor("amountReceived", { header: "المبلغ المقبوض",       enableColumnFilter: false,
    }),
    columnHelper.accessor("visitTasks", {
      header: "المهام",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.visitTasks.map((task, i) => (
            <div key={i}>
              {task.task?.taskName} •
            </div>
          ))}
        </div>
      ),
      enableColumnFilter: false,
    }),
    columnHelper.accessor("notes", { header: "ملاحظات" ,      enableColumnFilter: false,
    }),
];

  const table = useReactTable({
    data: visits,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        <div className="p-6 flex flex-row place-items-center justify-between">
         

        <div className="flex flex-row-reverse text-xl font-bold ">
      <label>الى: </label>
        <input
          type="date"
          id="lastdate"
          value={lastDate}
          onChange={handleLastDateChange}
          className="border-b  border-sky-900 text-xl"
        />
      </div>
          <div className="flex flex-row-reverse  text-xl font-bold">
        <label>من: </label>
        <input
          type="date"
          id="firstdate"
          value={firstDate}
          onChange={handleFirstDateChange}
          className="border-b  border-sky-900 text-xl"

        />
      </div>

  

      <div className="relative w-full sm:w-52 lg:w-64">
            <input
              type="text"
              placeholder="ابحث عن موظف او عميل ..."
              className="px-6 py-3 pl-10 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 shadow-md hover:shadow-lg"
              value={searchName}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">جدول الزيارات</h1>

        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-900">
            {table.getHeaderGroups().map((headerGroup) => (
          
              <tr key={headerGroup.id}>
  {headerGroup.headers.map((header) => (
    <th
      key={header.id}
      className="px-4 py-3 text-right text-xl font-semibold text-white"
    >
<div className="flex flex-row items-center justify-end   w-full">
{header.column.getCanFilter() && (
          <DebouncedInput
            type="text"
            value={(header.column.getFilterValue() ?? "")}
            onChange={(value) => header.column.setFilterValue(value)}
            placeholder={`بحث...`}
            className="ml-2 px-2 py-1 text-sm rounded shadow-sm w-32"
          />
        )}

        {flexRender(
          header.column.columnDef.header,
          header.getContext()
        )}
      </div>
    </th>
  ))}
</tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-xl font-semibold text-right text-black  border-b border-black"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-lg">
                  لا يوجد زيارات متاحة
                </td>
              </tr>
            )}
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
              {[10, 20, 100, 500, 1000 , 10000].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-600">
            عدد الزيارات الكلي: <span className="font-bold">{totalCount}</span>
          </p>
          <p className=" text-gray-600">
          اجمالي المبلغ المقبوض: <span className="text-green-700 text-xl font-bold">{amountReceived}</span>
          </p>
       
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
              aria-label="Previous Page"
            >
              <MdChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
              aria-label="Next Page"
            >
              <MdChevronRight size={24} />
            </button>
            <span className="font-medium ">
              الصفحة {currentPage} من {totalPage}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

// ========== مكون DebouncedInput ==========
function DebouncedInput({ value, onChange, debounce = 300, ...props }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <input
      {...props}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className=" mt-1 px-2 py-1 text-sm border-b rounded shadow-sm"
      />
  );
}

export default page;