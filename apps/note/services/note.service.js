
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    getNotes,
    removeNote,
    addNote,
    updateNote,
    saveNote,
    getEmptyNote,
    getNoteById,
}

window.bs = notesService

function getNotes() {
    return new Promise((resolve) => {
        resolve(utilService.loadFromStorage(NOTES_KEY))
    })
}

function getNoteById(noteId) {
    // const notes = utilService.loadFromStorage(NOTES_KEY)
    // const note = notes.find((note) => note.id === noteId)
    // return Promise.resolve(note)
    const note = storageService.get(NOTES_KEY, noteId)
    // return note
    return Promise.resolve(note)
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function saveNote(note) {
    let savedNote
    if (note.id) savedNote = updateNote(note)
    else savedNote = addNote(note)
    return Promise.resolve(savedNote)
    // if (note.id) {
    //     return storageService.put(NOTES_KEY, note)
    // } else {
    //     note['id'] = ''
    //     return storageService.post(NOTES_KEY, note)
    // }
}

function addNote(note) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    notes = [...notes, note]
    note['id'] = utilService.makeId()
    utilService.saveToStorage(NOTES_KEY, notes)
    return note
}

function updateNote(note) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    notes = notes.map(n => n.id === note.id ? note : n)
    utilService.saveToStorage(NOTES_KEY, notes)
    return notes
}

function getEmptyNote() {
    return {
        id: "",
        createdAt: '',
        type: "",
        isPinned: false,
        style: { backgroundColor: "" },
        info: { txt: '', title: "", todos: [], url: '' },
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)

    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: 'rgb(173,173,215)'
                },
                info: {
                    title: '',
                    txt: 'Fullstack Me Baby!',
                    url: '',
                    todos: [],
                },
                style: { backgroundColor: '' }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    title: 'Bobi and Me',
                    txt: '',
                    url: 'http://some-img/me',
                    todos: [],
                },
                style: {
                    backgroundColor: 'rgb(173,173,215)'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together and lets go',
                    txt: '',
                    url: '',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 },
                        { txt: 'Coding power', doneAt: 187111111 },
                        { txt: 'Coding power', doneAt: 187111111 },
                        { txt: 'Coding power', doneAt: 187111111 },
                        { txt: 'Coding power', doneAt: 187111111 },
                        { txt: 'Coding power', doneAt: 187111111 },
                    ],
                },
                style: { backgroundColor: '' }
            },
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    console.log(notes)
    return notes
}