import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";
import {
  LogOutIcon,
  HomeIcon,
  AlignVerticalJustifyEnd,
  WeightIcon,
  ChartBarStacked,
} from "lucide-react"; // or any icon library

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <HomeIcon className='w-5 h-5' /> },
  {
    name: "Inventory Items",
    path: "/item",
    icon: <AlignVerticalJustifyEnd className='w-5 h-5' />,
  },
  {
    name: "Record Items",
    path: "/record",
    icon: <WeightIcon className='w-5 h-5' />,
  },
  {
    name: "categories",
    path: "/categories",
    icon: <ChartBarStacked className='w-5 h-5' />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className='h-screen w-60 bg-gray-900 text-white flex flex-col p-4 shadow-lg'>
      <h1 className='text-xl font-bold mb-6 text-center'>Shop Tracker</h1>

      <NavigationMenu orientation='vertical'>
        <NavigationMenuList className='flex flex-col gap-2'>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-2 rounded-lg transition ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <button className='mt-auto flex items-center gap-3 p-2 rounded-lg hover:bg-red-600 transition'>
        <LogOutIcon className='w-5 h-5' />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
