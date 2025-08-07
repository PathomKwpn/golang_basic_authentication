import React, { useEffect, useState } from "react";

interface TypingMessageProps {
  text: string;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  console.log("text", text);
  console.log("displayedText", displayedText);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsTypingDone(false);

    const interval = setInterval(() => {
      console.log("i", i);
      console.log("Character:", text.charAt(i));

      if (i <= text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true); // ✅ ตั้งค่าว่าพิมพ์เสร็จแล้ว
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      {!isTypingDone && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default TypingMessage;
