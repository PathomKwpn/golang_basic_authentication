import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiContractLeftLine, RiContractRightLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
const Navbar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: (
        <span>
          <FaHome size={18} />
        </span>
      ),
    },
    {
      label: "ChatAI",
      path: "/chatai",
      icon: (
        <span>
          <IoMdChatboxes size={18} />
        </span>
      ),
    },
  ];
  return (
    <aside
      className={`transition-all duration-300 bg-base-100 h-full p-4 shadow ${
        collapsed ? "w-24" : "w-64"
      }`}
    >
      <div
        className={`flex relative ${
          collapsed ? "justify-center" : ""
        } text-[28px] font-bold mb-4 transition-all duration-100 ease-in-out`}
      >
        🅿️
        <span
          className={`ms-2 transition-all duration-300 ease-in-out `}
          style={{
            opacity: collapsed ? 0 : 1,
            maxWidth: collapsed ? 0 : "",
            whiteSpace: "nowrap",
            marginLeft: collapsed ? 0 : "8px",
          }}
        >
          Pathom
        </span>
        <div className="flex items-center absolute top-0 bottom-0 right-[-32px]">
          <button
            className="btn btn-square w-[32px] h-[32px]"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <RiContractRightLine size={14} className="" />
            ) : (
              <RiContractLeftLine size={14} className="" />
            )}
          </button>
        </div>
      </div>
      <ul className="menu p-0 w-full">
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className={`flex items-center gap-3 py-3 ${
                pathname === item.path ? "active bg-base-300" : ""
              } ${collapsed ? "justify-center" : ""} `}
            >
              {item.icon}
              {!collapsed && (
                <span className="whitespace-nowrap text-[15px]">
                  {item.label}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navbar;
