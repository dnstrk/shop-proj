import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

export default function Home({
    items,
    filter,
    onChangeFilterInput,
    setFilter,
    onRemoveFromCart,
    onRemoveFromFavorite,
    isLoading,
}) {
    const {onAddToCart, onAddToFavorite} = useContext(AppContext)
    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );

        return (isLoading ? [...Array(8)] : filteredItems).map(
            (item, index) => (
                <Card
                    key={index}
                    {...item}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    onAddToFavorite={onAddToFavorite}
                    onRemoveFromFavorite={onRemoveFromFavorite}
                    loading={isLoading}
                />
            )
        );
    };
    return (
        <div className="content p-40 clear">
            <div className="d-flex justify-between align-center mb-40">
                <h1>
                    {filter ? `Поиск по запросу: ${filter}` : "Все кроссовки"}
                </h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="" />
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={filter}
                        onChange={onChangeFilterInput}
                    />
                    <img
                        className="cu-p"
                        onClick={() => setFilter("")}
                        src="img/remCartItem.svg"
                        alt="close"
                    />
                </div>
            </div>
            <div className="cards d-flex">{renderItems()}</div>
        </div>
    );
}
