import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar2 from './NavBar2';
import "../CSS/OneStudentAtt.css"
// import './OneStudentAtt.css'; // Import your CSS file

export default function OneStudentAtt() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [studentDetail, setStudentDetails] = useState({});
    const [studentAttendance, setStudentAttendances] = useState([]);

    const onestudentatt = async (id) => {
        try {
            const res = await fetch("/onestudent/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setStudentDetails(data);
            setStudentAttendances(data.attendance);

        } catch (error) {
            console.log(error);
            navigate("/");
        }
    }

    useEffect(() => {
        onestudentatt(id);
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <NavBar2 />
            <div className="student-attendance-container">
                <div className="Attdetails">
                    <h1>Name: {studentDetail.name}</h1>
                    <h1>Phone: {studentDetail.phone}</h1>
                    <h1>Address: {studentDetail.address}</h1>
                </div>

                {
                    studentAttendance.length === 0 ? <h1>No Record Available</h1> :
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
                                {studentAttendance.length > 0 && studentAttendance.map((curr, index) => {
                                    const registration = new Date(curr.date);
                                    const time = registration.toLocaleTimeString();
                                    const entryDate = registration.toLocaleDateString();

                                    return (
                                        <tbody>
                                            <tr key={index} className={curr.isPresent === false ? "absent" : "present"}
                                                // style={curr.isPresent === false ? { backgroundColor: "red", color: "white" } : { backgroundColor: "green", color: "white" }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{entryDate}</td>
                                                <td>{time}</td>
                                                <td>{curr.isPresent === false ? "Absent" : "Present"}</td>
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </div>
                }
            </div>
        </>
    );
}

