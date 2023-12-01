import "./App.scss";
import "macro-css";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";
import TestOrders from "./pages/TestOrders";
import DrawerCard from "./components/DrawerCard";

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [cardOpened, setCardOpened] = useState(false);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResp, favoriteResp, itemResp] = await Promise.all([
                    axios.get(
                        "https://65415029f0b8287df1fe3a27.mockapi.io/cart"
                    ),
                    axios.get(
                        "https://6549399bdd8ebcd4ab245c9f.mockapi.io/favorite"
                    ),
                    axios.get(
                        "https://65415029f0b8287df1fe3a27.mockapi.io/items"
                    ),
                ]);

                setIsLoading(false);

                setCartItems(cartResp.data);
                setFavoriteItems(favoriteResp.data);
                setItems(itemResp.data);
            } catch (error) {
                alert("Ошибка при запросе данных");
                console.log(error.message);
            }
        }
        fetchData();
    }, []);

    //ДОБАВЛЕНИЕ ЭЛЕМЕНТА В MOCKAPI /CART
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(
                (item) => Number(item.parentID) == Number(obj.id)
            );
            if (findItem) {
                setCartItems((prev) =>
                    prev.filter(
                        (item) => Number(item.parentID) !== Number(obj.id)
                    )
                );
                await axios.delete(
                    `https://65415029f0b8287df1fe3a27.mockapi.io/cart/${findItem.id}`
                );
            } else {
                const { data } = await axios.post(
                    "https://65415029f0b8287df1fe3a27.mockapi.io/cart",
                    obj
                );
                setCartItems((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Ошибка при добавлении в корзину");
            console.log(error.message);
        }
    };

    //УДАЛЕНИЕ в OVERLAY ЭЛЕМЕНТА В MOCKAPI /CART
    const onRemoveFromCart = (id) => {
        try {
            // console.log(`https://65415029f0b8287df1fe3a27.mockapi.io/cart/${id}`)
            axios.delete(
                `https://65415029f0b8287df1fe3a27.mockapi.io/cart/${id}`
            );
            setCartItems((prev) =>
                prev.filter((item) => Number(item.id) !== Number(id))
            );
        } catch (error) {
            alert("Ошибка удаления из корзины");
            console.log(error.message);
        }
    };

    //ДОБАВЛЕНИЕ ЭЛЕМЕНТА В MOCKAPI /FAVORITE
    //ОБНОВЛЕНИЕ favoriteItems ДЛЯ ОТОБРАЖЕНИЯ
    const onAddToFavorite = async (obj) => {
        try {
            if (
                favoriteItems.find((item) => Number(item.id) == Number(obj.id))
            ) {
                axios.delete(
                    `https://6549399bdd8ebcd4ab245c9f.mockapi.io/favorite/${obj.id}`
                );
                setFavoriteItems((prev) =>
                    prev.filter((item) => Number(item.id) !== Number(obj.id))
                );
            } else {
                const { data } = await axios.post(
                    "https://6549399bdd8ebcd4ab245c9f.mockapi.io/favorite",
                    obj
                );
                setFavoriteItems((prev) => [...prev, data]);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const onRemoveFromFavorite = (id) => {
    //     axios.delete(
    //         `https://6549399bdd8ebcd4ab245c9f.mockapi.io/favorite/${id}`
    //     );
    // };

    const handleCart = () => {
        setCartOpened(!cartOpened);
    };

    const onChangeFilterInput = (e) => {
        setFilter(e.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(id) == Number(obj.parentID));
    };

    const isItemFavorite = (id) => {
        return favoriteItems.some((obj) => Number(id) == Number(obj.parentID));
    };

    const [drawerCardObj, setDrawerCardObj] = useState([]);


    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favoriteItems,
                isItemAdded,
                isItemFavorite,
                handleCart,
                setCartItems,
                onAddToCart,
                onAddToFavorite,
                setCardOpened,
                drawerCardObj,
                setDrawerCardObj,
            }}
        >
            <div className="wrapper clear">
                {/* {cartOpened && <Drawer onRemoveFromCart={onRemoveFromCart} />} */}
                <Drawer
                    onRemoveFromCart={onRemoveFromCart}
                    opened={cartOpened}
                />
                <DrawerCard
                    cardOpened={cardOpened}
                    setCardOpened={setCardOpened}
                />
                <Header handleCart={handleCart} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                filter={filter}
                                onChangeFilterInput={onChangeFilterInput}
                                setFilter={setFilter}
                                onAddToCart={onAddToCart}
                                onRemoveFromCart={onRemoveFromCart}
                                onAddToFavorite={onAddToFavorite}
                                isLoading={isLoading}
                            />
                        }
                        exact
                    />
                    <Route path="/favorites" element={<Favorites />} exact />
                    <Route path="/orders" element={<Orders />} exact />
                    <Route path="/testOrders" element={<TestOrders />} exact />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
