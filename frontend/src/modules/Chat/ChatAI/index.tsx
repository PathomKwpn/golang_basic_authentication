import React from "react";
import ChatAiInput from "@/modules/Chat/ChatAI/components/Input";
import History from "@/modules/Chat/ChatAI/components/History";

const ChatAI = () => {
  const [chatHistory, setChatHistory] = React.useState<
    { role: string; text: string }[]
  >([]);
  const chatBodyRef = React.useRef<HTMLDivElement | null>(null);
  // const mockMessages = [
  //   {
  //     role: "user",
  //     text: "Hi there! I'm trying to fetch data from an API using React. Could you help me with that?",
  //   },
  //   {
  //     role: "assistant",
  //     text: "Sure! You can use the `useEffect` hook along with `fetch` or `axios`. Would you like an example using `axios`?",
  //   },
  //   {
  //     role: "user",
  //     text: "Yes, axios would be great!",
  //   },
  //   {
  //     role: "assistant",
  //     text: `Alright, here's a basic example:\n\n\`\`\`jsx\nimport { useEffect, useState } from 'react'\nimport axios from 'axios'\n\nconst MyComponent = () => {\n  const [data, setData] = useState([])\n\n  useEffect(() => {\n    axios.get('https://api.example.com/data')\n      .then(res => setData(res.data))\n      .catch(err => console.error(err))\n  }, [])\n\n  return <div>{JSON.stringify(data)}</div>\n}\n\`\`\`\n\nLet me know if you want to add loading states or error handling.`,
  //   },
  //   {
  //     role: "user",
  //     text: "Thanks! And how can I show a loading spinner while the data is being fetched?",
  //   },
  //   {
  //     role: "assistant",
  //     text: `Great question! You can add a \`loading\` state like this:\n\n\`\`\`jsx\nconst [loading, setLoading] = useState(true)\n\nuseEffect(() => {\n  axios.get('https://api.example.com/data')\n    .then(res => {\n      setData(res.data)\n      setLoading(false)\n    })\n    .catch(err => {\n      console.error(err)\n      setLoading(false)\n    })\n}, [])\n\nif (loading) return <Spinner />\n\`\`\``,
  //   },
  //   {
  //     role: "user",
  //     text: "Awesome. Last question – how can I cancel a request if the component unmounts?",
  //   },
  //   {
  //     role: "assistant",
  //     text: `You can use an AbortController with axios like this:\n\n\`\`\`jsx\nuseEffect(() => {\n  const controller = new AbortController()\n\n  axios.get('https://api.example.com/data', {\n    signal: controller.signal\n  })\n  .then(res => setData(res.data))\n  .catch(err => {\n    if (axios.isCancel(err)) {\n      console.log('Request canceled', err.message)\n    } else {\n      console.error(err)\n    }\n  })\n\n  return () => controller.abort()\n}, [])\n\`\`\`\n\nThis helps avoid memory leaks. Let me know if you need help with React Query or SWR too!`,
  //   },
  // ];
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
        <div className="space-y-3 px-4 py-2 pb-10">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl whitespace-pre-wrap max-w-[75%] text-sm ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-base-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 z-10 w-full flex justify-center bg-transparent">
          <ChatAiInput
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
      <div className="flex-1">
        <History />
      </div>
    </div>
  );
};

export default ChatAI;
