import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import "../CSS/memberdetails.css"
import { NavLink, useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MemberDetails() {

    const navigate = useNavigate()
    const [memberDetails, setMemberDetail] = useState([])

    const [my_search, setMy_search] = useState("")
    const [gymname, setgymname] = useState({
        gymname: "", sms_API: ""
    })

    document.title = "GYMGROW - Member Details"

    const [run, setrun] = useState(false)
    const [progress, setProgress] = useState(0)

    const MemberDetails = async () => {
        try {
            setProgress(30)
            const res = await fetch("/memberdetails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setProgress(60)
            const data = await res.json();
            setProgress(100)
            // console.log(data.gymDetails[0].sms_API);
            setgymname({ gymname: data.gymname, sms_API: data.gymDetails[0].sms_API })
            // console.log(gymname);
            setMemberDetail(data.newmembers)
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }


    useEffect(() => {
        MemberDetails();
        // eslint-disable-next-line
    }, [run])

    // setProgress(100)
    const deleteMember = async (id) => {
        if (window.confirm("Are You Sure to delete Member ") === true) {
            try {
                const res = await fetch("/deleteMember/" + id, {
                    method: "delete"
                })

                if (res.status === 200) {
                    setrun((e) => !e)
                    toast.success('Member Deleted Successfully', {
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
                else {
                    alert("Not Delete")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }





    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })
    const [addamount, setaddamount] = useState({ amount: "", remark: "" })

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setregisterDate({ ...registerationDate, [name]: value })
        setaddamount({ ...addamount, [name]: value })
        const q = new Date(registerationDate.registerdate)
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setplane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration })
    }


    const [idd, setId] = useState("")
    const ids = (id) => {
        setId(id)
        setShowModel((d) => !d)
    }

    const addHistory = async (e) => {
        e.preventDefault();

        const { feeDuration } = datq;
        const planeType = plane.feeDuration
        const { registerdate } = registerationDate
        const { amount, remark } = addamount
        // console.log(idd);
        const res = await fetch("/addHistory/" + idd, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                registerdate, planeType, amount, feeDuration, remark
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
        else if (res.status === 200) {
            setrun((e) => !e)
            toast.success('Package Update', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowModel(false)
        }
        else {
            toast.error("Something Went Wrong", {
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
    }



    const [showModel, setShowModel] = useState(false)
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [membernumber, setMemberNumber] = useState(10)

    // const sendsms = async (name, phone) => {
    //     const sms_API = gymname.sms_API
    //     if (window.confirm("Are You Sure to Send SMS ") === true) {
    //         console.log(sms_API);
    //         const res = await fetch("/sendSMS", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 name, phone, sms_API
    //             })
    //         })

    //         await res.json();

    //         console.log(res);
    //         if (res.status === 400) {
    //             toast.error('Mesasge Not Send! OR Your Fast-2-SMS API is Wrong', {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         }
    //         else {
    //             toast.success('Message Send SuccessFully', {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         }
    //     }
    //     else{
    //         alert("Data Not Send")
    //     }

    // }


    return (
        <>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <NavBar2 gymname={gymname.gymname}/>

            {/* {showModel && <MyModel />} */}
            <div className="div" style={showModel === true ? { display: "block", overflow: "hidden" } : { display: "none" }}>
                <div className="model_wrapper"></div>
                <div className="model_container">
                    <div className="all_form model-width">
                        <form method='PATCH'>
                            <div className="iconn">
                                <Icon.XLg onClick={() => setShowModel((e) => !e)} style={{ fontSize: "30px" }} />
                            </div>

                            <div className="lable model-label">
                                <label htmlFor="date">Register Date</label>
                                <div className="icon">
                                    <Icon.Calendar2CheckFill className='inputIcon' />
                                    <input type="date" name='registerdate' value={registerationDate.registerdate} onChange={handleDate} />
                                </div>
                            </div>
                            <div className="lable model-label">
                                <label htmlFor="">Plan type</label>
                                <div className="icon">
                                    <Icon.Calendar3RangeFill />
                                    <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'}>
                                        <option value="DEFAULT" disabled>Fee Type</option>
                                        <option value="1">1 Months</option>
                                        <option value="3">3 Months</option>
                                        <option value="12">1 Year</option>
                                    </select>
                                </div>
                            </div>

                            <div className="lable model-label">
                                <label htmlFor="">Amount</label>
                                <div className="icon">
                                    <span><Icon.CurrencyRupee /></span>
                                    <input type="number" name='amount' value={addamount.amount} placeholder='Amount' onChange={handleDate} />
                                </div>
                            </div>
                            <div className="lable model-label">
                                <label htmlFor="">Remark</label>
                                <div className="icon">
                                    <Icon.PenFill />
                                    <input type="text" name='remark' value={addamount.remark} placeholder="Remark" onChange={handleDate} />
                                </div>
                            </div>
                            <button onClick={addHistory}>Add Amount</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="memberDetails" style={{marginBottom:"15px"}}> 
                <div className="search">
                    <select value={showUpcoming} onChange={(e) => setShowUpcoming(e.target.value === 'true')}>
                        <option value={false}>All Payments</option>
                        <option value={true}>Upcoming Payments</option>
                    </select>
                    <div className="input">
                        <input type="text" name="search" onChange={(e) => setMy_search(e.target.value)} placeholder="Search" /> <label><Icon.SearchHeartFill id='searchIcon' /></label>
                    </div>
                    <NavLink to="/addmember">ADD</NavLink>
                </div>
                <div className="grid">
                    <h2>Member Details</h2>
                    <select onChange={(e) => setMemberNumber(e.target.value)} defaultValue={'DEFAULT'}>
                        {/* <opt value="DEFAULT" disabled>Select Count</opt  ion> */}
                        <option value="10">Count 10</option>
                        <option value="20">Count 20</option>
                        <option value="30">Count 30</option>
                        <option value={memberDetails.length}>Count {memberDetails.length}</option>
                    </select>

                    <p>Total {membernumber}/{memberDetails.length}</p>
                </div>
                
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">SNO.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone N0.</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Plane Type</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Days Left</th>
                                <th scope="col">Update Fee</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Details</th>
                                {/* <th scope="col">Send SMS</th> */}
                            </tr>
                        </thead>



                        {
                            // eslint-disable-next-line
                            memberDetails.filter((val) => {
                                if (my_search === "") {
                                    return val;
                                }
                                else if (val.userName.toLowerCase().includes(my_search.toLocaleLowerCase()) || (val.name.toLocaleLowerCase().includes(my_search.toLocaleLowerCase())) || (val.phone).toString().includes(my_search.toLocaleLowerCase())) {
                                    return val;
                                }

                            }, []).filter((val) => {
                                if (!showUpcoming) {
                                    return true;
                                }
                                const feeDuration = new Date(val.feeDuration);
                                const remainingDays = Math.ceil((feeDuration.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

                                return remainingDays <= 5;
                            }).slice(-membernumber).reverse().map((curr, index) => {
                                const registeration = new Date(curr.registerdate)
                                const x = registeration.toLocaleDateString();
                                const feeDuration = new Date(curr.feeDuration);
                                const z = feeDuration.toLocaleDateString();

                                const q = new Date();
                                let Remaining;
                                if (q.getTime() > registeration.getTime()) {
                                    const diff = feeDuration.getTime() - q.getTime();
                                    const one_day = 1000 * 3600 * 24;
                                    Remaining = Math.ceil(diff / one_day)
                                }
                                else {
                                    const diff = feeDuration.getTime() - registeration.getTime();
                                    const one_day = 1000 * 3600 * 24;
                                    Remaining = Math.ceil(diff / one_day)
                                }
                                return (
                                    <>
                                        <tbody>
                                            <tr style={Remaining <= 5 ? { backgroundColor: "rgb(295, 225, 224)" } : { backgroundColor: "white" }} >
                                                <td data-label="Sno.">{index + 1}</td>
                                                <td data-label="Name">{curr.name}</td>
                                                <td data-label="Phone No." ><a href={`tel:${curr.phone}`} style={{ color: "blue" }}>{curr.phone}</a></td>
                                                <td data-label="Amount">{curr.amount}</td>
                                                <td data-label="Plane Type">{curr.planeType} Month</td>
                                                <td data-label="Duration">{x} <br /> TO <br /> {z}</td>
                                                <td data-label="Days Left">{Remaining}</td>
                                                <td data-label="Update History">
                                                    <button onClick={() => ids(curr._id)}>Update Fee</button>
                                                </td>
                                                <td data-label="Delete">
                                                    <Icon.Trash3Fill onClick={() => deleteMember(curr._id)} style={{ color: "red", cursor: "pointer" }} />
                                                </td>
                                                <td data-label="Details" id='alldetaillink'>
                                                    <h4>
                                                        <NavLink to={"/onememberdata/" + curr._id}>All Info</NavLink>
                                                    </h4>
                                                </td>
                                                {/* <td data-label="Send SMS">
                                                    {
                                                        Remaining <= 5 ? <button onClick={() => sendsms(curr.name, curr.phone)}>Send SMS</button> : "OnGoing"
                                                    }
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </>
                                )
                            })
                        }
                    </table>
                </div>

                {/* <h1>Hello</h1> */}
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
