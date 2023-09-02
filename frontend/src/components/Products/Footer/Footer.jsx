import style from "./Footer.module.css"

export default function Footer(props){
    return(
        <div>
 
     
         <div className={style.footer_content}>
             
             <div className={style.contacts}>
                 <h1>{props.name}</h1>
                 <p>{props.slogan}</p>
                 <div className={style.social_media}>
                     <a href="#" className={style.social_link} id='instagram'><i class={props.social1}></i></a>
                     <a href="#" className={style.social_link} id='twitter'><i class={props.social2}></i></a>
                     <a href="#" className={style.social_link} id='linkedin'><i class={props.social3}></i></a>
                 </div>
             </div>
     
             <ul className={style.list}>
               
                 <li>
                     <h3>Nossa Empresa</h3>
                 </li>
                 <li>
                     <a href={props.link1} className={style.sobre_link}>{props.empresa1}</a>
                 </li>
                 <li>
                     <a href={props.link2} className={style.sobre_link}>{props.empresa2}</a>
                 </li>
     
             </ul>
     
             <ul className={style.list}>
                 <li>
                     <h3>Parcerias</h3>
                 </li>
                 <li>
                     <a href={props.link3} className={style.sobre_link}>{props.parceria1}</a>
                 </li>
                 <li>
                     <a href={props.link4} className={style.sobre_link}>{props.parceria2}</a>
                 </li>
                
     
             </ul>
      
     
     
     
         </div>
     
         <div className={style.copyright}>
            @ 2023, Feito com ❤️ por Adapti Soluções Web
         </div>
     
        </div>
 
 
     )


}