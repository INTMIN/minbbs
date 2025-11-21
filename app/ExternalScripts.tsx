import { useEffect } from "react";

export function ExternalScripts() {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.src = "https://intmin.github.io/live2d-widget/autoload.js";
    s1.async = true;
    document.body.appendChild(s1);

    const s2 = document.createElement("script");
    s2.src = "https://intmin.github.io/openJS/spider.js";
    s2.async = true;
    document.body.appendChild(s2);

    return () => {
      document.body.removeChild(s1);
      document.body.removeChild(s2);
    };
  }, []);

  return null;
}
