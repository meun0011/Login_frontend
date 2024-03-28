import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCard from "../components/TeamCard";
import ModalEditUser from "../components/ModalEditUser";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [editIdx, setEditIdx] = useState(-1); // To track which user is being edited
  const [trigger, setTrigger] = useState(false);
  // const [users, setUsers] = useState([]);
  // const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/todos/adminall",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [trigger]); 

  // const handleEdit = (user) => {
  //   setCurrentUser(user);
  // };
  const openModal = (id) => {
    let idx = users.findIndex(user => user.id === id);
    setEditIdx(idx);
    document.getElementById("edit_user_modal").showModal(); // Assuming this is the ID for your modal
  };

  const closeModal = () => {
    document.getElementById("edit_user_modal").close();
  };
  return (
    <div className="flex flex-col gap-4">
    <div className="text-center text-2xl text-blue-500">Admin: Manage Users</div>
    {editIdx !== -1 && (
      <ModalEditUser 
        user={users[editIdx]} 
        closeModal={closeModal} 
        setTrigger={setTrigger}
      />
    )}
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <TeamCard 
          key={user.id} 
          user={user} 
          openModal={() => openModal(user.id)} 
          setTrigger={setTrigger}
        />
      ))}
    </div>
  </div>
    // <div className="admin-user">
    //   {currentUser && (
    //     <TeamCard
    //       user={currentUser}
    //       onSave={handleSave}
    //       onCancel={handleCancel}
    //     />
    //   )}

    //   {users.map((user) => (
    //     <div key={user.id} onClick={() => handleEdit(user)}>
    //       <TeamCard user={user} />
    //     </div>
    //   ))}
    // </div>
  );
}
