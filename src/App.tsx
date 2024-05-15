import React, { useEffect, useState } from "react";

interface Item {
  type: string;
  name: string;
}
interface Done {
  type: string;
  name: string;
  timestamp: number;
}

const todoItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function App() {
  const [todos, setTodos] = useState<Item[]>(todoItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const [doneLists, setDoneLists] = useState<Done[]>([]);

  // checked the list of item
  const checkedItem = (item: Item) => {
    const done: Done = {
      name: item.name,
      type: item.type,
      timestamp: new Date().getTime(),
    };
    setDoneLists([...doneLists, done]);
    setTodos(todos.filter((i) => i.name !== item.name));
  };

  // cancel checked the list of item
  const cancelChecked = (item: Item) => {
    setDoneLists(doneLists.filter((i) => i.name !== item.name));
    setTodos([...todos, item]);
  };

  // move the item to fruit/vegetable
  const add = (item: Item) => {
    item.type === "Fruit"
      ? setFruits([...fruits, item])
      : setVegetables([...vegetables, item]);
    checkedItem(item);
  };

  // delete the item from fruit/vegetable
  const del = (item: Item) => {
    const itemName = item.name;
    item.type === "Fruit"
      ? setFruits(fruits.filter((i) => i.name !== itemName))
      : setVegetables(vegetables.filter((i) => i.name !== itemName));
    cancelChecked(item);
  };

  // cronJob auto delete item every 100 ms
  useEffect(() => {
    const time = setInterval(() => {
      const timeInterval = 5000; // 5s
      doneLists.forEach((item: Done) => {
        new Date().getTime() > item.timestamp + timeInterval && del(item);
      });
    }, 100);
    doneLists.length === 0 && clearInterval(time);
    return () => clearInterval(time);
  }, [doneLists]);

  const columnStyle = " flex flex-col justify-start items-center bg-[#efefef]";
  const h1Style = " text-[2rem] font-bold text-center mb-5";

  // return component
  return (
    <div className=" grid grid-cols-3 absolute w-full h-full">
      <div className={columnStyle}>
        <h1 className={h1Style}>Todo</h1>
        {todos.map((item, index) => (
          <div key={index} onClick={() => add(item)}>
            <Button>{item.name}</Button>
          </div>
        ))}
      </div>
      <div className={columnStyle}>
        <h1 className={h1Style}>Fruit</h1>
        {fruits.map((item, index) => (
          <div key={index} onClick={() => del(item)}>
            <Button>{item.name}</Button>
          </div>
        ))}
      </div>
      <div className={columnStyle}>
        <h1 className={h1Style}>Vegetable</h1>
        {vegetables.map((item, index) => (
          <div key={index} onClick={() => del(item)}>
            <Button>{item.name}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// button element
const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" transition-all cursor-pointer text-center py-4 m-2 drop-shadow-[0px_8px_25px_#00000055] 
                  bg-gradient-to-tr from-[#540000] to-[#3a0101] 
                  hover:scale-105 active:scale-y-0 w-[25rem] text-[#efefef] rounded-full"
    >
      {children}
    </div>
  );
};
