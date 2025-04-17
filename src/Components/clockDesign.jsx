import Styles from "../Components/clockDesign.module.css"; 
import { useEffect, useState } from "react";

let ClockDesign = () => {
  const [time, setTime] = useState(new Date());
  // console.log(time);
  const [isShowingSavedTime,setIsShowingSavedTime] = useState(false);
  const [savedTime , setSavedTime] = useState(null);

  /* Parsing the data from local storage */
  useEffect(() =>{
    let parsedTime = JSON.parse(localStorage.getItem("storedTime") );
     console.log(parsedTime);
    // console.log(parsedTime.length);
    if(parsedTime == null){
      console.log("No saved time found in the localStorage");
    }else{
        //show previous time and pause the current time to getting displayed
        setIsShowingSavedTime(true); //set-time is async so have to wait for the next state update
        setSavedTime(parsedTime); //✅just triggers the re-render but re-render only happens after the completion of this cycle i.e. after the last line of code of this component (function) 
        alert("Displaying the time from the local storage saved time, Hit the clear button to resume the current live time");
    }
  },[] );


  useEffect(() => {
    let eachSecUpdate = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //stopping the setInterval when this component 'clockDesign' unmounts (is removed from the DOM)
    return () => {
      clearInterval(eachSecUpdate);
    };
  }, []); //running useEffect only once after this entire clockDesign component is mounted, and then after that the setInterval does it's job


  //in next re-render after this cycle completes checking and re-rendering the values
  let hours = isShowingSavedTime? savedTime.savedHour: time.getHours();
  let min = isShowingSavedTime? savedTime.savedMin   : time.getMinutes();
  let sec = isShowingSavedTime? savedTime.savedSec   : time.getSeconds();

  /* Saving current time to local storage */
  let handleSaveBtn = () =>{
    let currentTime = {
      savedHour: hours%12, 
      savedMin : min,
      savedSec : sec,
      meridiem: hours>12?"P.M": "A.M"
    }
    localStorage.setItem("storedTime",JSON.stringify(currentTime) );
    alert("The current time is saved to the local Storage");
  }

  let handleClearBtn = () =>{
    localStorage.clear();
    alert("Local storage Cleared");

    setIsShowingSavedTime(false); /* setting it false to show the current live time */
  }


  return (
    <>
      <div className={Styles.outerCircle}>
        <div className={Styles.innerCircle}> </div>

        <div className={`${Styles.number} ${Styles.twelve}`}>12</div>
        <div className={`${Styles.number} ${Styles.one}`}>1</div>
        <div className={`${Styles.number} ${Styles.two}`}>2</div>
        <div className={`${Styles.number} ${Styles.three}`}>3</div>
        <div className={`${Styles.number} ${Styles.four}`}>4</div>
        <div className={`${Styles.number} ${Styles.five}`}>5</div>
        <div className={`${Styles.number} ${Styles.six}`}>6</div>
        <div className={`${Styles.number} ${Styles.seven}`}>7</div>
        <div className={`${Styles.number} ${Styles.eight}`}>8</div>
        <div className={`${Styles.number} ${Styles.nine}`}>9</div>
        <div className={`${Styles.number} ${Styles.ten}`}>10</div>
        <div className={`${Styles.number} ${Styles.eleven}`}>11</div>

        <div className={Styles.hourArrow}
          style={{
            transform: `rotateZ(${(hours + min / 60) *30 }deg)`
          }}
        ></div>

        <div className={Styles.minArrow}
          style={{
            transform: `rotateZ(${(min + sec / 60) * 6 }deg)` /* dynamic rendering of js data*/,
          }}
        ></div>

        <div className={Styles.secArrow}
          style={{
            transform: `rotateZ(${sec * 6 }deg)`,
          }}
        ></div>

      </div>

      <div className={Styles.buttons}>
        <button className={Styles.save} onClick={handleSaveBtn}>Save</button>
        <button className={Styles.clear} onClick={handleClearBtn}>Clear</button>
      </div>

    </>
  );
};
export default ClockDesign;
