import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.css";

const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown className="prose prose-zinc max-w-none dark:prose-invert" rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  );
};

export default Markdown;