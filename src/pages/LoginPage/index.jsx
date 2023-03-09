import * as React from 'react';
import initImage from '../../assets/icons/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@2x.png'
import './loginPageStyles.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({isLoggedIn, setIsLoggedIn}) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    async function handleLogin() {
        const response = await axios.post('http://localhost:3001/api//users/login', {
            "userEmail":email,
            "password":password
        });
        response.data.token ? setIsLoggedIn(true) : setIsLoggedIn(false);
        localStorage.setItem('x-access-token', response.data.token);
        (isLoggedIn) ? navigate('/home') : navigate('/');
    }
    return (
        <div className="loginPage">
            <div className="rightSide">
                <p>Design Api's fast</p>
                <p>Manage Content easily</p>
                <img src={initImage} alt ="the init" className="loginPageImage"/>
            </div>
            <div className="leftSide">
                <p>Login to your CMS+ account</p>
                    <label for="email">Email</label><br/>
                    <input 
                        type="text" id="email"
                        name="email" value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    <br/>
                    <label for="password">Password</label><br/>
                    <input 
                        type="text" id="password" 
                        name="password" value={password} 
                        onChange={(e) => setPassword(e.target.value)}/>
                    <br /><br />
                    <button type="button" className="submitButton" onClick={() => handleLogin()}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;