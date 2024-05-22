const { useState, useEffect } = React;
import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { Form } from "../cmps/Form.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  // console.log(notesService.getNotes());

  useEffect(() => {
    notesService.getNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  function handleRemoveNote(noteId) {
    notesService.removeNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  }

  function handleAddNote(note) {
    notesService.saveNote(note).then(() => {
      setNotes((prevNotes) => [...prevNotes, note]);
    });
  }

  return (
    <section>
      <Form onAddNote={handleAddNote} />
      <NoteList notes={notes} onRemoveNote={handleRemoveNote} />
    </section>
  );
}
