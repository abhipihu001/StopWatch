import React, { useState,  useRef } from "react";

function Stopwatch() {
 const [isRunning , setIsRunning] = useState(false);
 const [elapsedTime, setElapsedTime] = useState(0);
 const [splits, setSplits] = useState([]);
 const intervalRef =useRef(null);

 function handleStart(){
  setIsRunning(true);
  intervalRef.current = setInterval(() =>{
    setElapsedTime(prevElapsedTime => prevElapsedTime +1);
  },1000);
 }
 function handlePause(){
  clearInterval(intervalRef.current);
  setIsRunning(false);
 }

 function handleReset(){
  clearInterval(intervalRef.current);
  setIsRunning(false);
  setElapsedTime(0);
  setSplits([]);
 }

 function handleSplit(){
  const newSplit = elapsedTime;
  setSplits(prevSplits => [...prevSplits,newSplit]);
 }
 function formatTime(time){
  const minutes = Math.floor(time/6000);
  const seconds = Math.floor((time/100)%60);
  const centiseconds =time%100;
  return `${minutes.toString().padStart(2 , '0')}:${seconds.toString().padStart(2,'0')}.${centiseconds.toString().padStart(2,'0')}`;
 }

 return(
  <div>
    <h1>{formatTime(elapsedTime)}</h1>
    {!isRunning && <button onClick={handleStart}>Start</button>}
    {isRunning && <button onClick={handlePause}>Pause</button>}
    <button onClick={handleReset}>Reset</button>
    <button onClick={handleSplit}>Split</button>
    <ul>
      {splits.map((split,index) => (
       <li key={index}>{formatTime(split)}</li> 
      ))}
    </ul>
  </div>
 );
}
export default Stopwatch;