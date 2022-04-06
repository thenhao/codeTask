import {useState, useEffect} from "react";

function useDebounce(value, timeout, callBackFn, suggestionState){
   const [timer,setTimer] = useState(null);
   
   function clearTimer(){
       if(timer){
           clearTimeout(timer);
       }
   }

   useEffect(()=>{
       clearTimer();

       if(value && callBackFn && suggestionState){
            const newTimer = setTimeout(callBackFn, timeout);
            setTimer(newTimer);
       }
   }, [value]);

}

export default useDebounce;