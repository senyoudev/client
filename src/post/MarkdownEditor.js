import React from "react";
import MDEditor from '@uiw/react-md-editor';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({content,setContent}) {
  // const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container m-3">
      <MDEditor
        height={300} 
        value={content}
        onChange={setContent}
      />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}