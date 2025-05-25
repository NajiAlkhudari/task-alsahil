
"use client";
import React, { useEffect, useState } from "react";
import { useStatics } from "@/store/staticStore";
import Card from "@/components/ui/Card";
import StatsChart from "@/components/statistics/StatsChart";
import StatsTable from "@/components/statistics/StatsTable";

const Page = () => {
  const { loading, statics, getStatics } = useStatics();
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    getStatics(firstDate, lastDate);
  }, [firstDate, lastDate]);

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
          <label htmlFor="firstdate" className="mb-1 text-xl font-medium text-gray-700 text-right">
            من تاريخ
          </label>
          <input
            type="date"
            id="firstdate"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white transition duration-200 text-right"
          />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label htmlFor="lastdate" className="mb-1 text-xl font-medium text-gray-700 text-right">
            إلى تاريخ
          </label>
          <input
            type="date"
            id="lastdate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white transition duration-200 text-right"
          />
        </div>
      </div>

      <div className="lg:flex lg:gap-4 lg:items-start">
        <div className="w-full mb-4">
          <Card title="تقرير الموظفين">
            <div className="p-4">
              <StatsChart statics={statics} />
            </div>
          </Card>
        </div>

        <div className="lg:w-1/2 w-full">
          <Card title="انشطة الجميع">
            <div className="p-4 overflow-x-auto">
              <StatsTable statics={statics} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
