import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from "react-bootstrap-icons"
import { useNavigate } from 'react-router-dom'
export default function NavBar2(props) {
    const navigate  = useNavigate()
    const [isopen, setisOpen] = useState(false)
    const toggle = () => {
        setisOpen((e) => !e)
    }
    return (
        <>
            <nav className={isopen ? "open" : ""}>
                <div className="logo">
                    <Icon.List className="menu-icon" onClick={toggle} />
                    <span className="logo-name" style={{cursor:"pointer"}} onClick={()=>navigate("/ownerhome")}>{props.gymname}</span>
                </div>
                <div className="sidebar">
                    <div className="logo">
                        <span className="logo-name" style={{marginLeft:"30px",width:"100%"}}>{props.gymname}</span>
                        <Icon.XCircle className="menu-icon" onClick={toggle} />
                    </div>

                    <div className="sidebar-content">
                        <ul className="lists">
                            <li className="list">
                                <NavLink to="/ownerhome" className="nav-link">
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className="link">Home</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/addmember" className="nav-link">
                                    <Icon.PersonAdd className='icon' />
                                    <span className="link">Add Members</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/memberdetails" className="nav-link">
                                    <Icon.People className='icon' />
                                    <span className="link">Member Details</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/attendance" className="nav-link">
                                    <Icon.People className='icon' />
                                    <span className="link">Attendance</span>
                                </NavLink>
                            </li>
                        </ul>

                        <div className="bottom-cotent">
                            <li className="list">
                                <NavLink to="/logout" className="nav-link" title='LogOut'>
                                    <i className="bx bx-log-out icon"></i>
                                    <span className="link">Logout</span>
                                </NavLink>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
            
            <section className="overlay" onClick={() => setisOpen((e) => !e)}></section>

        </>
    )
}
