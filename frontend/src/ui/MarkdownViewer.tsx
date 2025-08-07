import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const MarkdownViewer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
