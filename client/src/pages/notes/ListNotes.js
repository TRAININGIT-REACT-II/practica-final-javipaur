import React, { useEffect, useRef, useState } from "react";
import { json, Link } from "react-router-dom";
import Dialog, { openModal } from "../../components/dialog/Dialog";
import useApi from "../../hooks/useApi";

export const ListNotes = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [noteId, setNoteId] = useState("");
  const [request, setRequest] = useState([]);

  const getNotesRequest = useApi("/api/notes", token);

  useEffect(() => {
    if (getNotesRequest.data) {
      setRequest(getNotesRequest.data);
    }
  }, [getNotesRequest.data]);

  const onDelete = (noteId) => {
    fetch("/api/notes/" + noteId, {
      method: "DELETE",
      headers: {
        "api-token": token,
      },
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Nota borrada correctamente");
      });

    getNotesRequest.updateParams({
      headers: {
        "Content-Type": "application/json",
      },
    });

    getNotesRequest.perform();
  };

  //Necesario para  acceder a las acciones del modal
  const modalRef = useRef();

  //Metodo que llama a la accion definida en el componente Dialog
  const handleOpenModal = (id) => {
    setNoteId(id);
    openModal(modalRef);
  };

  return (
    <>
      <Link to={"/addNotes"}>Crear Nota</Link>
      <table>
        <thead>
          <th>id</th>
          <th>author</th>
          <th>title</th>
          <th>content</th>
          <th>createdAt</th>
          <th>updatedAt</th>
        </thead>
        {request?.map((note, i) => (
          <tr>
            <td>{note.id}</td>
            <td>{note.author}</td>
            <td>{note.title}</td>
            <td>{note.content}</td>
            <td>{note.createdAt}</td>
            <td>{note.updatedAt}</td>
            <tr>
              <Link to={`/notes/${note.id}/edit`}>Editar</Link>
              <button onClick={() => handleOpenModal(note.id)}>Eliminar</button>
            </tr>
          </tr>
        ))}
        <Dialog
          ref={modalRef}
          id={"updateDetails"}
          height="466px"
          isModal={false}
          content={`Modal de confirmación para eliminar el registro ${noteId}`}
          width="312px"
          header={{
            title: "¿Deseas eliminar este registro?",
          }}
          actionsAlign="center"
          actionList={[
            {
              action: () => {
                onDelete(noteId);
              },
              label: "Aceptar",
              type: "button",
            },
            {
              action: () => {
                closeModal(modalRef);
              },
              label: "Cancelar",
              type: "button",
            },
          ]}
        />
      </table>
    </>
  );
};
