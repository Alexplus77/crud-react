import React, { useState } from "react";
import "App.css";

const Form = ({ refresh }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    }).then((response) => response.json());
    setValue("");
    refresh();
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea value={value} onChange={handleChange} />
      <button className="btn-send" onSubmit={handleSubmit}>
        {" "}
        <i className="fa fa-space-shuttle" aria-hidden="true" />
      </button>
    </form>
  );
};
export default Form;
