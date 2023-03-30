import React, { useEffect, useState } from "react";
import { json, Navigate, useNavigate, useParams } from "react-router-dom";

export const EditNote = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [note, setNote] = useState([]);
  const [isModified, setisModified] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/notes/" + params.id, {
      method: "GET",
      headers: {
        "api-token": token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNote(json);
        setTitle(json.title);
        setContent(json.content);
      });
  }, [params.id]);
  console.log("Nota recuperada" + JSON.stringify(note));

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/api/notes/" + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "api-token": token,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Nota modificada correctamente" + JSON.stringify(json));
      });
    navigate("/listNotes");
  };

  const onChangeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onChangeContent = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  return (
    <main>
      <h1>EditNote </h1>

      <form onSubmit={onSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          onChange={onChangeTitle}
          value={title}
        />
        <label>Content:</label>
        <input
          type="text"
          name="content"
          onChange={onChangeContent}
          value={content}
        />
        <button>Modificar</button>
      </form>
    </main>
  );
};
