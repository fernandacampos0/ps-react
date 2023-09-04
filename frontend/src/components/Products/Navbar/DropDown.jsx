import React from "react";
import style from './Navbar.module.css'


export default function dropdown(props){
    return(
        <form className={style.dropdown}  onSubmit={props.subNat}>
            <button value={props.dropValue} onClick={props.natClick}>{props.children}</button>
        </form>
    )

}