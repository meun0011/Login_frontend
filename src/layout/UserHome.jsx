import axios from "axios";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import ModalEdit from "../components/ModalEdit";


export default function UserHome() {
  const [todos, setTodos] = useState([]);
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8889/todos/new", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(rs.data.todos);
    };
    run();
  }, [trigger]);

  const openModal = (id) => {
    let idx = todos.findIndex( el=> el.id === id)
    setEditIdx(idx)
    document.getElementById("my_modal_2").showModal()
  }

  const closeModal = () => {
    document.getElementById("my_modal_2").close()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-2xl text-blue-500">Your jobs</div>
      <ModalEdit el={todos[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
      <div className="flex flex-col gap-4">
        {todos.map((el) => (
          <TodoCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
        ))}
      </div>
    </div>
  );
}
