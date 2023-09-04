import style from './Card.module.css'

export default function Cards(props){

    return (<div className={style.card}>
        <img src={props.img} alt="" className={style.card_img} />
        <div className={style.card_body}>
            <div>
                <h2 className={style.card_name}>NOME:{props.name}</h2>
                <p className={style.card_description}> Descricao: {props.description}</p>
                <p className={style.card_quantity}> Quantidade: {props.quantity}</p>
                <p className={style.card_category}>Categoria: {props.category}</p>
                <div className={style.btn_div}>
                    <button className={style.card_btn}>Comprar</button>
                </div>
            </div>
        </div>
    </div>)
}