"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {  FaRegUser } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";
import { MdOutlineTask } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";

import { GoTasklist } from "react-icons/go";
import Cookies from "js-cookie";
import Sidebar from "@/components/partials/sidebar/Sidebar";
import Avatar from "../ui/Avatar";
import { FaUserCircle } from "react-icons/fa";
import { useMeStore } from "@/store/meStore";
import NavMenu from "./sidebar/NavMenu";
import SubMenu from "./sidebar/Submenu";
import { TbTableColumn } from "react-icons/tb";

const Header = ({ isSidebarOpen, onSidebarToggle }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

const{getMe , name}= useMeStore();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigateToLogin = () => {
    Cookies.remove("token");
    router.push("/");
  };

  const handleSidebarItemClick = (path) => {
    if (path) {
      router.push(path);
      onSidebarToggle(false);
    }
  };


  useEffect(() => {
    if (!name) {
      getMe();
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 py-4 bg-white  ">
      <div className="container mx-auto flex justify-between items-center px-2  ">
        <button
          onClick={() => onSidebarToggle(true)}
          className="p-2 text-2xl  rounded-full text-sky-950 "
        >
          <TbTableColumn />
        </button>

        <div className="flex space-x-14 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-sky-900">
          لوحة التحكم
        </div>

        <nav className="hidden sm:flex items-center space-x-4 text-sm sm:text-base lg:text-lg ">
          <div className="border-l border-gray-600 h-6"></div>

          <div className="flex space-x-2">
            <div className="relative">
              <button
                className="text-sky-900 flex items-center"
                onClick={toggleDropdown}
              >
                <div className="flex items-center">
                  <Avatar
                    size="medium"
                    color="blue"
                    icon={<FaUserCircle size={25} />}
                  />
                </div>
                <div>{name}</div>
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-md mt-5 w-22 z-10">
                  <button
                    className="block w-full text-center  text-gray-950 px-4 py-2 text-sm"
                    onClick={navigateToLogin}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="border-l border-gray-600 h-6"></div>
        </nav>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => onSidebarToggle(false)}>
        <p className="text-center p-4 text-2xl font-bold text-gold">Task Log</p>
        <NavMenu title="القائمة">

                     <SubMenu
    label="المواعيد"
    icon={BsCalendarDate}
    subItems={[
      { label: " المواعيد المكتملة", path: "/dashboard/date-complete" },
      { label: "المواعيد قيد التنفيذ ", path: "/dashboard/date-progress" },
            { label: "اضافة موعد", path: "/dashboard/add-date" },

    ]}
    onClick={(path) => handleSidebarItemClick(path)}
  />
                   <SubMenu
            label="الزيارات"
            icon={GoTasklist}
            onClick={() => handleSidebarItemClick("/dashboard/manage-visit")}
          />
     <SubMenu
            label="احصائيات"
            icon={FcStatistics}
            onClick={() => handleSidebarItemClick("/dashboard/statistics")}
          />

               {/* <SubMenu
            label="المواعيد"
            icon={BsCalendarDate}
            onClick={() => handleSidebarItemClick("/dashboard/manage-date")}
          /> */}


          <SubMenu
            label="الموظفين"
            icon={FaRegUser}
            onClick={() => handleSidebarItemClick("/dashboard/manage-user")}
          />

          <SubMenu
            label="العملاء"
            icon={FaUserSecret}
            onClick={() => handleSidebarItemClick("/dashboard/manage-client")}
          />
          <SubMenu
            label="المهام"
            icon={MdOutlineTask}
            onClick={() => handleSidebarItemClick("/dashboard/managae-task")}
          />
 


          
  
        </NavMenu>
      </Sidebar>
    </header>
  );
};

export default Header;
