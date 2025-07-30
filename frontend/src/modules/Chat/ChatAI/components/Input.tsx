import React from "react";
import axios from "axios";

import { FaArrowUpLong } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

interface ChatAiInputProps {
  chatHistory: { role: string; text: string }[];
  setChatHistory: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatAiInput: React.FC<ChatAiInputProps> = ({
  chatHistory,
  setChatHistory,
}) => {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLDivElement>(null);
  const handleSend = async (e: any) => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== ""),
        { role: "model", text: text },
      ]);
    };
    e.preventDefault();
    const userMessage = inputRef.current?.textContent.trim();
    if (!message.trim()) return;
    if (inputRef.current) {
      inputRef.current.textContent = "";
    }
    const updatedChat = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(updatedChat);
    setMessage("");
    try {
      const history = updatedChat.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history }),
      };
      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBSTMqeOhfMTj8vwtq20PRoHMiYl61wUoM",
          options
        );
        const data = await response.json();
        console.log("Response from Gemini:", data);
        const apiResponseText =
          data.candidates[0].content.parts[0].text.replace(
            /\*\*(.?)\*\*/g,
            "$1"
          );
        console.log("apiResponseText", apiResponseText);

        updateHistory(apiResponseText);
      } catch (error) {
        console.log("Error", error);
      }
    } catch (error) {
      console.log("ERRRRR", error);
    }
  };
  console.log("chatHistory", chatHistory);

  return (
    <div className="card bg-base-100 shadow-sm rounded-lg w-[90%]">
      <div className="card-body p-2 w-full rounded-lg">
        <div
          ref={inputRef}
          contentEditable
          className="w-full overflow-y-auto overflow-x-hidden resize-none border-none rounded focus:outline-none whitespace-pre-wrap px-2 py-1"
          style={{ lineHeight: "1.5" }}
          role="textbox"
          aria-multiline="true"
          onInput={(e) => setMessage(e.currentTarget.textContent || "")}
        >
          {/* <p className="text-[#afafaf]">Ask anything</p> */}
        </div>
        <div className="flex justify-between items-center mt-2">
          <button>
            <FiPlus size={20} className="text-gray-500" />
          </button>
          <button
            className="btn w-7 h-7 p-2 rounded-full btn-sm"
            onClick={handleSend}
          >
            <FaArrowUpLong size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAiInput;
