import React from "react";

interface DeviderProps {
  className?: string;
  text?: string;
  fontSize?: string;
  color?: string;
}

const Devider: React.FC<DeviderProps> = ({ className, text }) => {
  return <div className={"divider " + className}>{text}</div>;
};

export default Devider;
