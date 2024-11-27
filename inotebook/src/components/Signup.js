import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/AlertContext';


const Signup = () => {

  const host = process.env.REACT_APP_API_URL;
  const context = useContext(alertContext);

  const { showAlert } = context;


  const [credentials, setCredendials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      showAlert("Account created successfully", "success");
    }
    else {
      showAlert("Invalid Credential", "danger");
    }


  }

  const onChangeValue = (e) => {
    setCredendials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChangeValue} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChangeValue} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChangeValue} minLength={5} required />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChangeValue} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup