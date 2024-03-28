import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

export default function UserEdit(props) {
  const { el } = props; // รับ props onUpdate จาก parent component
  const [input, setInput] = useState({
      fname: '',
      username: '',
      email: '',
      role: '',
      password: ''
  });

  useEffect(() => {
      if (el) {
          setInput({
              fname: el.fname || '',
              username: el.username || '',
              email: el.email || '',
              role: el.role || '',
          });
      }
  }, [el]);

  const handleChange = e => {
      setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
      e.preventDefault();
      try {
          const token = localStorage.getItem('token');
          const updateData = { ...input };
          if (input.password === '') {
              delete updateData.password;
          }
          await axios.put(`http://localhost:8889/todos/adminput${el.id}`, updateData, {
              headers: { Authorization: `Bearer ${token}` }
          });
          alert('Update successful');
          window.location.reload(); // Reload the page after update

      } catch (err) {
          alert(err.message);
      }
  };

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={handleSubmit}>
                    <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                name="fname"
                                value={input.fname}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                name="username"
                                value={input.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="input input-bordered w-full"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="email" // Changed to type="email" for proper validation
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                name="email" // Corrected from "Description" to "email"
                                value={input.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Role</span>
                            </div>
                            <input
                                type="text" // Changed to type="email" for proper validation
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                name="role" // Corrected from "Description" to "email"
                                value={input.role}
                                onChange={handleChange}
                            />
                        </label>
          
                        <button className="btn btn-primary">Update</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    );
}
