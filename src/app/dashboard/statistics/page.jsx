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
  ],
};



  useEffect(() => {
    getStatics(firstDate , lastDate);
  }, [getStatics]);


  

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
<div className="lg:flex lg:gap-4 lg:items-start">
  <div className="lg:w-1/2 w-full mb-4">
    <Card title="مخطط عدد الزيارات">
      <div className="p-4">
        <Bar data={data} options={options} />
      </div>
    </Card>
  </div>

  <div className="lg:w-1/2 w-full">
    <Card title="الإحصائيات">
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
