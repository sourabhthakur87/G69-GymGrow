import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2'
import "../CSS/MarkAttendance.css"

export default function MarkAttendance() {
    const navigate = useNavigate();
    const [studentDisplayData, setStudentDisplayData] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isRun, setisRun] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const isAttendanceMarkedForToday = (student) => {
        const currentDate = new Date().toISOString().split('T')[0];
        return student.attendance.some(entry => entry.date.split('T')[0] === currentDate && entry.isPresent);
    }

    // const checkAndUpdateAttendance = () => {
    //     const currentDate = new Date().toISOString().split('T')[0];

    //     studentDisplayData.forEach((student, index) => {
    //         if (!isAttendanceMarkedForToday(student) && !isChecked[index]) {
    //             markAttendance(index, student._id, false, currentDate);
    //         }
    //     });
    // };

    const checkAndUpdateAttendance = () => {
        const currentDate = new Date().toISOString().split('T')[0];

        studentDisplayData.forEach((student, index) => {
            if (!isAttendanceMarkedForToday(student) && !isChecked[index]) {
                markAttendance(index, student._id, false, currentDate);
            } else if (isAttendanceMarkedForToday(student) && isChecked[index]) {
                markAttendance(index, student._id, true, currentDate);
            }
        });
    };


    const checkDateChange = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        console.log("Change Date is running");
        if (currentDate !== localStorage.getItem('lastDate')) {
            console.log("If condition of Change Date is running");
            localStorage.setItem('lastDate', currentDate);
            checkAndUpdateAttendance();
        }
    };

    useEffect(() => {
        const intervalId = setInterval(checkDateChange, 10000);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, [studentDisplayData]);

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
        const updatedIsChecked = [...isChecked];
        updatedIsChecked[index] = !updatedIsChecked[index];
        setIsChecked(updatedIsChecked);
    }

    const markAttendance = async (index, studentId) => {
        const isCheckedForStudent = isChecked[index];
        const currentDate = new Date().toISOString();
        console.log("Mark Attendance is run");
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
                // alert("Updated")
                console.log("Updated");
                setisRun((e) => !e);
            } else {
                console.error(`Error marking attendance for student with ID ${studentId}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);

        // Filter the results based on the search query
        const filteredResults = studentDisplayData.filter((student) => {
            return (
                student.studentName.toLowerCase().includes(query.toLowerCase()) ||
                student.phone.toString().includes(query)
            );
        })
        setSearchResults(filteredResults);
    }

    // Apply filter and search
    const filteredStudents = searchQuery
        ? searchResults
        : studentDisplayData.filter((student, index) => {
            if (filter === 'all') {
                return true; // Show all students
            } else if (filter === 'present') {
                return isAttendanceMarkedForToday(student);
            } else if (filter === 'notPresent') {
                return !isAttendanceMarkedForToday(student);
            }
            return true;
        });

    return (
        <>
            <NavBar2 gymname={"The PowerHouse Gym"} />
            <h1>Mark Attendance</h1>
            <div className="container">
                <div>
                    <label className="filter-label">Filter Students:</label>
                    <select
                        className="filter-dropdown"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    >
                        <option value="all">All Students</option>
                        <option value="present">Present Students</option>
                        <option value="notPresent">Not Present Students</option>
                    </select>
                </div>
                <div>
                    <label className="search-label">Search Students:</label>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search by name or phone"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>.</th>
                            <th>Sr.no</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Attendance</th>
                            <th>Check Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((curr, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="present"
                                        onChange={() => handleValue(index)}
                                        disabled={isAttendanceMarkedForToday(curr)}
                                        className={isAttendanceMarkedForToday(curr) ? 'disabled-element' : ''}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td >{curr.userName}</td>
                                <td>{curr.phone}</td>
                                <td>{curr.address}</td>
                                <td>
                                    <button
                                        onClick={() => markAttendance(index, curr._id)}
                                        disabled={isAttendanceMarkedForToday(curr) || !isChecked[index]}
                                        className={isChecked[index] ? 'green-button' : isAttendanceMarkedForToday(curr) ? 'disabled-element' : 'red-button'}
                                    >
                                        Proceed
                                    </button>
                                </td>
                                <td>
                                    <NavLink to={"/onestudentattendance/" + curr._id} style={{ color: "red" }} >Get Attendance</NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
