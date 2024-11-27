import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_API_URL;
    const noteInitial = [];

    const [notes, setNotes] = useState(noteInitial);


    // GET all Notes
    const getNotes = async () => {

        // API call
        try {

            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const jsonData = await response.json();
            setNotes(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Add a Note
    const addNote = async (title, description, tag) => {

        // API call 
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("auth-token", localStorage.getItem("token"));

            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                body: JSON.stringify({ title, description, tag }),
                headers: myHeaders,
            });

            const note = await response.json();
            setNotes(notes.concat(note));

        } catch (error) {
            console.error(error.message);
        }

    }

    // Delete a Note
    const deleteNote = async (id) => {

        // API call 
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("auth-token", localStorage.getItem("token"));

            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes);
        } catch (error) {
            console.error(error.message);
        }

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API call
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("auth-token", localStorage.getItem("token"));


            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, description, tag }),
                headers: myHeaders,
            });


            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            // logic to edit in client
            setNotes(notes.map(note => {
                if (note._id === id) {
                    note.title = title;
                    note.description = description;
                    note.tag = tag;
                }
                return note;
            }));


        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;