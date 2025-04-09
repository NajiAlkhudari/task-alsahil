"use client";
import React, { useState } from "react";
import Header from "@/components/partials/Header";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={(state) => setSidebarOpen(state)}
      />
      <main
        className={`p-6 transition-all duration-300 ${
          isSidebarOpen ? " md:ml-64" : "ml-0"
        }`}
      >
                     <Breadcrumbs />

        {children}
      </main>
    </div>
  );
};

export default Layout;