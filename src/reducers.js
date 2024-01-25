const initialState = {
    userType: '',
    department: '',
    mobileNumber: '',
    dob: '',
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_TYPE':
        return { ...state, userType: action.payload };
      case 'SET_DEPARTMENT':
        return { ...state, department: action.payload };
      case 'SET_MOBILE_NUMBER':
        return { ...state, mobileNumber: action.payload };
      case 'SET_DOB':
        return { ...state, dob: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  