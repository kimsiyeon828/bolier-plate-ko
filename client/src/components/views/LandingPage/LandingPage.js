import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'

function LandingPage() {

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])

  const onClickHandler = (props) => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success) {
        navigate('/login');
        //props.history.push("/login")
      } else {
        alert("로그아웃 하는데 실패하였습니다.")
      }
      console.log(response.data)
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
        <h2>시작 페이지</h2>
        <button onClick={onClickHandler}>Logout</button>
    </div>
  )
}

export default Auth(LandingPage, null);
