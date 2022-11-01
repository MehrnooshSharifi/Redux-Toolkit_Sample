import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/Counter/CounterSlice";

const CounterComponent = () => {
  const counter = useSelector((state) => state.counter);
  const [inputValue , setInputValue] =useState();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter State</h1>
      <h2>Counter : {counter.value} </h2>
      <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}  />
      <button onClick={() => dispatch(increment(Number(inputValue)|| 0))}>+</button>
      <button onClick={() => dispatch(decrement(Number(inputValue) ||0 ))}>-</button>
    </div>
  );
};

export default CounterComponent ;
