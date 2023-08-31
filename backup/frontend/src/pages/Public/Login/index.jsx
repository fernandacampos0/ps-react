import React, {useState} from 'react';
import {useStateContext} from "../../../context/ContextProvider";
import BaseApi from "../../../services/Api";
import {Link} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {setUser, setToken} = useStateContext();

  const submitData = () => {
    BaseApi.post('login', {
      email: email,
      password: password,
    }).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 401) {
        setError(response.data.message);
      } else {
        setError({
          email: [response.data.message]
        })
      }
    });
  }

  return (
    <div className="container login-signup-form">
      <div className="row form text">
        <form>
          <img className="m-auto d-flex img-thumbnail" width={84} src="https://icon-library.com/images/dev-icon/dev-icon-8.jpg" alt="Logo"/>
          <h1 className="title mt-2">
            Login in Your Account
          </h1>

          <input className="mb-2" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail"/>
          <input className="mb-2" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
          {error &&
            <div className="alert alert-danger py-2" role="alert" >
              {Object.keys(error).map((key, index) => {
                return <p key={index}>{error[key][0]}</p>
              })}
            </div>
          }
          <button onClick={submitData} className="btn btn-login btn-block" type="button" >
            Login
          </button>

          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;