import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import Skeleton from "@material-ui/lab/Skeleton";
import * as tf from "@tensorflow/tfjs";
import * as cvstfjs from '@microsoft/customvision-tfjs';

// require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-backend-webgl');
// const cocoSsd = require('@tensorflow-models/coco-ssd');

const labelMap = {
   1:{name:'gun', color:'red'},
   2:{name:'fire', color:'red'},
}

export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
   for(let i=0; i<=boxes.length; i++){
       if(boxes[i] && classes[i] && scores[i]>threshold){
           const [y,x,height,width] = boxes[i]
           const text = classes[i]
           ctx.strokeStyle = labelMap[classes]['color']
           ctx.lineWidth = 10
           ctx.fillStyle = 'white'
           ctx.font = '30px Arial'         
           ctx.beginPath()
           ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
           ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
           ctx.stroke()
       }
   }
}

function Feed() {
   
   const [webcamLoad, setWebcamLoad] = useState(true);
   const webcamRef = useRef(null);
   const canvasRef = useRef(null);

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
   
   // Main function
   const runCoco = async () => {
   //   const net = await tf.loadGraphModel("/Model/model.json")
   // let net = new cvstfjs.ClassificationModel();
   // let net = await cocoSsd.load();

   // await net.loadModelAsync("/Model/model.json");
     //  Loop and detect hands
     setInterval(() => {
      //  detect(net);
     }, 1206.7);
   };
 
   const detect = async (net) => {
      if (
         typeof webcamRef.current !== "undefined" &&
         webcamRef.current !== null &&
         webcamRef.current.video.readyState === 4
         ) {

         const video = webcamRef.current.video;
         const videoWidth = webcamRef.current.video.videoWidth;
         const videoHeight = webcamRef.current.video.videoHeight;
         webcamRef.current.video.width = videoWidth;
         webcamRef.current.video.height = videoHeight;
         canvasRef.current.width = videoWidth;
         canvasRef.current.height = videoHeight;
   
       
         // const img = tf.browser.fromPixels(video)
         // const resized = tf.image.resizeBilinear(img, [416,416])
         // const casted = resized.cast('float32')
         // const expanded = casted.expandDims(0)
         // const obj = await net.executeAsync(expanded)
         const obj = await net.detect(video)
         console.log(obj)
   
         // const boxes = await obj[0].bbox
         // console.log(boxes)
         // const classes = await obj[0].class
         //  console.log(classes)
         // const scores = await obj[0].score
         
         // Draw mesh
         const ctx = canvasRef.current.getContext("2d");
   
         // requestAnimationFrame(()=>{drawRect(boxes[0], classes, scores[0], 0.8, videoWidth, videoHeight, ctx)}); 
   
         // tf.dispose(img)
         // tf.dispose(resized)
         // tf.dispose(casted)
         // tf.dispose(expanded)
         // tf.dispose(obj)
 
      }
   };
 
   // useEffect(()=>{runCoco()},[]);

   return (
      <div className="feed" onClick={() => runCoco()}>
         {webcamLoad
         ? (<Skeleton style={{flex:1, alignSelf:"stretch", margin:" 0 2rem"}}/>)
         : (<div>
            <Webcam
            ref={webcamRef}
            audio={false}
            // height={"auto"}
            screenshotFormat="image/jpeg"
            width={"90%"}
            style={{borderRadius:"10px", height: "35rem"}}
            />
            <canvas
               ref={canvasRef}
               style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 8,
                  width: 640,
                  height: 480,
                  }}
            />
            </div>
            )
         }
      </div>
   )
}

export default Feed;
