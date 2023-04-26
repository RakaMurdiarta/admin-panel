import { RiDashboard3Line, RiAdminLine } from "react-icons/ri";
import { BsCartCheck } from "react-icons/bs";
import { TbCategory, TbReport } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";

export {
  RiDashboard3Line,
  RiAdminLine,
  BsCartCheck,
  TbCategory,
  TbReport,
  BiUserCircle,
};

export const sidebarItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboard3Line,
  },
  {
    name: "Products",
    path: "/products",
    icon: BsCartCheck,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: TbCategory,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: TbReport,
  },
  {
    name: "Users",
    path: "/users",
    icon: BiUserCircle,
  },
];
