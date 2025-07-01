import React from "react";
import Editor, { loader } from "@monaco-editor/react";

interface ObjectEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const ObjectEditor: React.FC<ObjectEditorProps> = ({ value, onChange }) => {
  //   loader.config({
  //     paths: {
  //       vs: "../../../public/monaco/vs",
  //     },
  //   });

  return (
    <div id="text-area">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{ minimap: { enabled: false }, fontSize: 17, wordWrap: "on" }}
      />
    </div>
  );
};

export default ObjectEditor;
