import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
  const [submittedData, setSubmittedData] = useState(null);
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedDepartment = localStorage.getItem("department");
    const storedMobileNumber = localStorage.getItem("mobileNumber");
    const storedDob = localStorage.getItem("dob");

    if (storedUserType) setUserType(storedUserType);
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedMobileNumber) setMobileNumber(storedMobileNumber);
    if (storedDob) setDob(storedDob);

    const submittedData = JSON.parse(localStorage.getItem('submittedData'));
    if (submittedData) {
      setIsSubmitted(true);
      setSubmittedData(submittedData);
    }
  }, [setUserType, setDepartment, setMobileNumber, setDob]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userType", userType);
    localStorage.setItem("department", department);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("dob", dob);
  }, [userType, department, mobileNumber, dob]);

  // Options for the user type dropdown
  const userTypeOptions = ["Student", "Self Employee", "Business"];

  // Options for the department dropdown
  const departmentOptions = ["ECE", "CSE", "Mechanical", "Chemical"];

  const handleButtonClick = () => {
    setIsSubmitted(true);
    const dataToSubmit = {
      userType,
      department,
      mobileNumber,
      dob,
    };
    setSubmittedData(dataToSubmit);
    localStorage.setItem('submittedData', JSON.stringify(dataToSubmit));
  };
  return (
    <div>
      <label>User Type:</label>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select User Type</option>
        {userTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <br />

      <label>Department:</label>
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        {departmentOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <br />

      <label>Mobile Number:</label>
      <input
        type="text"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        maxLength="10"
        placeholder="Enter mobile number"
      />

      <br />

      <label>Date of Birth:</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

      <button onClick={handleButtonClick}>Submit</button>

      
      {submittedData && (
        <div>
          <p>Data from Local Storage:</p>
          <p>Selected User Type: {userType}</p>
          <p>Selected Department: {department}</p>
          <p>Mobile Number: {mobileNumber}</p>
          <p>Date of Birth: {dob}</p>
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
