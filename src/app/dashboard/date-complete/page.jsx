"use client"
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import { useVisit } from '@/store/visitStore';
import React, { useEffect } from 'react'

const page = () => {


    const { visits, loading, error, getVisitAllComplete } = useVisit();

    useEffect(() => {
        (
            getVisitAllComplete()
        )
    }, []);

    const columns = [
        { header: "الموظف", key: "userName" },
        { header: "العميل", key: "clientName" },
        { header: "المبلغ المقبوض", key: "amountReceived" },
        {
            header: "المهام",
            key: "taskName",
            format: (row) =>
                row.visitTasks?.map(v => v.task?.taskName).join(", ") || "لا يوجد"
        },

        {
            header: "التاريخ",
            key: "completionDate",
            format: (row) =>
                new Date(row.completionDate).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
        }


    ];
    return (
        <>
            <div>
                <Card title="المواعيد المنفذة ">
                    <Table data={visits} columns={columns} />
                </Card>
            </div>
        </>
    )
}

export default page