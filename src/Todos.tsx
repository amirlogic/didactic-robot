import React, { ReactPropTypes, useState } from "react";

export default function Todos(props: unknown) {

  const [newTodo, setInputValue] = useState("")

  const [todos, setListItems] = useState(["hello there", "general kenobi"])


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) return;

    setListItems([newTodo, ...todos])
    setInputValue("")      
  };

  const removeTodo = (removeIndex: number) => {
    const newtodos: Array<string> = todos.filter((_, index) => index !== removeIndex);
    setListItems( newtodos )  
  };

  //render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          margin: "0 auto",
          padding: 8,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Todo</h2>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", marginBottom: 8 }}
        >
          <input
            type="text"
            name="newTodo"
            id="newTodo"
            value={newTodo}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Fix the thing.."
            style={{
              display: "inline-flex",
              flex: 1,
              padding: 4,
              border: "1px solid #eaeaea",
              marginRight: 4,
            }}
          />
          <button
            type="submit"
            style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}
          >
            Add
          </button>
        </form>
        <div>
          {todos.length === 0 && (
            <div style={{ textAlign: "center" }}>Add some todos</div>
          )}
          {todos.map((todo, i) => (
            <div
              key={`${todo}-${i}`}
              style={{
                padding: 4,
                borderBottom: "1px solid #ccc",
                display: "flex",
              }}
            >
              <span style={{ flex: 1 }}>{todo}</span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => removeTodo(i)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  //}
}
