import React, { useContext } from "react";
import cl from "./DrawerCard.module.scss";
import AppContext from "../../context";

export default function DrawerCard({ cardOpened, setCardOpened }) {
    const { isItemAdded, drawerCardObj, onAddToCart } = useContext(AppContext);

    const obj = drawerCardObj;

    const handlePlus = () => {
        onAddToCart(obj);
    };

    return (
        <div className={`${cl.overlay} ${cardOpened ? cl.overlayVisible : ""}`}>
            <div className={cl.drawerCard}>
                <b className={cl.sneakName}>{drawerCardObj.name}</b>
                <img
                    className={cl.closeBtn}
                    onClick={() => setCardOpened(false)}
                    src="img/remCartItem.svg"
                />
                <div className={cl.drawerCardImg}>
                    <img src={drawerCardObj.img} alt="" />
                </div>
                <div className={cl.drawerInfo}>
                    <p className={cl.sneakText}>{drawerCardObj.info}</p>
                    <div className={cl.sneakSize}>
                        <b>Размеры:</b>
                        <ul>
                            <li>45</li>
                            <li>46</li>
                            <li>47</li>
                        </ul>
                    </div>
                    <span className={cl.priceArea}>
                        <span>
                            <b>Цена:</b> {drawerCardObj.price} руб
                        </span>
                        <img 
                            className={cl.plus}
                            width={32}
                            height={32}
                            src={
                                isItemAdded(drawerCardObj.id)
                                    ? "img/addCartItemActive.svg"
                                    : "img/addCartItem.svg"
                            }
                            alt="button"
                            onClick={handlePlus}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
