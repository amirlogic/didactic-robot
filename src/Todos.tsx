
import React, { useState } from "react";

type ListItem = {

  text: string;
  status: string;
  deadline: string;

}

type RowData = {

  [key: string]: ListItem;
}

interface RowProps extends ListItem {

  index: number;
  id: string;
  edit: boolean;
}

const listData: RowData = {

  "001":{"text":"hello there","status":"todo","deadline":""},
  "002":{"text":"general kenobi","status":"todo","deadline":""}
};

function Row(props: RowProps) {

    //const dline = (props.deadline === "000") ? "no deadline" : "deadline!" ;

    const [edit, setEdit] = useState("");

    const [status, setStatus] = useState(props.status);

    const [deadline, setDeadline] = useState(props.deadline);

    const saveStatus = ()=>{

      setEdit("");
      listData[props.id].status = status;
      listData[props.id].deadline = deadline;
    }

    const deadlineDate = (rawdate: string)=>{

      let [ddate,dtime] = rawdate.split('T');

      let [dyear,dmonth,dday] = ddate.split('-');

      return [dday,dmonth,dyear].join('-') + ' ' + dtime;
    }
    
    return (

      <React.Fragment>
        
          <span style={{ flex: 1 }}>{props.text}</span>
          {(edit === "status") ? 
          
          <span style={{ flex: 2 }}><form onSubmit={saveStatus}>
          <select onChange={(e)=>{setStatus(e.target.value)}}  value={status}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
          {' deadline: '}
          <input type="datetime-local" onChange={(e)=>{setDeadline(e.target.value)}} value={deadline}></input>
          {' '}<button type="submit">save</button></form>
          </span>
          :
          <><span title="click to edit" onClick={(e) => { setEdit("status"); } } style={{ flex: 2, cursor: "pointer" }}>{status}  {(!deadline) ? " " : " - deadline: " + deadlineDate(deadline)}</span></>
          
          }

      </React.Fragment>
    )
  
}

export default function Todos(props: unknown) {

  const [newTodo, setInputValue] = useState("");

  const [todos, setListItems] = useState(["001", "002"]);


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTodo)
      return;

    let newItemId = Date.now().toString();

    listData[newItemId] = {"text":newTodo,"status":"todo","deadline":""}

    setListItems([newItemId, ...todos]);
    setInputValue("");
  }

  function removeTodo(removeIndex: number) {
    const newtodos: Array<string> = todos.filter((_, index) => index !== removeIndex);
    setListItems(newtodos);
  }


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 700,
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
            placeholder="Write a new task here.."
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
              <Row id={todo} index={i} edit={false} text={listData[todo].text} status={listData[todo].status} deadline={listData[todo].deadline} />
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
