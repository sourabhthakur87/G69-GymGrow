import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2'
import "../CSS/MarkAttendance.css"

export default function MarkAttendance() {
    const navigate = useNavigate();
    const [studentDisplayData, setStudentDisplayData] = useState([]);
    const [gymname, setgymname] = useState('')
    const [isChecked, setIsChecked] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isRun, setisRun] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

    const markAllAbsent = async () => {
        const currentDate = new Date().toISOString();
        studentDisplayData.forEach((student, index) => {
            if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
                markAttendance(index, student._id, false, currentDate);
            }
        });
    };

    const markPresent = async () => {
        const currentDate = new Date().toISOString();
        studentDisplayData.forEach((student, index) => {
            if (!isAttendancePresentMarkedForToday(student) && isChecked[index]) {
                markAttendance(index, student._id, true, currentDate);
            }
        });
    };


    // Apply filter and search
    const filteredStudents = searchQuery
        ? searchResults
        : studentDisplayData.filter((student, index) => {
            if (filter === 'all') {
                return true;
            } else if (filter === 'present') {
                return isAttendancePresentMarkedForToday(student);
            } else if (filter === 'absent') {
                return (
                    student.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent));
            } else if (filter === 'notMarked') {
                return !student.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0])
            }
            return true;
        });

    return (
        <>
            <NavBar2 gymname={gymname} />
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
                        <option value="absent">Absent Students</option>
                        <option value="notMarked">Not Marked Students</option>
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
                                        checked={isChecked[index]}
                                        disabled={isAttendancePresentMarkedForToday(curr) || curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent)}
                                        className={isAttendancePresentMarkedForToday(curr) || curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent) ? 'disabled-element' : ''}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td >{curr.userName}</td>
                                <td>{curr.phone}</td>
                                <td>{curr.address}</td>
                                <td>
                                    {curr.attendance.some(entry => entry.date.split('T')[0] === new Date().toISOString().split('T')[0] && !entry.isPresent) ? "Absent" : isAttendancePresentMarkedForToday(curr) ? "Present" : "NAN"}
                                </td>
                                <td>
                                    <NavLink to={"/onestudentattendance/" + curr._id} style={{ color: "red" }} >Get Attendance</NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={markAllAbsent}>Mark Absent</button>
                <button style={{ margin: "0px 10px" }} onClick={markPresent}>Mark Present</button>
            </div>
        </>
    );
}