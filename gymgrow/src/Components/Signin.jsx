import React, { useState } from 'react'
// import NavBar from './NavBar'
import { NavLink, useNavigate } from 'react-router-dom';
// import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sapiens from "../Images/sapiens.png"
import dub from "../Images/dumbbell.png"
export default function Signin() {
  const navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState({
    email: "", password: ""
  });
  // const [progress, setProgress] = useState(0)

  document.title = "GYMGROW - Login(Owner)"

  const login = (e) => {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    console.log(value);
    setOwnerLogin({ ...ownerLogin, [name]: value });
  }

  const loginOwner = async (e) => {
    e.preventDefault();
    const { email, password } = ownerLogin;
    const res = await fetch("/ownerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    await res.json()

    if (res.status === 422) {
      toast.error('Fill All The Fields!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else if (res.status === 200) {
      navigate("/ownerhome")
      // setProgress(100)
    }
    else {
      toast.warn('Credentials Not Match !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  return (

    <>
      {/* <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      {/* <NavBar gymname="GYMGROW"/> */}
      <div className="sign">
        <div className="signbox">
          <div className="sign_right">
            <h2>Welcome to Gym Grow</h2>
            <img src={sapiens} alt="" id='img' />
          </div>
          <div className="sign_left">
            <img src={dub} alt="" id='dub' />
            <h2>Owner login</h2>
            <p>Welcome Back, Please login to your account</p>
            <form method='POST'>
              <input type="email" name='email' value={ownerLogin.email} placeholder='email' onChange={login} minLength="10"/>
              <input type="password" name='password' value={ownerLogin.password} placeholder='password' onChange={login} minLength="8"/>
              <button type="submit" onClick={loginOwner}>Login</button>
            </form>
            <div className="links">
              <NavLink to="/signup" title='Register Yourself'>Register Yourself</NavLink>
              <NavLink to="/memberlogin" title='Member Login'>Member Login</NavLink>
            </div>
          </div>
        </div>

      </div>


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"

      />
    </>
  )
}
