import React, { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/Info";
import Stub from "../components/Stub";

export default function Favorites() {
    const { onAddToCart, onAddToFavorite, favoriteItems } =
        useContext(AppContext);
    return (
        <div className="content p-40 clear">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Избранное</h1>
            </div>
            <div className="cards d-flex">
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item) => (
                        <Card
                            key={item.id}
                            {...item} //аналог передачи значений
                            favorite={true}
                            onAddToCart={onAddToCart}
                            onAddToFavorite={onAddToFavorite}
                        />
                    ))
                ) : (
                    <Stub
                        img="img/favorite_empty.svg"
                        title="Закладок нет :("
                        description="Вы ничего не добавляли в закладки"
                    />
                )}
            </div>
        </div>
    );
}
