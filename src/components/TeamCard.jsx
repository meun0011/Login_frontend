import axios from "axios";
import React from "react";
axios

export default function TeamCard(props) {
  const { user,  setTrigger } = props;
  const handleDelete = async e =>{
    
      e.stopPropagation()
      const isConfirmed = window.confirm(`คุณแน่ใจว่าต้องการจะลบหรือไม่ ${user.id}? `)
      if (isConfirmed){
        try{
      const token = localStorage.getItem("token");
      let rs = await axios.delete(`http://localhost:8889/todos/admin${user.id}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setTrigger(prev=>!prev)
      //  onDelete(user.id); // ส่ง ID ของผู้ใช้ที่ถูกลบกลับไปให้โดยการเรียกใช้ฟังก์ชันที่ถูกส่งเข้ามาจาก parent component
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};
  
  return (
    <div className="card w-5/6  shadow-xl mx-auto cursor-pointer
    active:shadow-none active:translate-x-2 active:translate-y-1">
      <div className="card-body">
        <h2 className="card-title">User Information</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Name: {user.fname}</h3>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            
          </div>
          <div className="flex justify-center">
          <div className="badge badge-secondary" onClick={handleDelete}>delete</div>
          </div>
        </div>
      </div>
    </div>
  );
}

