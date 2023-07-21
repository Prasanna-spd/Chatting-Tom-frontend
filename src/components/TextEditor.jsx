import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  //   const [editorHtml, setEditorHtml] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      //   [{ code: "code-block" }, { code: "code-snippet" }],
      [{ code: "code-block" }],
      [{ upload: "file" }],
      ["emoji"],
      [{ mention: { mentionDenotationChars: ["@", "#"] } }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "strike",
    "list",
    "bullet",
    "link",
    "blockquote",
    "code-block",
    // "code-snippet",
    "upload",
    "emoji",
    "mention",
  ];

  //   const handleChange = (html) => {
  //     setEditorHtml(html);
  //   };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
