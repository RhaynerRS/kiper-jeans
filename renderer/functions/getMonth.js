import React,{useState,useEffect } from 'react';
import Axios from 'axios';
export default function getMonth(){
    const [card,setCard]=useState()
    useEffect(()=>{
        Axios.get("http://localhost:3001/getSells").then((response)=>{setCard(response.data)});
    })
    let arrayMonths=[]
    if (typeof card !== "undefined"){card.map((value)=>{arrayMonths.push(value.data.split('-')[1])})}  
    const counts = {};
    arrayMonths.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    const monthSells=Object.values(counts);
    monthSells.unshift(0)
    monthSells.unshift(0)
    monthSells.unshift(0)
    return (monthSells);
}
