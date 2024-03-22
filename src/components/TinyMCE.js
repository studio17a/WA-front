import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE() {
  return (
    <Editor
      className="top"
      apiKey="qqvalxqg10biapht32f46xrwxc1aodbcvb35nopjx7oo1lip"
      init={{
        content_css: "/index.css",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}
