import "App.css";
import { Card, Form, Loading } from "../components";
import React, { useEffect, useState } from "react";

const url = "http://localhost:8080/notes/";

const PageCards = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = ({ target: { value } }) => {
    value.trim() && setValue(value);
  };
  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));
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
    fetchData();
  }, [isRefresh]);

  const handleRemove = (id) => {
    fetch(url + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        refresh();
      })
      .catch((e) => console.log(e));
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
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={value}
      />
    </div>
  );
};
export default PageCards;
