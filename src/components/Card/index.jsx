import React, { useContext, useState } from "react";
import cl from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

export default function Card({
    img,
    price,
    name,
    id,
    onAddToCart,
    onAddToFavorite,
    favorite = false,
    loading = false,
}) {
    const { isItemAdded, isItemFavorite } = useContext(AppContext);
    //маркер добавленного в избранное
    const [isFavorite, setIsFavorite] = useState(favorite);
    const obj = { id, parentID: id, img, price, name };

    //добавляет элемент в КОРЗИНУ
    const handlePlus = () => {
        onAddToCart(obj);
    };

    //добавляет элемент в ИЗБРАННОЕ
    const handleFavorite = () => {
        onAddToFavorite(obj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={cl.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={150}
                    height={210}
                    viewBox="0 0 150 210"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="130" rx="2" ry="2" width="150" height="15" />
                    <rect x="0" y="150" rx="2" ry="2" width="100" height="15" />
                    <rect x="0" y="180" rx="5" ry="5" width="80" height="24" />
                    <rect
                        x="118"
                        y="172"
                        rx="10"
                        ry="10"
                        width="32"
                        height="32"
                    />
                    <rect
                        x="0"
                        y="10"
                        rx="10"
                        ry="10"
                        width="150"
                        height="90"
                    />
                </ContentLoader>
            ) : (
                <>
                    <div className={cl.favorite}>
                        {onAddToFavorite && (
                            <img //убирает кнопку избранных если не передается функция добавления
                                width={32}
                                height={32}
                                src={
                                    isFavorite
                                        ? "img/heart_liked.svg"
                                        : "img/heart_unliked.svg"
                                }
                                alt=""
                                onClick={handleFavorite}
                            />
                        )}
                    </div>
                    <img
                        className="mb-15"
                        width={133}
                        height={112}
                        src={img}
                        alt="sneakers"
                    />
                    <p className="mb-15">{name}</p>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span className="text-uppercase">Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onAddToCart && (
                            <img //убирает кнопку добавления если не передается функция добавления
                                className={cl.plus}
                                width={32}
                                height={32}
                                src={
                                    isItemAdded(id)
                                        ? "img/addCartItemActive.svg"
                                        : "img/addCartItem.svg"
                                }
                                alt="button"
                                onClick={handlePlus}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
