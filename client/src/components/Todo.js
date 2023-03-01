import useContract from "../hooks/useContract";
import useConnection from "../hooks/useConnection";
import { useEffect, useState } from "react";
import TodoContract from "../contracts/todo";
import { FcTodoList } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { CgEditFlipH } from "react-icons/cg";
import {AiFillCheckCircle} from 'react-icons/ai'

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
        setSearch("");

        const tx = await contract.addTask(value);
        await tx.wait();

        // listTodos();
        setTodos([...todos, { isCompleted: false, content: value }])
    } catch (err) {
        setError("addTodo başarısız: " + err.message)
    }
}

  //UPDATE TASK COMPLETE STATUS
  const onTaskStatus = async (index) => {
    try {
      const task = await contract.updateTaskStatus(index);
      await task.wait();
      const _todos = [...todos];
      _todos[index].isCompleted = !_todos[index].isCompleted;
      setTodos(_todos);
      console.log("event çalıştı")
    } catch (error) {
      setError("updateTaskStatus başarısız: " + error);
    }
  };

  //DELETE TASK
  const onClickDelete = async (event, index) => {
    event.stopPropagation();
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
    <div className="h-3/6 w-full flex items-center flex-col mt-16">
      {/* TITLE SECTION */}
      <div className="text-3xl font-bold text-dark mb-8 text-center">
        React Solidity Todo
      </div>

      <div className="flex items-center relative w-full justify-center">
        <label className="block w-2/6">
          <span className="absolute inset-y-0 flex items-center pl-2 text-light">
            <FcTodoList />
          </span>
          <input
            type="text" value={search} onChange={onSearch} onKeyDown={onPress}
            placeholder="What do you want today?"
            className="placeholder:italic placeholder:text-gray block bg-bgdark w-full rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink focus:ring-pink focus:ring-1 sm:text-sm text-light"
          />
        </label>
        <button
          type="button"
          className="text-white bg-gray hover:bg-blue text-sm px-8 py-2 ml-2 rounded-md"
        >
          Add Todo
        </button>
      </div>
      <ul className="w-full">
        {todos.map((item, index) => {
          return (
            <li key={index} className="h-10 w-full flex justify-center relative">
              <div className={item.isCompleted ? "h-8 w-3/6 bg-gray rounded-md mt-5 flex justify-between items-center ": "h-8 w-3/6 bg-bgdark rounded-md mt-5 flex justify-between items-center "}>
                <div className="ml-2 flex">
                <button className={item.isCompleted ? "text-green-800": "text-gray"} onClick={event => onTaskStatus(index)}>
                    <AiFillCheckCircle />
                  </button>
                  <span className="ml-2 text-light">{item.content}</span>
                </div>
                <div className="text-xl mr-2 mt-1">
                  <button className="text-blue">
                    <CgEditFlipH />
                  </button>
                  <button className="text-pink" onClick={(event) => onClickDelete(event, index)}>
                    <TiDelete />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
