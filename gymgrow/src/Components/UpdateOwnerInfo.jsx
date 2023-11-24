import React, { useState } from 'react'
import NavBar2 from './NavBar2'
// import * as Icon from "react-bootstrap-icons"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
export default function UpdateOwnerInfo() {
    const navigate = useNavigate()
    const [updateOwner, setUpdateOwner] = useState({
        name: "", phone: "", gymname: ""
    })
    const ownerUpdate = (e) => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        setUpdateOwner({ ...updateOwner, [name]: value });
    }


    const sendUpdate = async (e) => {
        e.preventDefault()
        const { name, phone, gymname } = updateOwner

        const res = await fetch("/updateOwner", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, phone, gymname
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
            toast.success('Your Details Updated Successfully', {
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
                navigate("/ownerhome")
            }, 2000);
        }
        else {
            toast.warn('Update Failed / Something Went Wrong', {
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

    const [updategymdetails, setupdategymDetails] = useState({
        morningOpening: "", morningClosing: "", eveningOpening: "", eveningClosing: "", gymAddress: "", descreption: ""
    })

    const handleupdateGymDetail = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value

        setupdategymDetails({ ...updategymdetails, [name]: value })
    }


    const gymDetailsUpdatePost = async (e) => {
        e.preventDefault();
        const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption } = updategymdetails


        const res = await fetch("/updategymDetails", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption
            })
        })
        await res.json();

        if (res.status === 404) {
            toast.error('Something Went Wrong', {
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
        else if (res.status === 422) {
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
            toast.success('Update Success', {
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
                navigate("/ownerhome")
            }, 2000);
        }
    }



    const deleteAccount = async () => {
        if (window.confirm("Are You sure to delete your account") === true) {

            try {
                const res = await fetch("/deleteOwner", {
                    method: "DELETE"
                })

                if (res.status === 200) {
                    toast.success('Delete Success', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    navigate("/")
                }
                else {
                    toast.warn('Delete Failed / Something Went Wrong', {
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
            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <>
            <NavBar2 />
            <div className="updateOwnerInfo">
                <div className="personalInfo">
                    <div className="all_form">
                        <h1>Update Me</h1>
                        <form method='PATCH'>
                            <div className="input-line">

                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' value={updateOwner.name} onChange={ownerUpdate} />
                            </div>
                            <div className="input-line">

                                <label htmlFor="phone">Phone</label>
                                <input type="number" name='phone' value={updateOwner.phone} onChange={ownerUpdate} />
                            </div>
                            <div className="input-line">
                                <label htmlFor="gymname">Gym</label>
                                <input type="text" name='gymname' value={updateOwner.gymname} onChange={ownerUpdate} />
                            </div>
                            <button type='submit' onClick={sendUpdate}>Update</button>
                        </form>
                    </div>
                </div>
                <div className="gym-info">
                    <div className="all_form">
                        <h1>Gym Info</h1>
                        <h2>Update Details</h2>
                        <form method='PATCH'>
                            <div className="time">
                                <label htmlFor="">Morning Time</label>
                                <input type="time" name="morningOpening" value={updategymdetails.morningOpening} onChange={handleupdateGymDetail} />
                                <input type="time" name="morningClosing" value={updategymdetails.morningClosing} onChange={handleupdateGymDetail} />
                            </div>
                            <div className="time">
                                <label htmlFor="">Evening Time</label>
                                <input type="time" name="eveningOpening" value={updategymdetails.eveningOpening} onChange={handleupdateGymDetail} />
                                <input type="time" name="eveningClosing" value={updategymdetails.eveningClosing} onChange={handleupdateGymDetail} />
                            </div>
                            <div className="time">
                                <label htmlFor="">Gym Add.</label>
                                <input type="text" name='gymAddress' placeholder='GYM Address' value={updategymdetails.gymAddress} onChange={handleupdateGymDetail} />
                            </div>
                            <textarea name="descreption" value={updategymdetails.descreption} onChange={handleupdateGymDetail} cols="5" rows="4" placeholder='Enter About Gym'></textarea>
                            <button onClick={gymDetailsUpdatePost}>Add Details</button>
                        </form>
                    </div>
                </div>
                <button onClick={deleteAccount} >Delete ME</button>
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
                navigate={"/ownerehome"} />
        </>
    )
}
