import { Axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'

function LoginPage(props) {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 리로딩 막아줌.

    let body = {
      email: Email,
      password: Password
    }
    
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert ('error')
      }
    })


   
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}> 
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);
