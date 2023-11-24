import React from 'react'
import "./alert.css"
import * as Icon from "react-bootstrap-icons"
export default function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }


    return (
        <>
            {props.alermess &&
                <div className="alert-main">
                    <div className={`alert `} >
                        <div className={`icon ${props.alermess.type}`}>
                            {/* {<Icon.Check2Circle />} */}
                            {props.alermess.type === "error" ? <Icon.XLg /> : <Icon.Check2Circle />}
                        </div>
                        {/* <p>Error</p> */}
                        <div className="message">
                            <h3>{capitalize(props.alermess.type)}: </h3>
                            <p> {props.alermess.msg}</p>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
