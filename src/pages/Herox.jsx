import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logo from '../../src/images/logo.png'
import {
  setUserType,
  setDepartment,
  setMobileNumber,
  setDob,
} from "../actions";
const Herox = ({
  userType,
  department,
  mobileNumber,
  dob,
  setUserType,
  setDepartment,
  setMobileNumber,
  setDob,
}) => {
  // const [userType, setUserType] = useState("");
  // const [department, setDepartment] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [dob, setDob] = useState("");

  // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedDepartment = localStorage.getItem("department");
    const storedMobileNumber = localStorage.getItem("mobileNumber");
    const storedDob = localStorage.getItem("dob");

    if (storedUserType) setUserType(storedUserType);
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedMobileNumber) setMobileNumber(storedMobileNumber);
    if (storedDob) setDob(storedDob);

    const storedSubmittedData = JSON.parse(
      localStorage.getItem("submittedData")
    );
    if (Array.isArray(storedSubmittedData) && storedSubmittedData.length > 0) {
      setIsSubmitted(true);
      setSubmittedData(storedSubmittedData);
    }
  }, [setUserType, setDepartment, setMobileNumber, setDob]);

  
  useEffect(() => {
    localStorage.setItem("userType", userType);
    localStorage.setItem("department", department);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("dob", dob);
  }, [userType, department, mobileNumber, dob]);

  
  const userTypeOptions = ["Student", "Selfemp", "Busines"];


  const departmentOptions = ["ECE", "CSE", "MEC", "CHE"];

  const handleButtonClick = () => {
    setIsSubmitted(true);
    const dataToSubmit = {
      userType,
      department,
      mobileNumber,
      dob,
    };
    setSubmittedData([...submittedData, dataToSubmit]);
    localStorage.setItem(
      "submittedData",
      JSON.stringify([...submittedData, dataToSubmit])
    );
    setIsSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-[#2d2d2d] text-slate-400 flex flex-col items-center space-y-3">
      
      <img src={logo} alt="logo" className="w-44 h-32"/>
      <div className="flex flex-col items-center border border-slate-200 space-y-2 max-w-fit p-3 rounded-md">
        <div className="flex w-96 justify-between ">
          <label className="font-medium text-[14px]">User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="bg-transparent w-44 border border-slate-400 p-1"
          >
            <option value="" className="bg-slate-400 text-black text-[14px] font-medium" >Select User Type</option>
            {userTypeOptions.map((option) => (
              <option className="bg-slate-400 text-black text-[15px] font-medium" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-96 justify-between ">
          <label className="font-medium text-[14px]">Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-transparent w-44 border border-slate-400 p-1"
          >
            <option value="" className="bg-slate-400 text-black text-[14px] font-medium">Select Department</option>
            {departmentOptions.map((option) => (
              <option className="bg-slate-400 text-black text-[14px] font-medium" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-96 justify-between ">
          <label className="font-medium text-[14px]">Mobile Number:</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength="10"
            placeholder="Enter mobile number"
            className="bg-transparent w-44 border border-slate-400 p-1"
          />
        </div>
        <div className="flex w-96 justify-between ">
          <label className="font-medium text-[14px]">Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="bg-transparent w-44 border text-[14px] font-medium border-slate-400 p-1"
          />
        </div>
        <div className="pt-2"><button onClick={handleButtonClick} className="w-24 hover:scale-110 hover:bg-blue-600  text-black border font-semibold bg-white rounded-lg flex items-center justify-center">Submit</button></div>
        
      </div>

      

      {isSubmitted && (
        <div className="w-screen flex flex-col space-y-2  p-10">
          <p className="font-semibold text-[14px]">Submitted Data:</p>
          {(submittedData || []).map((data, index) => (
            <div key={index} className="flex border border-slate-600 rounded-md p-2 justify-between items-center font-medium text-[14px]">
              <p>Entry {index + 1}:</p>
              <p>Selected User Type: {data.userType}</p>
              <p>Selected Department: {data.department}</p>
              <p>Mobile Number: {data.mobileNumber}</p>
              <p>Date of Birth: {data.dob}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  userType: state.userType,
  department: state.department,
  mobileNumber: state.mobileNumber,
  dob: state.dob,
});

const mapDispatchToProps = {
  setUserType,
  setDepartment,
  setMobileNumber,
  setDob,
};

export default connect(mapStateToProps, mapDispatchToProps)(Herox);
