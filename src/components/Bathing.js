import { useState } from "react";

const fetchSomething = async () => {
  return await new Promise((resolve) => setTimeout(resolve, 500));
};

export default function BathingDemo() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  console.log("render");

  function handleClick() {
    // two state update calls => batched together in React 17
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }

  function asyncClickHandler() {
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these because
      // React 18 batches async update together
      setCount((c) => c + 1);
      setFlag((f) => !f);
    });
    // setTimeout(() => {
    //   setCount((c) => c + 1);
    //   setFlag((f) => !f);
    // }, 500);
  }

  return (
    <div>
      <button onClick={handleClick}>sync change</button>
      <br />
      <br />
      <button onClick={asyncClickHandler}>async change</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
