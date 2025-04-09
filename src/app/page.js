"use client"
import Login from "@/components/partials/login/Login";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
    <div className=" lg:flex hidden ">
          <Image
            // className="dark:invert"
            src="/task3.jpg"
            width={400}
            height={400}
            alt="Picture of the author"
            loading = 'lazy'
            layout="responsive"
          />
        </div>
        <div className=" bg-gray-100 flex items-center justify-center ">
    
  <Login />
</div>
      </div>
    </>
  );
}
