import React from "react";

import { GoDependabot } from "react-icons/go";

import ChatAiInput from "@/modules/Chat/ChatAI/components/Input";
import History from "@/modules/Chat/ChatAI/components/History";
import MarkdownViewer from "@/ui/MarkdownViewer";

const prompts = [
  "What's on the agenda today?",
  "What do you plan to accomplish?",
  "Got anything exciting for today?",
  "What's your focus for now?",
  "What’s happening today?",
  "What are you up to today?",
];

const ChatAI = () => {
  const [chatHistory, setChatHistory] = React.useState<
    { role: string; text: string }[]
  >([]);
  const [historyStore, setHistoryStore] = React.useState<
    { label: string; data: { role: string; text: string }[] }[]
  >([]);
  const chatBodyRef = React.useRef<HTMLDivElement | null>(null);
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];

  React.useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="flex flex-row h-full">
      <div
        ref={chatBodyRef}
        className="flex-3/2 relative w-full h-full overflow-y-auto"
      >
        <div
          className={`space-y-3 px-4 py-2 pb-10 ${
            chatHistory.length > 0
              ? "min-h-[90%] "
              : "flex items-end min-h-[40%] justify-center"
          }`}
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end items-center"
                    : "justify-start items-center"
                }`}
              >
                {msg.role === "user" && (
                  <time className="text-xs opacity-50">12:45</time>
                )}
                <div className="">
                  {msg.role !== "user" && (
                    <div className="avatar avatar-placeholder">
                      <div className="bg-base-100 ring text-neutral-content w-8 rounded-full">
                        <span className="badge badge-sm">
                          <GoDependabot size={16} className="" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-xl whitespace-pre-wrap max-w-[75%] text-sm ms-1 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : msg.text === "Thinking..."
                      ? "text-gray-400"
                      : "bg-base-100"
                  }`}
                >
                  {/* {msg.text} */}
                  <MarkdownViewer content={msg.text} />
                  {/* <TypingMessage text={msg.text} /> */}
                </div>
                {msg.role !== "user" && (
                  <time className="text-xs opacity-50">12:45</time>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center font-semibold text-[24px]">
              {prompt}
            </div>
          )}
        </div>
        {/* <TypingMessage text="Hello Hello..." /> */}
        <div className="sticky bottom-4 z-10 w-full flex justify-center bg-transparent">
          <ChatAiInput
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
      <div className="flex-1">
        <History
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          historyStore={historyStore}
          setHistoryStore={setHistoryStore}
        />
      </div>
    </div>
  );
};

export default ChatAI;
