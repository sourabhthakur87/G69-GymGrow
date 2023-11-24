import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import { useNavigate, NavLink } from "react-router-dom"
import "../CSS/ownerhome.css"
import * as Icon from "react-bootstrap-icons"
import LoadingBar from 'react-top-loading-bar'

export default function Ownerhome() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0)

  const [ownerData, setOwnerData] = useState({
    allData: "", totalMember: "", gymdetail: "", members: []
  })

  document.title = "GYMGROW - DashBoard"

  const callOwnerInfo = async (e) => {
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
      setProgress(50)
      const data = await res.json();
      const dat2 = data.newmembers.length
      setProgress(70)
      setOwnerData({ allData: data, totalMember: dat2, gymdetail: data.gymDetails[0], members: data.newmembers })
      setProgress(100)



    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }
  useEffect(() => {
    callOwnerInfo();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <NavBar2 gymname={ownerData.allData.gymname} />
      <div className="ownerhome">
        <h2 style={{ borderBottom: "2px solid black" }}>Dashboard</h2>
        <div className="dashboard">

          <div className="dash-left">
            <div className="my-info">
              <h2>My Info</h2>
              <hr />
              <div className="info">
                <div className="infooo">
                  <span><Icon.PersonCircle /></span>
                  <p>{ownerData.allData.name}</p>
                </div>
                <div className="infooo">
                  <span><Icon.EnvelopeAtFill /></span>
                  <p>{ownerData.allData.email}</p>
                </div>
                <div className="infooo">
                  <span><Icon.PhoneVibrateFill /></span>
                  <p>{ownerData.allData.phone}</p>
                </div>

                <div className="infooo">
                  <span><Icon.PersonWorkspace /></span>
                  <p>{(ownerData.allData.gymname)}</p>
                </div>
              </div>
            </div>
            <hr style={{ margin: "10px 0px" }} />
            <div className="gym-info">
              <h2>Gym Info</h2>
              <div className="gym-information">
                <div className="timing">
                  <div className="morning">
                    <h4>Morning:</h4>
                    <div className="row">
                      <p><Icon.ClockFill style={{color:"#7f0000"}} /> {ownerData.gymdetail.morningOpening} AM</p>
                      <h2 style={{ margin: "0px 8px" }}>TO</h2>
                      <p><Icon.ClockFill style={{color:"#7f0000"}}/> {ownerData.gymdetail.morningClosing} AM</p>
                    </div>
                  </div>
                  <div className="evening">
                    <h4>Evening:</h4>
                    <div className="row">
                      <p><Icon.ClockFill style={{color:"#7f0000"}}/> {ownerData.gymdetail.eveningOpening} PM</p>
                      <h2 style={{ margin: "0px 8px" }}>TO</h2>
                      <p><Icon.ClockFill style={{color:"#7f0000"}}/> {ownerData.gymdetail.eveningClosing} PM</p>
                    </div>
                  </div>
                </div>
                <h3 style={{ margin: "20px 0px" }}><Icon.GeoAltFill />{ownerData.gymdetail.gymAddress}</h3>
                <hr style={{ margin: "20px 0px" }} />
                <h2>Gym Descreption</h2>
                <h3>{ownerData.gymdetail.descreption}</h3>
              </div>
              <div className="links">
                <NavLink to="/updateOwnerInfo">Action</NavLink>
              </div>
            </div>
          </div>

          <div className="dash-right">
            <div className="top-heading">
              <p><span><Icon.PeopleFill /></span> Members</p>
              <p>Total:{ownerData.totalMember} </p>
            </div>
            <hr />
            {
              ownerData.members.slice(-6).reverse().map((curr, index) => {
                const registeration = new Date(curr.registerdate)
                const feeDuration = new Date(curr.feeDuration);

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
                  < >
                    <div className="dash-member" style={Remaining <= 5 ? { backgroundColor: "rgb(295, 225, 224)" } : { backgroundColor: "white" }}>
                      <div className="dash-member-left" >
                        <Icon.PersonCircle id='icon' />
                        <div className="text">
                          <p>{curr.name}</p>
                          <span><a href={`tel:${curr.phone}`} style={{ textDecoration: "none" }}>{curr.phone}</a></span>
                        </div>
                      </div>

                      <div className="dash-member-right" >
                        {Remaining} Days
                      </div>
                    </div>
                  </>
                )
              })
            }
            <NavLink className='allmember-btn' to="/memberdetails"><span><Icon.PersonCheckFill /></span> All Members</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
