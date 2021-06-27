import React, { useEffect, useRef, useState } from 'react'
import addNotification from 'react-push-notification';

function Alerts() {
   var time = new Date();
   var date = time.toLocaleTimeString('en-GB', { hour12: true, hour: "2-digit", minute: "2-digit" });
   const [alertList, setAlertList] = useState([])
   
   const [recentAlert, setRecentAlert] = useState([null]);
   const isFirstRun = useRef(true);
     
   function pushAlert(alert){
      console.log(alertList)
      addNotification({
          title: 'Warning - ' + alert.time,
          message: alert.text,
          theme: 'darkblue',
          native: true
      });
   }

   useEffect(() => {
      if (isFirstRun.current) {
         isFirstRun.current = false;
         return;
      }
      // setRecentAlert(alertList[alertList.length - 1]);
      // if(recentAlert[0] !== null){
         // pushAlert(recentAlert)
         pushAlert(alertList[alertList.length - 1]);
      // }
   }, [alertList])

   // useEffect(() => {
   //    if(recentAlert.length !== 0){
   //       pushAlert(recentAlert);
   //       console.log(recentAlert)
   //    }
   // }, [recentAlert])

   return (
      <div className="alerts">
         <h1 >Alerts</h1>
         <div className="alert__box">
            <div className="messages">
               {alertList.map(message => 
                  <Message key={message} time={message.time} text={message.text}/>
               )}
            </div>
         </div>
      </div>
   )
}

function Message({time, text}){
   return (
      <div className="message__box">
         <p className="text">{time} - {text}</p>
      </div>
   )
}

export default Alerts
