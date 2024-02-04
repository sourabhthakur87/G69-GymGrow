import React, { useEffect, useState } from 'react'
import NavBar3 from './NavBar3'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
// import "../CSS/OneStudentAtt.css"


export default function MemberHomeAttendance() {
    const navigate = useNavigate()
    const [memberHomeData, setmemberHomeData] = useState({
        allData: "", attendance: []
    })
    const [progress, setProgress] = useState(0)

    document.title = "GYMGROW - Home"

    const callMemberData = async () => {
        try {
            setProgress(30)
            const res = await fetch("/memberHome", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            setProgress(60)
            const data = await res.json();
            // console.log(data.gymDetails[0]);
            setProgress(100)

            setmemberHomeData({ allData: data, attendance: data.attendance })

            console.log(data.feeHistory);

        } catch (error) {
            console.log(error);
            navigate("/memberlogin")
        }

    }
    useEffect(() => {
        callMemberData();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <LoadingBar
                color="linear-gradient(to right, #ff3300 0%, #000099 100%)"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <NavBar3 gymname={memberHomeData.allData.gymname} name={memberHomeData.allData.userName} />


            <div className="student-attendance-container">
                {
                    memberHomeData.attendance.length === 0 ? <h1>No Recorrd Available</h1> : <div className="container">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.no</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                {
                                    memberHomeData.attendance.length > 0 && memberHomeData.attendance.map((curr, index) => {
                                        const registration = new Date(curr.date);
                                        const time = registration.toLocaleTimeString();
                                        const entryDate = registration.toLocaleDateString();

                                        return (
                                            <tbody>
                                                <tr key={index} className={curr.isPresent === false ? "absent" : "present"}
                                                // style={curr.isPresent === false ? { backgroundColor: "red", color: "white" } : { backgroundColor: "green", color: "white" }}
                                                >
                                                    <td><h1>{index + 1}</h1></td>
                                                    <td><h1>{entryDate}</h1></td>
                                                    <td><h1>{time}</h1></td>
                                                    <td><h1>{curr.isPresent === false ? "Absent" : "Present"}</h1></td>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                            </table>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
