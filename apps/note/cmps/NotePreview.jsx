const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;

import { notesService } from "../services/note.service.js";
import { ColorInput } from "./ColorInput.jsx";

export function NotePreview({ note, onRemoveNote }) {
  const [noteBgc, setNoteBgc] = useState(note.style.backgroundColor || "#fff");

  function handleNoteBgcChange(color) {
    setNoteBgc(color);

    const updatedNote = {
      ...note,
      style: {
        ...note.style,
        backgroundColor: color,
      },
    };

    saveNote(updatedNote);
  }

  function saveNote(updatedNote) {
    notesService.saveNote(updatedNote);
  }

  return (
    <li className="note-card" style={{ backgroundColor: noteBgc }}>
      {note.info.url.image ? (
        <img src={note.info.url.image} alt="Note Image" />
      ) : null}

      <section className="video">
        {note.info.url.video ? (
          <iframe
            src={note.info.url.video}
            width="480"
            height="170"
            title="video"
            allowFullScreen
          ></iframe>
        ) : null}
      </section>

      {note.info.url.audio ? (
        <audio controls>
          <source src={note.info.url.audio} />
        </audio>
      ) : null}

      {note.info.title ? <p className="title"> {note.info.title} </p> : null}

      {note.info.txt ? <p className="txt"> {note.info.txt} </p> : null}

      {note.info.todos ? (
        <ul className="todo-list">
          {note.info.todos.map((todo, index) => (
            <li key={index}>{todo.txt}</li>
          ))}
        </ul>
      ) : null}

      <div className="icons">
        <div className="btn pin-btn">
          <i className="fa-solid fa-thumbtack"></i>
        </div>

        <Link to={`/note/edit/${note.id}`}>
          <div className="btn edit-btn">
            <i className="fa-solid fa-pen"></i>
          </div>
        </Link>

        <div className="btn remove-btn" onClick={() => onRemoveNote(note.id)}>
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </div>
      <ColorInput onSetBgc={handleNoteBgcChange} />
    </li>
  );
}
