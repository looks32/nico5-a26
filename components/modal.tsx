"use client";

import { useEffect, useState } from "react";
import AddTweet from "./add-tweet";
import styles from "@/styles/tweetList.module.scss";

export default function Modal() {

    const [modal, setModal] = useState(false);

  return (
    <>
        <button className={styles.add_btn} onClick={()=>setModal((prev)=>!prev)}>+</button>
        {modal ? <AddTweet modal={modal} setModal={setModal}/> : null}
    </>
  );
}
