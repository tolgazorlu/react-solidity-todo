import useContract from "../hooks/useContract";
import useConnection from "../hooks/useConnection";
import { useEffect, useState } from "react";
import TodoContract from "../contracts/todo";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const contract = useContract(TodoContract.address, TodoContract.abi);

  //CONNECTION
  const connection = useConnection();

  useEffect(() => {
    connection.connect();

    if (connection.address) {
      listTodos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection.address]);

  //LIST TODO
  const listTodos = async () => {
    try {
      const tasks = await contract.list();
      setTodos(
        tasks.map((task) => ({
          isCompleted: task.isCompleted,
          content: task.content,
        }))
      );
    } catch (error) {
      setError("ListTodos başarısız: " + error);
    }
  };

  //ADD TODO
  const addTodo = async (value) => {
    try {
      const task = await contract.addTask(value);
      await task.wait();
      setTodos([...todos, { isCompleted: false, content: value }])
    } catch (error) {
      setError("AddTodo başarısız: " + error);
    }
  };

  //UPDATE TASK COMPLETE STATUS
  const onTaskStatus = async (index, item) => {
    try {
      const task = await contract.updateTaskStatus(index);
      await task.wait();
      const _todos = [...todos];
      _todos[index].isCompleted = !_todos[index].isCompleted;
      setTodos(_todos);
    } catch (error) {
      setError("updateTaskStatus başarısız: " + error);
    }
  };

  //DELETE TASK
  const onClickDelete = async (index) => {
    try {
      const task = await contract.removeTask(index);
      await task.wait();
      setTodos(todos.filter((_, _index) => index !== _index));
    } catch (error) {
      setError("removeTask başarısız: " + error);
    }
  };

  //SEARCH INPUT
  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  //PRESS ENTER
  const onPress = (event) => {
    const value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      addTodo(value);
    }
  };

  if (connection.isConnecting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {connection.address}
      <input value={search} onChange={onSearch} onKeyDown={onPress} />
      <ul style={{ width: "max-content" }}>
        {todos.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                textDecoration: item.isCompleted ? "line-through" : "inherit",
                cursor: "pointer",
              }}
            >
              <span
                onClick={() => {
                  onTaskStatus(index);
                }}
              >
                {item.content}
              </span>

              <span
                onClick={() => {
                  onClickDelete(index);
                }}
              >
                {" "}
                - &times;{" "}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
