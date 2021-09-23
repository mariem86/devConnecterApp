import React from "react";
import PropTypes from "prop-types";
import { useDispatch,useSelector } from "react-redux";


const Alert = () =>{
const alerts = useSelector((state) => state.alertReducer);
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert =>( 
       <div key={alert.id} className={`alert alert-${alert.alertType}`}> 
         {alert.msg}
        </div>
                      ));

Alert.prototype = {
  alerts: PropTypes.array.isRequired
};
/*
const mapStateToProps = state => {
  return {
    alerts: state.alert
  };*/
};

export default Alert;
