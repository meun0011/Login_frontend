import axios from 'axios';
import { useState } from "react";

export default function AdminEdit({ user }) {
  const [input, setInput] = useState({
    id: user.id,
    fname: user.fname,
    username: user.username,
    password: '',
    confirmPassword: '',
    email: user.email
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const rs = await axios.put(`http://localhost:8889/users/${input.id}`, input);
      console.log(rs);
      if (rs.status === 200) {
        alert('Update Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5">Edit User</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="fname"
            value={input.fname}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">New Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm New Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
