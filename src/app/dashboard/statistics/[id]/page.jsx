"use client";
import { useEffect } from "react";
import { useStatics } from "@/store/staticStore";
import { useParams } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import {  FaRegUser } from "react-icons/fa";
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import EmployeeStatsTable from "@/components/statistics/EmployeeStatsTable";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

const page =()=> {
  const { id } = useParams();
  const { getEmployeeStats, employeeStats, loading, error } = useStatics();

  useEffect(() => {
    if (id) getEmployeeStats(id);
  }, [id]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ: {error}</p>;
  if (!employeeStats) return <p>لا توجد بيانات.</p>;

const data = {
  labels: ['صيانة', 'تدريب'],
  datasets: [
    {
      label: 'عدد العمليات',
      data: [ employeeStats.maintenanceVisits , employeeStats.trainingVisits],
      backgroundColor: [ '#ff7043' ,'#18ffff'], 
      borderColor: ['#0ea5e9', '#8b5cf6'],
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: 'Tajawal', size: 14 },
        color: '#333',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.parsed}`;
        },
      },
    },
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold',
        size: 16,
        family: 'Tajawal'
      },
      formatter: (value, context) => {
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((acc, val) => acc + val, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${percentage}%`;
      },
    },
  },
};



  return (
    <>

    <div className="p-4">
<div className="bg-white w-full p-8 flex flex-row justify-start items-start gap-8 rounded-2xl" dir="rtl">
  <div className=" p-4 rounded-lg flex items-center gap-4">
    <Avatar
      icon={<FaRegUser />}
      color="sky"
      size="large"
    />

    <div className="flex flex-col text-right">
      <h1 className="text-gray-700 text-xl">الموظف:</h1>
      <p className="font-bold text-gray-900 text-2xl">{employeeStats.employeeName}</p>
    </div>
  </div>

  <div className="bg-blue-100 p-4 rounded-lg">
    <h1 className="text-right text-gray-700 text-xl">
      عدد الزيارات:
           </h1>
          <p className="font-bold text-gray-900 text-2xl text-center">{employeeStats.totalVisits}</p>
 
  </div>
  
  <div className="bg-cyan-100 p-4 rounded-lg">
    <h1 className="text-right text-gray-700 text-xl">
      عدد زيارات الصيانة:
           </h1>
          <p className="font-bold text-gray-900 text-2xl text-center">{employeeStats.maintenanceVisits}</p>
 
  </div>
  
  <div className="bg-amber-100 p-4 rounded-lg">
    <h1 className="text-right text-gray-700 text-xl">
      عدد زيارات التدريب:
           </h1>
          <p className="font-bold text-gray-900 text-2xl text-center">{employeeStats.trainingVisits}</p>
 
  </div>

   <div className="bg-green-100 p-4 rounded-lg">
    <h1 className="text-right text-gray-700 text-xl">
        اجمالي المبلغ المقبوض:
           </h1>
          <p className="font-bold text-gray-900 text-2xl text-center">{employeeStats.totalAmountCollected}</p>
 
  </div>
</div>
</div>
<div className="flex flex-col md:flex-row gap-8" dir="rtl">
  <div className="bg-white p-6 rounded-lg shadow-md flex-1 max-w-md">
    <h2 className="text-xl font-bold mb-4 text-right text-gray-800">إحصائيات الزيارات</h2>
    <Pie data={data} options={options} />
  </div>

  <div className="flex-1 min-w-0">
    <h2 className="text-xl font-bold mb-4 text-right">إحصائيات عملاء الموظف:</h2>
    <EmployeeStatsTable customerStats={employeeStats.customerStats} />
  </div>
</div>

    </>
  );
}
export default page;
