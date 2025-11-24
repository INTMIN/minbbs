import { useEffect, useState } from "react";
import Markdown from "~/components/MarkDown";

const BBSDetail = (props: any) => {
  const {
    params: { id },
  } = props;
  const [content, setContent] = useState("");
  useEffect(() => {
    if (id) {
      fetch(`/md/${id}.md`)
        .then((resp) => resp.text())
        .then((txt) => setContent(txt));
    }
  }, [id]);

  return (
    <div className="mx-3">
      <Markdown content={content} />
    </div>
  );
};

export default BBSDetail;
