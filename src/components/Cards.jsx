import "App.css";
import Card from "./Card";
import Form from "./Form";
import React, { useEffect, useState } from "react";

const Cards = () => {
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const refresh = () => {
    setIsRefresh(!isRefresh);
  };
  useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [isRefresh]);

  const handleRemove = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        refresh();
      });
  };
  return (
    <div className="cards">
      <div className="title">
        {" "}
        Notes{" "}
        <button className="btn-refresh">
          <i onClick={refresh} className="fa fa-refresh" aria-hidden="true" />
        </button>
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
      <Form refresh={refresh} />
    </div>
  );
};
export default Cards;
