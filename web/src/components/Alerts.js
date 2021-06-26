import React from 'react'

const alertList = [
   {
      text: "hello",
      time: "1pm"
   },
   {
      text: "2",
      time: "2pm"
   },
]

function Alerts() {
   return (
      <div className="alerts">
         <h1>Alerts</h1>
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
