import React, { useEffect } from "react";
import "./App.css";
import webgazer from "./WebGazer/src/index.mjs";

function App() {
  useEffect(() => {
    async function startGaze() {
      // webgazer.params.storingPoints = false;
      await webgazer
        .setRegression("ridge")
        .setGazeListener((data, clock) => {
          if (data) console.log(data);
        })
        .saveDataAcrossSessions(true)
        .begin();
      webgazer
        /* shows all video previews */
        .showVideoPreview(false)
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
