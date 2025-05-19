"use client";
import React from "react";
import Link from "next/link";
import { FaUserTie, FaUsers, FaClipboardList } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";

const page = () => {


  const features = [
    {
      icon: <MdOutlinePlace className="text-red-600 text-3xl mb-2" />,
      title: "الزيارات",
      description: "تتبع زيارات الموظفين للعملاء.",
      href: "/dashboard/manage-visit",
    },
    {
      icon: <FcStatistics className="text-red-600 text-3xl mb-2" />,
      title: "الاحصائيات",
      description: "تتبع احصائيات الموظفين حيث عدد الزيارات و اجمالي المبلغ المقبوض.",
      href: "/dashboard/statistics",
    },
    {
      icon: <FaClipboardList className="text-purple-600 text-3xl mb-2" />,
      title: "المهام",
      description: "إضافة ومتابعة المهام الموكلة للموظفين.",
      href: "/dashboard/managae-task",
    },
    {
      icon: <FaUsers className="text-green-600 text-3xl mb-2" />,
      title: "العملاء",
      description: "عرض وإدارة بيانات العملاء.",
      href: "/dashboard/manage-client",
    },
    {
      icon: <FaUserTie className="text-blue-600 text-3xl mb-2" />,
      title: "الموظفون",
      description: "إدارة معلومات الموظفين وصلاحياتهم.",
      href: "/dashboard/manage-user",
    },
 

  ];

  return (
      <div className="max-w-4xl mx-auto">


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features
            .filter((feature) => feature)
            .map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer hover:bg-gray-100"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </Link>
            ))}
        </div>
      </div>

  );
};

export default page;
