import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import NavBar from './NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/addgymdetail.css"
export default function AddGymDetails() {
    const navigate = useNavigate();
    const [gymdetails, setgymDetails] = useState({
        mmorningOpening: "", morningClosing: "", eveningOpening: "", eveningClosing: "", gymAddress: "", descreption: ""
    })

    document.title = "Add Gym Details"
    const handleGymDetail = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        setgymDetails({ ...gymdetails, [name]: value })
    }

    const gymDetailsPost = async (e) => {
        try {


            e.preventDefault();

            const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption } = gymdetails;
            const res = await fetch("/addgymDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption
                })
            });

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
            else if (res.status === 201) {
                toast.success('Account Created Successfully', {
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
                }, 1000);
            }
            else {
                toast.warn('Gym Details Addedd Failed', {
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
            navigate("/")
        }
    }

    return (
        <>
            {/* <NavBar /> */}
            <div className="addgymdetail">
                <div className="gym-detail-from">
                    <h2>Add Gym Details</h2>
                    <form method='POST'>
                        <div className="time input-line">
                            <label htmlFor="">Morning Time</label>
                            <br />
                            <input type="time" name="morningOpening" value={gymdetails.morningOpening} onChange={handleGymDetail} />
                            <span>  TO  </span>
                            <input type="time" name="morningClosing" value={gymdetails.morningClosing} onChange={handleGymDetail} />
                        </div>
                        <div className="time input-line">
                            <label htmlFor="time">Evening Time</label>
                            <br />
                            <input type="time" id="time" name="eveningOpening" value={gymdetails.eveningOpening} onChange={handleGymDetail} />
                            <span>  TO  </span>
                            <input type="time" name="eveningClosing" value={gymdetails.eveningClosing} onChange={handleGymDetail} />
                        </div>
                        <div className="time input-line">
                            <label htmlFor="">Gym Address</label>
                            <br />
                            <input type="text" name='gymAddress' placeholder='GYM Address' value={gymdetails.gymAddress} onChange={handleGymDetail} />
                        </div>

                        <label htmlFor="">About Gym</label>
                        <br />
                        <textarea name="descreption" value={gymdetails.descreption} onChange={handleGymDetail} cols="65" placeholder='Enter About Gym'></textarea>
                        <br />
                        <button onClick={gymDetailsPost}>Add Details</button>
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
