import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/AlertContext';

const Login = () => {

    const host = process.env.REACT_APP_API_URL;
    const context = useContext(alertContext);

    const {showAlert} = context;

    const [credentials, setCredendials] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    

            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ email: credentials.email, password: credentials.password}),
            });

            const json = await response.json();
            if(json.success){
                localStorage.setItem("token", json.authToken);
                showAlert("Logged in successfully", "success");
                navigate("/");
            }
            else{
                showAlert("Invalid Credential", "danger");
            }
    }

    const onChangeValue = (e)=>{
        setCredendials({...credentials, [e.target.name]:e.target.value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChangeValue}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={onChangeValue}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login