import React from 'react';
import image from "./bg2.jpg";


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

// Inline styles for the component
const styles = `
  .login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('${image}') center/cover;
  }

  .login-box {
    background-color: #008000;
    padding: 20px;
    height: 300px;
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: white;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid white;
    border-radius: 4px;
  }

  button {
    background-color: white;
    color: #008000;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }

  button:hover {
    background-color: #f0f0f0;
    color: #008000;
  }
`;

// Use a style tag to apply the inline styles
const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(styles));
document.head.appendChild(styleTag);

export default Login;