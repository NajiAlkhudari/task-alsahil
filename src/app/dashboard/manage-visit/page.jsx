"use client";
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import { useVisit } from '@/store/visitStore';
import React, { useEffect } from 'react'

const page = () => {
  const {error , loading , visits , getVisits }= useVisit();

  useEffect(()=>{
    getVisits();
  },[getVisits])


  const columns = [
    { header: "ID", key: "id" },
    { header: "User", key: "userId" },
    { header: "Client", key: "clientId" },
    { header: "Date", key: "completionDate" },
    {
      header: "Tasks",
      key: "visitTasks",
      format: (row) =>
        row.visitTasks.map((task, i) => (
          <div key={i}>
            <span className="font-semibold">•</span> {task.task?.taskName}
          </div>
        )),
    },
    { header: "Action", key: "action" },
  ];
  return (
   <Card>
    <Table data={visits} columns={columns} />
   </Card>
  )
}

export default page
