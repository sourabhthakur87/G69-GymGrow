import React, { useState } from 'react'
// import NavBar from './NavBar'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sapiens from "../Images/sapiens.png"
import dub from "../Images/dumbbell.png"
export default function MemberSignin() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        userName: "", phone: ""
    })

    document.title = "GYMGROW - Login(Member)"

    const memberlogin = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;

        setLoginData({ ...loginData, [name]: value })
    }

    const postMemberLogin = async (e) => {
        e.preventDefault();
        const { userName, phone } = loginData

        const res = await fetch("/memberLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, phone
            })
        })

        await res.json();
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
            navigate('/memberhome')
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
            {/* <NavBar gymname="GYMGROW" /> */}
            <div className="sign">
                <div className="signbox">
                    <div className="sign_right">
                        <img src={sapiens} alt="" id='img' />
                    </div>
                    <div className="sign_left">
                        <img src={dub} alt="" id='dub' />
                        <h2>Member Login</h2>
                        <p>Welcome Back, Please login to your account</p>
                        <form method="post">
                            <input type="text" name='userName' value={loginData.userName} placeholder='Username' onChange={memberlogin} />
                            <input type="number" name="phone" value={loginData.phone} placeholder='Phone Number' onChange={memberlogin} />
                            <button type="submit" onClick={postMemberLogin}>Login</button>
                        </form>
                        <div className="links">
                            <NavLink to="/" title='Owner Login'>Owner Login</NavLink>
                            {/* <NavLink to="/memberlogin" title='Member Login'>Member Login</NavLink> */}
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
