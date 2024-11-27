import React, { useContext } from 'react'
import { Link, useLocation} from 'react-router-dom';
import alertContext from '../context/alert/AlertContext';
const Navbar = () => {
    let location = useLocation();

    const alrContext = useContext(alertContext);
    const { showAlert } = alrContext;

    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert("Logout Successfully", "success");

    }

    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>

                    {!localStorage.getItem("token") ?
                        <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>

                        </form> : <div className="dropdown">
                            <button className="btn btn-dark dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
                                    R
                                </div>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ width: '100px', height: '200px' }} aria-labelledby="dropdownMenuButton">
                                
                                <li className="dropdown-header">
                                    <strong>Username</strong> <br/>
                                        <small>user@example.com</small>
                                </li>
                                <li><hr className="dropdown-divider"/></li> 

                                <li><a className="dropdown-item" href="#"><i className="bi bi-person"></i> My GPTs</a></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-gear"></i> Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/login" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Log out</Link></li>
                            </ul>
                        </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar