import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE() {
  return (
    <Editor
      className="top"
      apiKey="qqvalxqg10biapht32f46xrwxc1aodbcvb35nopjx7oo1lip"
      init={{
        content_css: "/index.css",
        menubar: false,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo |  | bold italic underline strikethrough |  | align lineheight | numlist bullist indent outdent |  | removeformat",
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}
