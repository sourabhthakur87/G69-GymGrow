import React, { useEffect, useState } from 'react'
import NavBar2 from "./NavBar2"
import "../CSS/addmember.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import * as Icon from "react-bootstrap-icons"
export default function AddMember() {
    const navigate = useNavigate();
    const [addmember, setAddmember] = useState({
        userName: "", name: "", phone: "", address: "", amount: "", dite: "", remark: ""
    })

    document.title = "GYMGROW - Add Member"

    const [progress, setProgress] = useState(0)

    const [ownerAllData, setOwnerAllData] = useState("")
    const [ownergymdetail, setOwnergymdetail] = useState("")


    const callownerAllData = async (e) => {
        try {
            setProgress(30)
            const res = await fetch("/ownerhome", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            setProgress(60)
            // console.log("JS i rfdsnb");
            const data = await res.json();
            setProgress(100)
            setOwnerAllData(data)
            setOwnergymdetail(data.gymDetails[0])
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    useEffect(() => {
        callownerAllData();
        // eslint-disable-next-line
    }, [])


    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })

    const handleMember = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = (e.target.value).toLowerCase();
        setAddmember({ ...addmember, [name]: value})
        console.log(addmember);
    }

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setregisterDate({ ...registerationDate, [name]: value })
        const q = new Date(registerationDate.registerdate)
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setplane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration })
    }

    const postMember = async (e) => {
        try {
            e.preventDefault();

            const { userName, name, phone, address, amount, dite, remark } = addmember
            const gymname = ownerAllData.gymname
            const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption, _id } = ownergymdetail

            const { feeDuration } = datq;
            const planeType = plane.feeDuration
            const { registerdate } = registerationDate


            const res = await fetch("/addmember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName, name, phone, address, registerdate, planeType, amount, dite, remark, feeDuration,
                    morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption, _id, gymname
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
            else if (res.status === 402) {
                toast.warn('UserName Already Exist !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else if (res.status === 200) {
                toast.success('Mamber Added SuccessFully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate("/memberdetails")
                }, 1000);
            }
            // else if (res.status === 401) {
            //     navigate("/")
            // }
            else {
                alert("Something went wrong")
            }


        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    return (
        <>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <NavBar2 gymname={ownerAllData.gymname} />
            <div className="addmember">
                <div className="all_form">
                    <h1>Add Member</h1>
                    <form method='POST'>
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="userName">userName: </label>
                                <div className="icon">
                                    <Icon.PersonBadge className='inputIcon' />
                                    <input type="text" name='userName' placeholder='UserName' onChange={handleMember} required/>
                                </div>
                            </div>
                            <div className="lable">
                                <label htmlFor="name">Name: </label>
                                <div className="icon">
                                    <Icon.PersonBoundingBox className='inputIcon' />
                                    <input type="text" name='name' placeholder='Name' onChange={handleMember} required/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="phone">Phone No.: </label>
                                <div className="icon">
                                    <Icon.PhoneVibrate className='inputIcon' />
                                    <input type="number" name="phone" placeholder='Phone Number' onChange={handleMember} required/>
                                </div>
                            </div>
                            <div className="lable">
                                <label htmlFor="address">Address: </label>
                                <div className="icon">
                                    <Icon.HouseLockFill className='inputIcon' />
                                    <input type="text" name="address" placeholder='Address' onChange={handleMember} required/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="Register Date">Register Date: </label>
                                <div className="icon">
                                    <Icon.ClockFill className='inputIcon' />
                                    <input type="date" name='registerdate' placeholder="Registeratoon date" onChange={handleDate} required/>
                                </div>
                            </div>

                            <div className="lable">
                                <label htmlFor="Plan Type">Plan Type: </label>
                                <div className="icon">
                                    <Icon.CalendarCheckFill className='inputIcon' />
                                    <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'} required>
                                        <option value="DEFAULT" disabled>Fee Type</option>
                                        <option value="1">1 Months</option>
                                        <option value="3">3 Months</option>
                                        <option value="12">1 Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="Amount">Amount: </label>
                                <div className="icon">
                                    <Icon.CurrencyRupee className='inputIcon' />
                                    <input type="number" name='amount' placeholder='Amount' onChange={handleMember} required/>
                                </div>
                            </div>
                        </div>
                        <br />
                        <textarea name="dite" cols="100" rows="5" placeholder='Add Dite' onChange={handleMember}></textarea>
                        <br />
                        <button onClick={postMember}>Add Member</button>
                    </form>
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
