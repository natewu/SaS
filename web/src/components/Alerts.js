import React, { useEffect, useState } from 'react'
import addNotification from 'react-push-notification';

function Alerts() {
   var time = new Date();
   var date = time.toLocaleTimeString('en-GB', { hour12: true, hour: "2-digit", minute: "2-digit" });
   const [alertList, setAlertList] = useState([
      {
         text: "Rifle alert!",
         time: "1pm"
      },
      {
         text: "Pistol detected!!!",
         time: "2pm"
      },
      {
         text: "Pistol detected!!!",
         time: "3pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: "4pm"
      },
      {
         text: "Pistol detected!!!",
         time: date
      },
   ])
   
   const [recentAlert, setRecentAlert] = useState([]);

   function pushAlert(alert){
      console.log(recentAlert)
      addNotification({
          title: 'Warning - ' + alert.time,
          message: alert.text,
          theme: 'darkblue',
          native: true
      });
   }

   useEffect(() => {
      setRecentAlert(alertList[alertList.length - 1]);
   }, [alertList])

   useEffect(() => {
      if(recentAlert.length !== 0){
         pushAlert(recentAlert);
         console.log(recentAlert)
      }
   }, [recentAlert])

   return (
      <div className="alerts">
         <h1 onClick={() => {pushAlert(recentAlert)}}>Alerts</h1>
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
