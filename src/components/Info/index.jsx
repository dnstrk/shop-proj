import React, { useContext } from "react";
import cl from "./Info.module.scss";
import AppContext from "../../context";

export default function Info({  img, title, description }) {
    const {handleCart} = useContext(AppContext)

    return (
        <div className={cl.cartEmpty}>
            <img src={img} alt="empty-cart" />
            <h5>{title}</h5>
            <span>
                {description}
            </span>
            <button className="cu-p" onClick={handleCart}>
                <img src="img/arrow_left.svg" alt="" />
                Вернуться назад
            </button>
        </div>
    );
}
