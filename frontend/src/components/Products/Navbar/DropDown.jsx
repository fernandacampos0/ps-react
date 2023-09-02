import style from "./Navbar.module.css";
import React from "react";

export default function DropDown(props){

    return(
        <form className={style.dropdown}  onSubmit={props.subNat}>
            <button value={props.dropValue} onClick={props.natClick}>{props.children}</button>
        </form>
    )
}