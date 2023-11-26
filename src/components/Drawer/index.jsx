import { useContext, useState } from "react";
import Info from "../Info";
import cl from "./Drawer.module.scss";
import AppContext from "../../context";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

export default function Drawer({ onRemoveFromCart, opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const { handleCart } = useContext(AppContext);
    const [orderId, setOrderId] = useState(1);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const totalPrice = cartItems.reduce((sum, obj)=> obj.price + sum, 0)

    const onClickOrder = async () => {
        try {
            const orderDate = () => {
                const Data = new Date();
                return Data.toLocaleString();
            };
            setIsLoading(true);
            const { data } = await axios.post(
                "https://6549399bdd8ebcd4ab245c9f.mockapi.io/orders",
                {
                    items: cartItems,
                    date: orderDate(),
                    // parentID: orderId++
                }
            );

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];

                await axios.delete(
                    "https://65415029f0b8287df1fe3a27.mockapi.io/cart/" +
                        item.id
                );
            }
        } catch (error) {
            alert("Не удалось создать заказ");
            console.log(error);
        }

        setIsLoading(false);
    };

    const onOverlayClose = (e) => {
        const targetClassValue = e.target.classList.value;
        if (targetClassValue.split(" ").includes(`${cl.overlay}`)) {
            handleCart();
        }
    };

    return (
        <div
            className={`${cl.overlay} ${opened ? cl.overlayVisible : ""}`}
            onClick={(event) => onOverlayClose(event)}
        >
            <div className={cl.drawer}>
                <h2 className="mb-30">
                    Корзина{" "}
                    <img
                        onClick={handleCart}
                        className={cl.remCartItem}
                        src="img/remCartItem.svg"
                        alt="close"
                    />
                </h2>
                {cartItems.length > 0 ? (
                    <div className={cl.cartMain}>
                        <div className={cl.cartItems}>
                            {cartItems.map((item, index) => (
                                <div className={cl.cartItem} key={item.id}>
                                    <img
                                        className="mr-10"
                                        width={70}
                                        height={70}
                                        src={item.img}
                                        alt="sneak"
                                    />
                                    <div>
                                        <p className="mb-5">{item.name}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <img
                                        className={cl.remCartItem}
                                        src="img/remCartItem.svg"
                                        alt="remove"
                                        onClick={() => {
                                            onRemoveFromCart(item.id);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={cl.cartTotalBlock}>
                            <ul>
                                <li className="d-flex justify-between">
                                    <span>Итого: </span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li className="d-flex justify-between">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>
                                        {((totalPrice / 100) * 5).toFixed(2)}{" "}
                                        руб.{" "}
                                    </b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                className={cl.greenButton}
                                onClick={onClickOrder}
                            >
                                Оформить заказ{" "}
                                <img src="img/arrow.svg" alt="" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        img={
                            isOrderComplete
                                ? "img/order_complete.svg"
                                : "img/empty_cart.jpg"
                        }
                        title={
                            isOrderComplete
                                ? "Заказ оформлен!"
                                : "Корзина пустая"
                        }
                        description={
                            isOrderComplete
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                        }
                    />
                )}
            </div>
        </div>
    );
}
