import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Categories, SortPopup, PizzaBlock, LoadingBlock } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortCategories = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const cartItems = useSelector(({ cart }) => cart.items);
  const {category, sortBy} = useSelector(({filters}) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames} activeCategory={category} onClickCategory={onSelectCategory} />
        <SortPopup items={sortCategories} activeSortType={sortBy.type} onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded ? items.map((obj) => <PizzaBlock onClickAddPizza={handleAddPizzaToCart} key={obj.id} addedCount={cartItems[obj.id] && cartItems[obj.id].items.length} {...obj} />) : Array(10).fill(0).map((_, index) => <LoadingBlock key={index}/>)} 
      </div>
    </div>
  );
}

export default Home;
