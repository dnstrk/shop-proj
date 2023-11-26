import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context";
import axios from "axios";
import Card from "../components/Card";
import Stub from "../components/Stub";

export default function TestOrders() {
    const { onAddToCart, onAddToFavorite } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    "https://6549399bdd8ebcd4ab245c9f.mockapi.io/orders"
                );
                // console.log(data);
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                console.log("Ошибка получения заказов");
            }
        })();
    }, []);


    return (
        <div className="content p-40 clear">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои заказы Split</h1>
            </div>
            <div className="cards d-flex">
                {orders.length > 0 ? (
                    <div className="orders d-flex">
                        {orders.map((item, index) => (
                            <div className="order" key={index}>
                                <div className="ordersTitle mb-20">
                                    Заказ #{item.id} <br />
                                    <p className="orderDate mt-10">({item.date})</p>
                                </div>
                                <div className="cards d-flex">
                                    {item.items.map((card, index) => (
                                        <Card
                                            key={index}
                                            {...card} //аналог передачи значений
                                            favorite={false}
                                            loading={isLoading}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Stub
                        img="img/orders_empty.svg"
                        title="У вас нет заказов"
                        description="Оформите хотя бы один заказ."
                    />
                )}
            </div>
        </div>
    );
}
