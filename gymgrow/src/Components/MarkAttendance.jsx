import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2'
import "../CSS/MarkAttendance.css"
import * as Icon from 'react-bootstrap-icons';


export default function MarkAttendance() {
    const navigate = useNavigate();
    const [studentDisplayData, setStudentDisplayData] = useState([]);
    const [gymname, setgymname] = useState('')
    const [isChecked, setIsChecked] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isRun, setisRun] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    // const [slic, setSlic] = useState(10)

    const isAttendancePresentMarkedForToday = (student) => {
        const currentDate = new Date().toISOString().split('T')[0];
        return student.attendance.some(entry => entry.date.split('T')[0] === currentDate && entry.isPresent);
    }

    const getUserData = async () => {
        try {
            const res = await fetch("/memberdetails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setStudentDisplayData(data.newmembers);
            setgymname(data.gymname)
            setIsChecked(new Array(data.newmembers.length).fill(false));
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    };

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, [isRun]);

    const handleValue = (index) => {
        let updatedIsChecked = [...isChecked];
        updatedIsChecked[index] = !updatedIsChecked[index];
        setIsChecked(updatedIsChecked);
        console.log(isChecked);
    }

    const markAttendance = async (index, studentId, isCheckedForStudent, currentDate) => {
        const attendanceData = {
            studentId,
            isChecked: isCheckedForStudent,
            date: currentDate,
        };
        try {
            const res = await fetch("/markAttendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(attendanceData)
            });

            console.log(res);

            if (res.status === 200) {
                console.log(`Attendance marked for student with ID ${studentId}`);
                console.log("Updated");
                setisRun((e) => !e);
            } else {
                console.error(`Error marking attendance for student with ID ${studentId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // const handleSearch = (query) => {
    //     setSearchQuery(query);

    //     // // Filter the results based on the search query
    //     // const filteredResults = studentDisplayData.filter((student) => {
    //     //     return (
    //     //         student.studentName.toLowerCase().includes(query.toLowerCase()) ||
    //     //         student.phone.toString().includes(query)
    //     //     );
    //     // })
    //     // // setSearchResults(filteredResults);
    // }

    // const markAllAbsent = async () => {
    //     if (window.confirm("Are You sure to Mark Absent") === true) {
    //         const currentDate = new Date().toISOString();
    //         studentDisplayData.forEach((student, index) => {
    //             if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
    //                 markAttendance(index, student._id, false, currentDate);
    //             }
    //         });
    //     }
    // };

    // const markPresent = async () => {
    //     if (window.confirm("Are You sure to Mark Present") === true) {
    //     const currentDate = new Date().toISOString();
    //     studentDisplayData.forEach((student, index) => {
    //         if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
    //             markAttendance(index, student._id, true, currentDate);
    //         }
    //     });
    // }
    // };


    const markAllAbsent = async () => {
        const selectedStudents = studentDisplayData
            .filter((student, index) => !isAttendancePresentMarkedForToday(student) && isChecked[index])
            .map((student) => student.userName);

        if (window.confirm(`Are you sure to mark absent for the following students:\n${selectedStudents.join(', ')}`)) {
            const currentDate = new Date().toISOString();
            studentDisplayData.forEach((student, index) => {
                if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
                    markAttendance(index, student._id, false, currentDate);
                }
            });
        }
    };

    const markPresent = async () => {
        const selectedStudents = studentDisplayData
            .filter((student, index) => !isAttendancePresentMarkedForToday(student) && isChecked[index])
            .map((student) => student.userName);

        if (window.confirm(`Are you sure to mark present for the following students:\n${selectedStudents.join(', ')}`)) {
            const currentDate = new Date().toISOString();
            studentDisplayData.forEach((student, index) => {
                if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
                    markAttendance(index, student._id, true, currentDate);
                }
            });
        }
    };



    const filteredStudents =
        // searchQuery ? searchResults : 
        studentDisplayData.filter((student, index) => {
            if (filter === 'all') {
                return true;
            } else if (filter === 'present') {
                return isAttendancePresentMarkedForToday(student);
            } else if (filter === 'absent') {
                return (student.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent));
            }
            // else if (filter === 'notMarked') {
            //     return !student.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0])
            // }
            return true;
        });


    return (
        <>
            <NavBar2 gymname={gymname} />
            <div className=" memberDetails container">
                <div className='search'>
                    {/* <label className="filter-label">Filter Students:</label> */}
                    <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="all">All Attendence</option>
                        <option value="present">Present Students</option>
                        <option value="absent">Absent Students</option>
                        {/* <option value="notMarked">Not Marked Students</option> */}
                    </select>
                    <div className='input'>
                        {/* <label className="search-label">Search Students:</label> */}
                        <input className="search-input" type="text" placeholder="Search by name or phone" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />  <label><Icon.SearchHeartFill id='searchIcon' /></label>
                    </div>
                </div>
                <div className="grid">
                    <h2>Member Attendance</h2>
                    {/* <select defaultValue={'DEFAULT'} onChange={(e) => setSlic(e.target.value)}>
                        <option value="10">Count 10</option>
                        <option value="20">Count 20</option>
                        <option value="30">Count 30</option>
                        <option value={filteredStudents.length}>Max Count {filteredStudents.length}</option>
                    </select> */}

                    {/* <p>Total {membernumber}/{memberDetails.length}</p> */}
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">.</th>
                                <th scope="col">Sr.no</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Attendance</th>
                                <th scope="col">Check Attendance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.filter((val) => {
                                if (searchQuery === "") {
                                    return val;
                                }
                                else if (val.userName.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || (val.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) || (val.phone).toString().includes(searchQuery.toLocaleLowerCase())) {
                                    return val;
                                }
                                return 0;
                            }, []).map((curr, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" name="present" onChange={() => handleValue(index)} checked={isChecked[index]} disabled={isAttendancePresentMarkedForToday(curr) || curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent)} className={isAttendancePresentMarkedForToday(curr) || curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent) ? 'disabled-element' : ''} />
                                    </td>
                                    <td data-label="Sno.">{index + 1}</td>
                                    <td data-label="UserName">{curr.userName}</td>
                                    <td data-label="Phone Number">{curr.phone}</td>
                                    <td data-label="Address">{curr.address}</td>
                                    <td data-label="Attendance">
                                        {curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent) ? "Absent" : isAttendancePresentMarkedForToday(curr) ? "Present" : "NAN"}
                                    </td>
                                    <td data-label="Button">
                                        <NavLink to={"/onestudentattendance/" + curr._id} style={{ color: "red" }} >Get Attendance</NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="btnAttendance">
                    <button id='btn1' onClick={markAllAbsent}>Mark Absent</button>
                    <button id='btn2' onClick={markPresent}>Mark Present</button>
                </div>
            </div>
        </>
    );
}