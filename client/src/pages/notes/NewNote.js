import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

export const DEFAULT_NOTE_FORM_STATE = {
  title: "",
  content: "",
};
export const NewNote = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const addNoteRequest = useApi("/api/notes", token, {}, false);

  const onChangeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onChangeContent = (e) => {
    const { value } = e.target;
    setContent(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    addNoteRequest.updateParams({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        author: userId,
      }),
    });

    addNoteRequest.perform();
  };
  return (
    <>
      {addNoteRequest.error && <p className="red">{addNoteRequest.error}</p>}
      <div className="container-md">
        <h2>Añadir Nota</h2>
        <div className="row">
          <form onSubmit={onSubmit}>
            <label className="form-label">Titulo Nota</label>
            <input
              className="form-control"
              id="title"
              type="text"
              value={title}
              onChange={onChangeTitle}
            />
            <label className="form-label">Contenido</label>
            <input
              className="form-control"
              id="content"
              type="text"
              value={content}
              onChange={onChangeContent}
            />
            <button className="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
      {addNoteRequest.data && addNoteRequest.data.id ? (
        <>
          <p className="succes">Nota insertada correctamente!!</p>
          <pre>{JSON.stringify(addNoteRequest.data)}</pre>
        </>
      ) : (
        ""
      )}
    </>
  );
};
