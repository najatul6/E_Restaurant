import Header from "@/components/RootView/common/Header";
import navItems from "@/lib/navItems";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <div className="flex flex-col bg-white">
      <Header
        logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT713g_RuPkX5SAz89Z4JchQvNKWU4ySSv5dA&s"
        navItems={navItems}
      />
      <hr />
      <div className="flex flex-col w-full">
        <Outlet />
      </div>
    </div>
  );
};


export default RootLayout;
