"use client";
import React, { useEffect , useState} from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useStatics } from "@/store/staticStore";
import Card from "@/components/ui/Card";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const page = () => {
  const { loading, statics, getStatics } = useStatics();
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
  

const labels = statics.map((item) => item.name);
const data = {
  labels,
  datasets: [
    {
      label: "عدد الزيارات",
      data: statics.map((item) => item.visitCount),
      backgroundColor: "#f1c40f", 
      borderRadius: 10,
    },
       {
      label: " المبلغ القبوض",
      data: statics.map((item) => item.totalAmountReceived),
      backgroundColor: "#024a70", 
      borderRadius: 10,
    },
  ],
};



  useEffect(() => {
    getStatics(firstDate , lastDate);
  }, [firstDate, lastDate]);



    const handleFirstDateChange = (event) => {
    setFirstDate(event.target.value);
  };

  const handleLastDateChange = (event) => {
    setLastDate(event.target.value);
  };
  

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: "الموظف",
    }),
    columnHelper.accessor("visitCount", {
      header: "عدد الزيارات",
    }),
    columnHelper.accessor("totalAmountReceived", {
      header: "المبلغ الكلي",
      cell: (info) => info.getValue().toLocaleString(),
    }),
  ];

  const table = useReactTable({
    data: statics,
    columns,
    
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const options = {
  plugins: {
    title: {
      display: true,
    
      font: {
        size: 24,
      },
    },
    tooltip: {
      bodyFont: {
        size: 16,
      },
      titleFont: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 18,
        },
      },
      title: {
        display: true,
        font: {
          size: 24,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 18,
        },
      },
      title: {
        display: true,
        font: {
          size: 24,
        },
      },
    },
  },
};


  if (loading) {
    return (
      <div className="text-center py-10 text-xl text-sky-900 font-bold">
        جاري تحميل البيانات...
      </div>
    );
  }


  return (
    <>
<div className="flex flex-row items-start gap-4 m-4" dir="rtl">
  <div className="flex flex-col w-full max-w-xs">
    <label
      htmlFor="firstdate" 
      className="mb-1 text-sm font-medium text-gray-700 text-right"
    >
      من تاريخ
    </label>
    <input
      type="date"
      id="firstdate"
      value={firstDate}
      onChange={handleFirstDateChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white transition duration-200 text-right"
    />
  </div>

  <div className="flex flex-col w-full max-w-xs">
    <label
      htmlFor="lastdate"
      className="mb-1 text-sm font-medium text-gray-700 text-right"
    >
      إلى تاريخ
    </label>
    <input
      type="date"
      id="lastdate"
      value={lastDate}
      onChange={handleLastDateChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white transition duration-200 text-right"
    />
  </div>
</div>


      
<div className="lg:flex lg:gap-4 lg:items-start">

  <div className="w-full mb-4">
    <Card title="تقرير الموظفين">
      <div className="p-4">
        <Bar data={data} options={options} />
      </div>
    </Card>
  </div>

  <div className="lg:w-1/2 w-full">
    <Card title="انشطة الجميع">
  
      <div className="p-4 overflow-x-auto">
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
                  className="hover:bg-gray-50 transition-colors border-neutral-500"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3  font-bold text-right text-black"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-lg"
                >
                  لا يوجد إحصائيات متاحة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</div>

    </>
  );
};

export default page;
