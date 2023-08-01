import React from 'react';
import BaseApi from "../../../services/Api";
import {useStateContext} from "../../../context/ContextProvider";
import {Link} from "react-router-dom";

const Signup = (props) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [error, setError] = React.useState(null);
  const {setUser, setToken} = useStateContext();

  const submitData = () => {
    BaseApi.post('signup', {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
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
            Signup for free
          </h1>

          <input className="mb-2" onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name"/>
          <input className="mb-2" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail"/>
          <input className="mb-2" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
          <input className="mb-2" onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" placeholder="Confirm password"/>
          {error &&
            <div className="alert alert-danger py-2" role="alert" >
              {Object.keys(error).map((key, index) => {
                return <p key={index}>{error[key][0]}</p>
              })}
            </div>
          }
          <button onClick={submitData} className="btn btn-login btn-block" type="button">Signup
          </button>
          <p className="message">
            Already registered? <Link to="/login">Sign in </Link>
          </p>
        </form>
      </div>
    </div>
  )
};


export default Signup;