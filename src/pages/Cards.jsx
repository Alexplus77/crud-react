import "../App.css";
import Card from "../components/Card";
import Form from "../components/Form";
import Loading from "../components/Loading";
import React, { useEffect, useState } from "react";

const Cards = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const response = () => {
    fetch("http://localhost:8080/notes")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  const handleChange = ({ target: { value } }) => {
    value.trim() && setValue(value);
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

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRefresh(!isRefresh);
    }, 2000);
  };
  useEffect(() => {
    response();
  }, [isRefresh]);

  const handleRemove = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        refresh();
      });
  };
  return (
    <div className="cards">
      <div className="title">
        {" "}
        Notes{" "}
        {isLoading ? (
          <Loading />
        ) : (
          <button className="btn-refresh">
            <i onClick={refresh} className="fa fa-refresh" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="container-cards">
        {!data?.length ? (
          <i className="message">Пока записей нет...</i>
        ) : (
          data?.map(({ content, id }) => (
            <Card
              key={id}
              id={id}
              content={content}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
      <i>New Note</i>
      <Form handleSubmit={handleSubmit} handleChange={handleChange} value />
    </div>
  );
};
export default Cards;
