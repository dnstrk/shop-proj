import React, { useContext } from "react";
import AppContext from "../context";

export default function MockapiInfo() {
    const { items, cartItems, favoriteItems, orders } = useContext(AppContext);

    

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h2 className="mb-20">Items</h2>
                {items.map((item) => (
                    <div className="d-flex justify-between pl-20 pr-20">
                        <span>{item.id}</span>
                        <span>{item.img}</span>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center" }}>
                <h2 className="mt-20 mb-20">CartItems</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div className="d-flex justify-between pl-20 pr-20">
                            <span>{item.id}</span>
                            <span>{item.img}</span>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                        </div>
                    ))
                ) : (
                    <span>Empty</span>
                )}
            </div>
            <div style={{ textAlign: "center" }}>
                <h2 className="mt-20 mb-20">FavoriteItems</h2>
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item) => (
                        <div className="d-flex justify-between pl-20 pr-20">
                            <span>{item.id}</span>
                            <span>{item.img}</span>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                        </div>
                    ))
                ) : (
                    <span>Empty</span>
                )}
            </div>
            <div style={{ textAlign: "center" }} className="pb-20">
                <h2 className="mt-20 mb-20">Orders</h2>
                {orders.length > 0 ? (
                    orders.map((item) => (
                        <div className="d-flex justify-between pl-20 pr-20">
                            <span>{item.id}</span>
                            <span>
                                Количество выбранных кроссовок{" "}
                                {item.items.length}
                            </span>
                        </div>
                    ))
                ) : (
                    <span>Empty</span>
                )}
            </div>
        </div>
    );
}
