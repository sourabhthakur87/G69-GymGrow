import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
export default function Logout() {
    const [progress, setProgress] = useState(0)

    const navigate = useNavigate();
    const userlogout = async () => {
        setProgress(20)
        setProgress(50)
        const res = await fetch("/logoutuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        setProgress(70)
        await res.json();
        if (res.status === 200) {
            console.log("Logout Success");
            navigate("/")
            setProgress(100)
        }

        else {
            console.log("Logout Failed");
        }
    }
    useEffect(() => {
        userlogout();
    })
    return (
        <>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <h1>You Logout Successfully</h1>
        </>
    )
}
