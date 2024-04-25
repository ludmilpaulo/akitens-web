import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MdLaptop,
  MdContacts,
  MdBarChart,
  MdTableBar,
  MdLogout,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Products from "./Products";
import Report from './Report';
import { logoutUser, selectUser } from "@/redux/slices/authSlice";
import { basAPI, FornecedorType, useHeaderData } from "@/configs/variable";
import Order from "./Order";
import CustomersList from "./CustomersList";
import DriverList from "./DriverList";
import Services from "./Services";
import { Transition } from "@headlessui/react";

interface SidebarProps {
  fornecedor: FornecedorType | null;
  onNavClick?: (navItem: string) => void; // Callback function to notify the parent about a menu click
}

const Sidebar: React.FC<SidebarProps> = ({ fornecedor, onNavClick }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [listOfCustomer, setListOfCustomer ] = useState(false);
  const [listOfDriver, setListOfDriver ] = useState(false);
  const [loading, setLoading] = useState(false);


  const [notificationCount, setNotificationCount] = useState(0);

  const user = useSelector(selectUser);

  const headerData = useHeaderData();




  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default navigation behavior
    dispatch(logoutUser());
    router.push("/"); // Replace with the desired path after logout
  };
  useEffect(() => {
    const fetchOrderNotifications = async () => {
      try {
        // Get the user ID from wherever it's stored in your frontend (e.g., from the authentication state)
        const userId = user.user_id; // Replace user.user_id with the actual way to get the user ID
  
        // Generate the last_request_time dynamically
        const lastRequestTime = new Date().toISOString();
  
        console.log("Fetching order notifications...");
        const response = await fetch(`${basAPI}/orders/shop/order/notification/${userId}/${lastRequestTime}/`);
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch order notifications");
        }
        const data = await response.json();
        // Update notification count with the received data

        console.log("notification", data)
        setNotificationCount(data.notification);
      } catch (error) {
        console.error("Error fetching order notifications:", error);
      }
    };
  
    // Fetch order notifications initially
    fetchOrderNotifications();
  
    // Fetch order notifications every 5 seconds
  //  const intervalId = setInterval(fetchOrderNotifications, 5000);
  
    // Cleanup function
    return () => {
      // Clear interval when component unmounts
    //  clearInterval(intervalId);
    };
  }, [user]); // Run this effect whenever the user changes

  if (!headerData) {
    //setLoading(true)
    return <div>   <Transition
    show={loading}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
   {loading && (
<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
<div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
</div>
)}

  </Transition></div>;
  }
  
  return (
    <div className="flex h-screen">
      <nav className="w-64 h-screen p-4 text-white" style={{ backgroundImage: `url(${headerData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <ul className="space-y-4">
          {/* Profile Section */}
          <li className="flex items-center space-x-4">
            {fornecedor?.logo_url && ( // Check if logo_url is defined
              <div className="relative w-12 h-12">
                <Image
                  src={fornecedor.logo_url}
                  width={500}
                  height={300}
                  // layout="fill"
                  className="rounded-full"
                  alt=""
                />
                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
            )}

            <div>
              <h5 className="font-semibold">{fornecedor?.name}</h5>
              <span>{fornecedor?.name}</span>
            </div>
          </li>

          <li className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase">
            Painel
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              console.log("Produtos clicked!");
              setShowOrders(false);
              setShowReport(false);
              setListOfCustomer(false);
              setListOfDriver(false);
              setShowServices(false);
              setShowProducts(true);
              // Set showProducts to true when "Produtos" is clicked
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdContacts className="text-lg" />
              <span>Produtos</span>
              {notificationCount > 0 && (
                <span className="ml-auto px-2 py-1 bg-red-500 text-white rounded-full">
                  {notificationCount}
                </span>
              )}
            </Link>
          </li>
          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              console.log("Produtos clicked!");
              setShowOrders(false);
              setShowReport(false);
              setListOfCustomer(false);
              setListOfDriver(false);
              setShowServices(true);
              setShowProducts(false);
              // Set showProducts to true when "Produtos" is clicked
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdContacts className="text-lg" />
              <span>Servicos</span>
              {notificationCount > 0 && (
                <span className="ml-auto px-2 py-1 bg-red-500 text-white rounded-full">
                  {notificationCount}
                </span>
              )}
            </Link>
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              setShowProducts(false);
              setShowReport(false);// Add this
              setListOfCustomer(false);
              setListOfDriver(false);
              setShowServices(false);
              setShowOrders(true);

              onNavClick && onNavClick("Pedidos");
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdLaptop className="text-lg" />
              <span>Pedidos</span>
            </Link>
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              setShowProducts(false);
              setShowOrders(false);
              setListOfCustomer(false);
              setListOfDriver(false);
              setShowServices(false);
              setShowReport(true);
              onNavClick && onNavClick("Pedidos");
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdBarChart className="text-lg" />
              <span>Relatórios</span>
            </Link>
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              setShowProducts(false);
              setShowOrders(false);
              setShowReport(false);// Add this
              setListOfDriver(false);
              setListOfCustomer(true);
              setShowServices(false);
              onNavClick && onNavClick("Pedidos");
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdTableBar className="text-lg" />
              <span>Clientes</span>
            </Link>
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              setShowProducts(false);
              setShowOrders(false);
              setShowReport(false);// Add this
              setListOfCustomer(false);
              setListOfDriver(true);
              setShowServices(false);
              onNavClick && onNavClick("Pedidos");
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdBarChart className="text-lg" />
              <span>Motoristas</span>
            </Link>
          </li>

          <li
            className="p-2 rounded hover:bg-blue-500"
            onClick={() => {
              console.log("Pedidos clicked!"); // Add this
              onNavClick && onNavClick("Pedidos");
            }}
          >
            <Link className="flex items-center space-x-3" href={""}>
              <MdContacts className="text-lg" />
              <span>Conta</span>
            </Link>
          </li>

          {/* Menu Items */}

          {/* Logout */}
          <li className="p-2 mt-4 rounded hover:bg-red-500">
            <Link href="">
              <div
                onClick={handleLogout}
                className="flex items-center space-x-3 text-red-400 cursor-pointer"
              >
                <MdLogout className="text-lg" />
                <span>Sair</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-1 overflow-y-auto" style={{ backgroundImage: `url(${headerData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {showServices && <Services />}  {showProducts && <Products />} {showOrders && <Order />} {showReport && <Report />} {listOfCustomer && <CustomersList />}{listOfDriver && <DriverList />}{" "}
        {/* Conditionally render Products based on showProducts state */}
      </div>
    </div>
  );
};

export default Sidebar;