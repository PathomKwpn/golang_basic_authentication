import React from "react";

import { FiSearch } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { HiPencilAlt } from "react-icons/hi";
import { AiOutlineOpenAI } from "react-icons/ai";
import { RiContractRightLine } from "react-icons/ri";
import Devider from "@/ui/Devider";

interface HistoryProps {
  chatHistory: { role: string; text: string }[];
  historyStore: { label: string; data: { role: string; text: string }[] }[];
  setChatHistory: React.Dispatch<
    React.SetStateAction<{ role: string; text: string }[]>
  >;
  setHistoryStore: React.Dispatch<
    React.SetStateAction<
      { label: string; data: { role: string; text: string }[] }[]
    >
  >;
}

const History: React.FC<HistoryProps> = ({
  historyStore,
  chatHistory,
  setChatHistory,
  setHistoryStore,
}) => {
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
          onClick={() => {
            if (item.label === "New Chat") {
              // Handle new chat action
              setHistoryStore((prev) => [
                ...prev,
                {
                  label: chatHistory[0]?.text || "New Chat",
                  data: chatHistory,
                },
              ]);
              setChatHistory([]);
            } else if (item.label === "Search Chat") {
              // Handle search chat action
            } else if (item.label === "Settings") {
              // Handle settings action
            }
          }}
        >
          {item.icon}
          {!hideMenu && <span className="ml-2">{item.label}</span>}
        </div>
      ))}
      <Devider />
      <div>
        <div
          className={`flex items-center p-2 hover:bg-base-200 rounded-lg text-[12px] ${
            hideMenu ? "justify-center" : "justify-between"
          }`}
        >
          {!hideMenu && <span className="ml-2">Chat 1</span>}
        </div>
        <div
          className={`flex items-center p-2 hover:bg-base-200 rounded-lg text-[12px] ${
            hideMenu ? "justify-center" : "justify-between"
          }`}
        >
          {!hideMenu && <span className="ml-2">Chat 2</span>}
        </div>
        {historyStore.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 hover:bg-base-200 rounded-lg text-[12px] ${
              hideMenu ? "justify-center" : "justify-between"
            }`}
          >
            {!hideMenu && <span className="ml-2">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
