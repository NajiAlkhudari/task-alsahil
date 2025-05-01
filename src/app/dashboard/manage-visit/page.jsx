"use client";
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import { useVisit } from '@/store/visitStore';
import React, { useEffect } from 'react'

const Page = () => {
  const {error , loading , visits , getVisits }= useVisit();

  useEffect(()=>{
    getVisits();
  },[])


  const columns = [
    { header: "الموظف", key: "userName" },
    { header: "العميل", key: "clientName" },
    { header: "التاريخ", key: "completionDate" },

    {
      header: "المهام",
      key: "visitTasks",
      format: (row) =>
        row.visitTasks.map((task, i) => (
          <div key={i}>
            <span className="font-semibold">•</span> {task.task?.taskName}
          </div>
        )),
    },
    { header: "ملاحظات", key: "notes" },

    { header: "الاجراء", key: "action" },
  ];
  return (
   <Card>
    <Table data={visits} columns={columns} />
   </Card>
  )
}

export default Page
