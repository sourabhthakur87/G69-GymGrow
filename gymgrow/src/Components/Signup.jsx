import React, { useState } from 'react'
// import NavBar from './NavBar'
import "../CSS/sign.css"
import { NavLink, useNavigate } from 'react-router-dom'

// import LoadingBar from 'react-top-loading-bar'
// import gym from "../Images/gym.gif"
import sapiens from "../Images/sapiens.png"
export default function Signup(props) {

  const navigate = useNavigate()
  const [ownerRegister, setownerRegister] = useState({
    name: "", email: "", phone: "", gymname: "", password: ""
  })
  document.title = "GYMGROW - Register"

  // console.log(ownerRegister);
  // const [progress, setProgress] = useState(0)

  let name, value
  const ownerData = (e) => {
    e.preventDefault();

    name = e.target.name;
    value = e.target.value;
    setownerRegister({ ...ownerRegister, [name]: value });
    // console.log(ownerRegister);
  }

  const register = async (e) => {
    e.preventDefault();
    // if (ownerRegister.email.length === 0 && ownerRegister.name.length === 0 && ownerRegister.phone.length === 0 && ownerRegister.gymname.length === 0 && ownerRegister.password.length === 0 ) {

    // }

    const { name, email, phone, gymname, password } = ownerRegister
    const res = await fetch("/ownerRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, gymname, password
      })
    });

    await res.json();

    if (res.status === 422) {
      // toast.error('Fill All The Fields!', {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });

      props.showAlert("Fill All The Fields!", "error")

      // alert("Fill All Fields")
    }
    else if (res.status === 201) {
      // setProgress(100);
      navigate("/addgymdetails")
    }
    else {
      // toast.warn('Register Failed / or Email is already exist', {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });

      props.showAlert('Register Failed / or Email is already exist', "warn")
      // alert("Register Failed")
    }
  }
  return (
    <>
      <div className="sign">
        <div className="signbox">
          <div className="sign_right">
            <h2>Welcome to Gym Grow</h2>
            <img src={sapiens} alt="" id='img' />
          </div>
          <div className="sign_left">
            <h2>Register YourSelf</h2>

            <form method='POST'>

              <input type="text" name='name' value={ownerRegister.name} placeholder='Name' onChange={ownerData} required />
              <input type="email" name='email' value={ownerRegister.email} placeholder='Email' onChange={ownerData} required />
              <input type="number" name='phone' value={ownerRegister.phone} placeholder='Phone' onChange={ownerData} required />
              <input type="text" name='gymname' value={ownerRegister.gymname} placeholder='GYM Name' onChange={ownerData} required />
              <input type="password" name='password' value={ownerRegister.password} placeholder='Password' onChange={ownerData} required />
              <button onClick={register}>Register</button>
            </form>
            <h4>Already Have An Account</h4>
            <div className="links">
              <NavLink to="/" title='Owner Login'>Owner Login</NavLink>
              {/* <NavLink to="/memberlogin" title='Member Login'>Member Login</NavLink> */}
            </div>
          </div>
        </div>
      </div>




    </>

  )
}
