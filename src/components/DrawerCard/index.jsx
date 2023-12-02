import React, { useContext, useState } from "react";
import cl from "./DrawerCard.module.scss";
import AppContext from "../../context";

export default function DrawerCard({
    cardOpened,
    setCardOpened,
    favorite = false,
}) {
    const {
        isItemAdded,
        isItemFavorite,
        drawerCardObj,
        onAddToCart,
        onAddToFavorite,
    } = useContext(AppContext);

    const [isFavorite, setIsFavorite] = useState(favorite);

    const obj = drawerCardObj;

    const handlePlus = () => {
        onAddToCart(obj);
    };

    const handleFavorite = () => {
        onAddToFavorite(obj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={`${cl.overlay} ${cardOpened ? cl.overlayVisible : ""}`}>
            <div className={cl.drawerCard}>
                <img
                    onClick={() => setCardOpened(false)}
                    width={32}
                    height={32}
                    className={cl.closeBtn}
                    src="img/remCartItem.svg"
                    alt=""
                />
                <div className={cl.drawerCardLeft}>
                    <img
                        className={cl.drawerCardLeft_Img}
                        width={200}
                        height={200}
                        src={drawerCardObj.img}
                        alt="sneak"
                    />
                    <div className={cl.drawerCardLeft_Size}>
                        <b>Размеры:</b>
                        <ul>
                            <li>
                                <input
                                    className="cu-p"
                                    type="radio"
                                    id="huey"
                                    name="drone"
                                    value="huey"
                                />
                                <label>45</label>
                            </li>
                            <li>
                                <input
                                    className="cu-p"
                                    type="radio"
                                    id="huey"
                                    name="drone"
                                    value="huey"
                                />
                                <label>46</label>
                            </li>
                            <li>
                                <input
                                    className="cu-p"
                                    type="radio"
                                    id="huey"
                                    name="drone"
                                    value="huey"
                                />
                                <label>47</label>
                            </li>
                        </ul>
                    </div>
                    <div className={cl.drawerCardLeft_Action}>
                        <img
                            className="cu-p"
                            width={32}
                            height={32}
                            src={
                                isItemAdded(obj.id)
                                    ? "img/addCartItemActive.svg"
                                    : "img/addCartItem.svg"
                            }
                            alt="button"
                            onClick={handlePlus}
                        />
                        <img
                            className="cu-p"
                            width={32}
                            height={32}
                            src={
                                isItemFavorite(obj.id)
                                    ? "img/heart_liked.svg"
                                    : "img/heart_unliked.svg"
                            }
                            alt=""
                            onClick={handleFavorite}
                        />
                    </div>
                </div>
                <div className={cl.drawerCardRight}>
                    <b className={cl.drawerCardRight_Name}>
                        {drawerCardObj.name}
                    </b>
                    <span className={cl.drawerCardRight_Price}>
                        <b>Стоимость:</b> {drawerCardObj.price} руб.
                    </span>
                    <div className={cl.drawerCardRight_Info}>
                        <b className={cl.drawerCardRight_Info_Title}>
                            Описание товара:
                        </b>
                        <p className={cl.drawerCardRight_Info_Text}>
                            {drawerCardObj.info}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
