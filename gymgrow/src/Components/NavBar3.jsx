import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from "react-bootstrap-icons"
import "../CSS/Nav.css"
export default function NavBar3(props) {
    return (
        <>

            <nav>
                <div className="logo logo-margin">
                    <span className="logo-name">Welcome to " <span style={{color:"coral"}}> {props.gymname} </span></span>
                    <NavLink to="/logout" id='logoutmember' title='Logout'><Icon.Power /></NavLink>
                </div>

            </nav>
        </>
    )
}
