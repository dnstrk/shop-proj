import React from "react";
import cl from "./Stub.module.scss";
import { Link } from "react-router-dom";

export default function Stub(props) {
    return (
        <div className={cl.Empty}>
            <img src={props.img} alt="empty" />
            <h5>{props.title}</h5>
            <span>{props.description}</span>
                <Link to="/" className="cu-p">
                    <img src="img/arrow_left.svg" alt="" />
                    Вернуться назад
                </Link>
        </div>
    );
}
