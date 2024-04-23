"use client";

import { useEffect, useRef, useState } from "react";
import { PanInfo, motion } from "framer-motion";
export default function HelloPage() {
  return (
    <main className="min-h-screen p-3">
      Hello World

        <input type="range" className="range" name="" id="" />
     
    </main>
  );
}

function Selector() {
  const ref = useRef(null);
  const [info, setInfo] = useState<PanInfo | null>(null);

  return (
    <div className="container" ref={ref}>
      <motion.div
        className="scroller"
        drag="x"
        dragConstraints={ref}
        onDrag={(_, info)=>{
            setInfo(info)  
        }}
        onDragEnd={(_, info)=>{
            console.log(info);
            
        }}
        // onMeasureDragConstraints={console.log}
      >
        
       {['😢', '😑', '🙂', '😊', '🥰'].map((item, index)=>{

        return <div key={index} className="item">{item}</div>
       })}
      </motion.div>
      {info && JSON.stringify(info)}
    </div>
  );
}
