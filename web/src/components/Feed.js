import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import Skeleton from "@material-ui/lab/Skeleton";

function Feed() {
   
   const [webcamLoad, setWebcamLoad] = useState(true);

   useEffect(() => {
      (async function getPerm(){
         await navigator.permissions.query( { name: "camera" } ).then(function(permissionStatus) {
            console.log('camera state is ', permissionStatus.state);
            if(permissionStatus.state === "granted"){
               setWebcamLoad(false);
            }
            else{
               navigator.getUserMedia({ video: true }, () => setWebcamLoad(false), () => alert("Please enable camera permissions.") );
            }
            permissionStatus.onchange = function() {
              console.log('camera state has changed to ', this.state);
              if(this.state === "granted"){
                 setWebcamLoad(false);
              }
            };
         });
      }());

      
   })
   return (
      <div className="feed">
         {webcamLoad
         ? (<Skeleton style={{flex:1, alignSelf:"stretch", margin:" 0 2rem"}}/>)
         : (<Webcam
            audio={false}
            // height={"auto"}
            screenshotFormat="image/jpeg"
            width={"90%"}
            style={{borderRadius:"10px", height: "35rem"}}
            />)
         }
      </div>
   )
}

export default Feed;
