import React, {useEffect} from "react";
import '../App.css';

const Alert = ({type, msg, removeAlert, list}) => {
   useEffect(() => {
       const timeout = setTimeout(() => {
           removeAlert()
       }, 3000)
       return () => clearTimeout(timeout)
   }, [list]);

   return(
       <div className={`card-alert ${type}-alert`}>
           {msg}
       </div>
   )
}
 export default Alert