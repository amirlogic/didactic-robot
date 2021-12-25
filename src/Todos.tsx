import { type } from "os";
import React, { useState } from "react";

type ListItem = {

  text: string;
  status: string;
  deadline: unknown;

}

type RowData = {

  [key: string]: ListItem;
}

const listData: RowData = {

  "001":{"text":"hello there","status":"todo","deadline":"?"},
  "002":{"text":"general kenobi","status":"todo","deadline":"?"}
};

export default function Todos(props: unknown) {

  const [newTodo, setInputValue] = useState("");

  const [todos, setListItems] = useState(["001", "002"]);

  const [edit, setEdit] = useState("");

  const [newStatus, setStatus] = useState("");

  const [newDeadline, setDeadline] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTodo)
      return;

    let newItemId = Date.now().toString();

    listData[newItemId] = {"text":newTodo,"status":"todo","deadline":"000"}

    setListItems([newItemId, ...todos]);
    setInputValue("");
  }

  function removeTodo(removeIndex: number) {
    const newtodos: Array<string> = todos.filter((_, index) => index !== removeIndex);
    setListItems(newtodos);
  }

  function showEdit(){


  }

  function saveEdit(){


  }

  function cancelEdit(){


  }

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
              <span style={{ flex: 1 }}>{listData[todo].text}</span>
              <span style={{ flex: 2 }}>{listData[todo].status} [{listData[todo].deadline}]</span>
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

}
