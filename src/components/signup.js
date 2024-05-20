import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        console.log('Submit button clicked');

        try {
            console.log('Sending signup request', { email, password });
            await axios.post("http://localhost:3007/signup", {
                email, password
            })
            .then(res => {
                console.log('Response received', res.data);
                if (res.data === "exist") {
                    alert("User already exists");
                } else if (res.data === "notexist") {
                    history("/home", { state: { id: email } });
                }
            })
            .catch(e => {
                alert("wrong details");
                console.error('Axios error:', e);
                if (e.response) {
                    // The request was made and the server responded with a status code
                    console.error('Error response:', e.response.data);
                } else if (e.request) {
                    // The request was made but no response was received
                    console.error('Error request:', e.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', e.message);
                }
            });

        } catch (e) {
            console.error('Try-catch error:', e);
        }
    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form action="POST">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" onClick={submit} />
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/">Login Page</Link>
        </div>
    );
}

export default Signup;