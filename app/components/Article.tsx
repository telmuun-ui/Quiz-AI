"use client"
import { useState } from "react";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  const createArticle = async () => {
    const res = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        summary,
        userId: "USER_ID",
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
<div>
    <input type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
    <input type="text" placeholder="Content" onChange={(event) => setContent(event.target.value)} />
    <input type="text" placeholder="Summary" onChange={(event) => setSummary(event.target.value)} />
    <button onClick={createArticle} className="hover:text-white hover:bg-blue-500">
        Create Article
      </button>
</div>
  );
}
