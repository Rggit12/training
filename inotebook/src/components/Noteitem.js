import {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/alert/AlertContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);

    const { deleteNote } = context;

    const { note, updateNote } = props;

    const alrContext = useContext(alertContext);
    const {showAlert} = alrContext;


    const handleDeleteNote = () => {
        deleteNote(note._id);
        showAlert("Note Deleted Successfully", "success");
    }

    return (

        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-duotone fa-solid fa-trash-can mx-2" onClick={handleDeleteNote}></i>
                        <i className="fa-duotone fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem