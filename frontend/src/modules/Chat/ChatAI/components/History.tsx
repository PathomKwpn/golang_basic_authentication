import React from "react";

import { FiSearch } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { HiPencilAlt } from "react-icons/hi";
import { AiOutlineOpenAI } from "react-icons/ai";
import { RiContractRightLine } from "react-icons/ri";

const History = () => {
  const [hideMenu, setHideMenu] = React.useState(false);
  const menuItems = [
    {
      label: "New Chat",
      icon: (
        <span>
          <HiPencilAlt size={16} />
        </span>
      ),
    },
    {
      label: "Search Chat",
      icon: (
        <span>
          <FiSearch size={16} />
        </span>
      ),
    },
    {
      label: "Settings",
      icon: (
        <span>
          <CiSettings size={18} />
        </span>
      ),
    },
  ];
  return (
    <div
      className={`bg-base-100 h-full p-2 shadow ${
        hideMenu ? "w-16" : "w-48"
      } transition-all duration-300`}
    >
      <div
        className={`flex ${
          hideMenu ? "justify-center" : "justify-between"
        } items-center gap-2 mb-2`}
      >
        {/* {hideMenu && (
          <RiContractLeftLine onClick={() => setHideMenu(false)} size={18} />
        )} */}
        <AiOutlineOpenAI
          onClick={() => (hideMenu ? setHideMenu(false) : null)}
          size={24}
        />
        {!hideMenu && (
          <RiContractRightLine onClick={() => setHideMenu(true)} size={18} />
        )}
      </div>
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`flex items-center p-2 hover:bg-base-200 rounded-lg text-[12px] ${
            hideMenu ? "justify-center" : "justify-between"
          }`}
        >
          {item.icon}
          {!hideMenu && <span className="ml-2">{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default History;
