import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./Header.module.scss";

export default function Header({ handleCart }) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img
                        className="mr-15"
                        width={40}
                        height={40}
                        src="img/logo.svg"
                        alt="logo"
                    />
                    <div className="headerInfo">
                        <h3 className="m-0 text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li
                    className="mr-30 d-flex align-center cu-p"
                    onClick={handleCart}
                >
                    <img
                        className="mr-10"
                        width={18}
                        height={18}
                        src="img/cart.svg"
                        alt="card"
                    />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="d-flex mr-30 align-center">
                    <Link to="/favorites">
                        <img
                            className="mr-10"
                            width={18}
                            height={18}
                            src="img/favorite.svg"
                            alt="user"
                        />
                        <span>Избранное</span>
                    </Link>
                </li>
                <li className="d-flex align-center">
                    <Link to="/orders">
                        <img
                            className="mr-10"
                            width={18}
                            height={18}
                            src="img/user.svg"
                            alt="user"
                        />
                        <span>Профиль</span>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
