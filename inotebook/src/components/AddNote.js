import { useContext, useState } from 'react'

import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/alert/AlertContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const alrContext = useContext(alertContext);
    const {showAlert} = alrContext;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const onChangeValue = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        showAlert("Note Added Successfully", "success");
    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>

            <div className='my-4'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onChangeValue} value={note.title} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChangeValue} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChangeValue} minLength={5} required/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote