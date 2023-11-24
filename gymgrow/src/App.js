import "./app.css"
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom"
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Ownerhome from "./Components/Ownerhome"
import Logout from "./Components/Logout"
import AddMember from "./Components/AddMember";
import MemberDetails from "./Components/MemberDetails";
import OneMemberData from "./Components/OneMemberData";
import AddGymDetails from "./Components/AddGymDetails";
import MemberSignin from "./Components/MemberSignin";
import MemberHome from "./Components/MemberHome";
import Alert from "./Alert/Alert";
import { useState } from "react";
import UpdateOwnerInfo from "./Components/UpdateOwnerInfo";
import MarkAttendance from "./Components/MarkAttendance";
import OneStudentAtt from "./Components/OneStudentAtt";
import MemberHomeAttendance from "./Components/MemberHomeAttendance";
function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(() => {
        setAlert(null)
      }, 2000);
  }


  return (
    <>
      <BrowserRouter>
        <Alert alermess={alert} />
        <Routes>
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/" element={<Signin />} />
          <Route path="/ownerhome" element={<Ownerhome />} />
          <Route path="/addmember" element={<AddMember />} />
          <Route path="/memberdetails" element={<MemberDetails />} />
          <Route path={"/onememberdata/:id"} element={<OneMemberData />} />
          <Route path="/addgymdetails" element={<AddGymDetails />} />
          <Route path="/memberlogin" element={<MemberSignin />} />
          <Route path="/memberhome" element={<MemberHome />} />
          <Route path="/updateOwnerInfo" element={<UpdateOwnerInfo/>}/>
          <Route path="/attendance" element={<MarkAttendance/>}/>
          <Route path={"/onestudentattendance/:id"} element={<OneStudentAtt/>} />
          <Route path={"/memberattendance"} element={<MemberHomeAttendance/>}/>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
