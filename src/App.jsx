import React, { useEffect, useState } from "react";
import "./App.css";
import webgazer from "./WebGazer/src/index.mjs";

function App() {
  const [screen, setScreen] = useState([window.innerWidth, window.innerHeight]);
  const [eye, setEye] = useState(false);
  useEffect(() => {
    async function startGaze() {
      // webgazer.params.storingPoints = false;
      await webgazer
        .setRegression("ridge")
        .setGazeListener((data, clock) => {
          if (data) {
            if (0 < data.x && data.x < screen[0] && 0 < data.y && data.y < screen[1] ){ // 화면 내 영역 볼 때
                setEye(true);
                console.log(true); 
                //console.log(eye, data.x, screen[0], data.y, screen[1]);
            } else { // 화면 밖을 바라보았을 때
              setEye(false);
              console.log(false);
            }
            
          } else { // 화면 밖으로 얼굴 나갔을 때
            setEye(false);
            console.log(false);
          }
          
        })
        .saveDataAcrossSessions(true)
        .addMouseEventListeners()
        .begin();
      webgazer.clearData();
      webgazer.addMouseEventListeners();
      webgazer
        /* shows all video previews */
        // .showVideo(true)
        // .showVideoPreview(true)
        // .showFaceOverlay(true)
        // .showFaceFeedbackBox(true)
        /* shows a square every 100 milliseconds where current prediction is */
        .showPredictionPoints(true)
        /* Kalman Filter defaults to on. Can be toggled by user. */
        .applyKalmanFilter(true);
      

      //Set up the webgazer video feedback.
      var setup = function () {
        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        // var canvas = document.getElementById("plotting_canvas");
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        // canvas.style.position = 'fixed';
      };
      setup();
      console.log(webgazer.getTracker());
    }

    //@ts-ignore (TODO: 나중에 해결)
    window.saveDataAcrossSessions = true;

    startGaze();
    return () => {
      window.addEventListener("beforeunload", () => {
        webgazer.end();
      });
    };
  }, []);
  

  useEffect(() => {
    const resizeListener = () => {
      setScreen([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", resizeListener);
    
  });

  return <div></div>;
}

export default App;

function store_points_variable() {
  webgazer.params.storingPoints = true;
}

/*
 * Sets store_points to false, so prediction points aren't
 * stored any more
 */
function stop_storing_points_variable() {
  webgazer.params.storingPoints = false;
}
