import * as React from 'react';
import initImage from '../../assets/icons/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@2x.png';
import './loginPageStyles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({isLoggedIn, setIsLoggedIn}) {
  const [isRegister , setIsRegister] = React.useState(true);
  function  handleRegister () {
    setIsRegister(!isRegister);
  }
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  async function createNewUser() {
    const response = await axios.post('http://localhost:3001/api/users/register', {
      'userEmail':email,
      'password':password
    });
    if (response.data === 'User created successfully'){
      setEmail('');
      setPassword('');
      setIsRegister(!isRegister);
    }else {
      alert(response.data);
    }
    
  }

  async function handleLogin() {
    const response = await axios.post('http://localhost:3001/api//users/login', {
      'userEmail':email,
      'password':password
    });
    response.data.token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    localStorage.setItem('x-access-token', response.data.token);
    (isLoggedIn) ? navigate('/home') : navigate('/');
  }
  return (
    <div className="loginPage">
      <div className="rightSide">
        <p>Design Apis fast</p>
        <p>Manage Content easily</p>
        <img src={initImage} alt ="the init" className="loginPageImage"/>
      </div>
      <div className="leftSide">
        <p className="loginTitle">Login to your CMS+ account</p>
        <label htmlFor="email">Email</label><br/>
        <input 
          type="text" id="email"
          name="email" value={email} 
          onChange={(e) => {
            setEmail(e.target.value);
          }}/>
        <br/>
        <label htmlFor="password">Password</label><br/>
        <input 
          id="password" type="password" 
          name="password" value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        <br /><br />
        {(isRegister) ? <button type="button" className="submitButton" onClick={() => handleLogin()}>Login</button>:
          <button type="button" className="submitButton" onClick={() => createNewUser()}>Register</button>}
        <p className="forgotPasswordButton"> Forgot Password ? </p>
        <p className="registerButton" onClick={handleRegister}> {(isRegister) ? 'New Here, Register Now' : 'Back to login'}</p>
      </div>
    </div>
  );
}

export default LoginPage;