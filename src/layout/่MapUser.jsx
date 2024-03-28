import axios from "axios";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import ModalEdit from "../components/ModalEdit";
import TeamCard from "../components/TeamCard"; // เพิ่ม import

export default function MapUser() {
  const [todos, setTodos] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8889/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(rs.data.todos);

      // เรียก API หรือจัดการข้อมูลทีมที่ผูกกับผู้ใช้
      // const teamsRs = await axios.get("your_teams_api_url");
      // setTeams(teamsRs.data.teams);
    };
    run();
  }, [trigger]);

  const openModal = (id) => {
    let idx = todos.findIndex((el) => el.id === id);
    setEditIdx(idx);
    document.getElementById("my_modal_2").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-2xl text-blue-500">Your jobs</div>
      <ModalEdit el={todos[editIdx]} closeModal={closeModal} setTrigger={setTrigger} />
      <div className="flex flex-col gap-4">
        {teams.map((team) => (
          <TeamCard key={team.teamID} team={team} />
        ))}
      </div>
      <div className="text-center text-2xl text-blue-500">Your todos</div>
      <div className="flex flex-col gap-4">
      { JSON.stringify(todos)}
        
      </div>
    </div>
  );
}
