import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPricetagOutline } from "react-icons/io5";
import { IoListOutline } from "react-icons/io5";
// import { IoPersonOutline } from "react-icons/io5";

export const links = [
    { li: "dashboard", path: "/admin" , icon: IoHomeOutline },
    { li: "products", path: "/admin/products" , icon: IoCartOutline },
    { li: "categories", path: "/admin/categories" , icon: IoPricetagOutline },
    { li: "orders", path: "/admin/orders" , icon: IoListOutline },
    // { li: "user", path: "/admin/user" , icon: IoPersonOutline },
];