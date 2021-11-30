import "App.css";
import { Card, Form, Loading } from "../components";
import React, { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:8080/notes/";

const PageCards = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = ({ target: { value } }) => {
    value.trim().length && setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url, { content: value })
      .then((response) => response)
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
    axios
      .delete(url + id)
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
