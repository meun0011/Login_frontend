import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalEdit(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    title: "",
    Description: "",
    dueDate: new Date().toISOString().split("T")[0],
    EndDate: "",
    status: "",
  });
  const [status, setStatus] = useState([]);

  useEffect(() => {
    let allStatus = JSON.parse(localStorage.getItem("status"));
    if (allStatus) {
      return setStatus(allStatus);
    }
    const run = async () => {
      const token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8889/todos/newall-status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("status", JSON.stringify(rs.data.status));
      setStatus(rs.data.status);
    };
    run();
  }, []);

  useEffect(() => {
    setInput({
      title: el?.title || "",
      Description: el?.Description || "",
      dueDate: new Date(el ? el?.dueDate : null).toISOString().split("T")[0],
      EndDate: el?.EndDate || "", // Added this line for EndDate
      status: el?.status || "",
    });
  }, [el?.id]);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const output = { ...input, dueDate: new Date(input.dueDate), EndDate: new Date(input.EndDate) };
      const token = localStorage.getItem("token");
      const rs = await axios.put(`http://localhost:8889/todos/new${el.id}`, output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrigger((prv) => !prv);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
        <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Todo title</span>
  </div>
  <input
    type="text"
    placeholder="Type here"
    className="input input-bordered w-full "
    name="title"
    value={input.title}
    onChange={hdlChange}
  />
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Todo Description</span>
  </div>
  <input
    type="text"
    placeholder="Type here"
    className="input input-bordered w-full "
    name="Description"
    value={input.Description}
    onChange={hdlChange}
  />
</label>
<label className="form-control w-full max-w-[220px] ">
  <div className="label">
    <span className="label-text">Due Date</span>
  </div>
  <input type="date" name="dueDate" value={input.dueDate} onChange={hdlChange} />
</label>
          {/* ... existing code ... */}
          <label className="form-control w-full max-w-[220px] ">
            <div className="label">
              <span className="label-text">End Date</span>
            </div>
            <input type="date" name="EndDate" value={input.EndDate} onChange={hdlChange} />
          </label>
          <select className="select select-bordered w-full max-w-xs"
  name = "status"
  value = {input.status}
  onChange={hdlChange}
>
  { status.map( el => (
    <option key={el} value={el}>{el}</option>
  ))}
</select>
<button type='submit' className="btn btn-primary" onClick={closeModal}>Update</button>
<button type='button' className="btn btn-secondary" onClick={closeModal}>Cancel</button>
          {/* ... existing code ... */}
        </form>
      </div>
    </dialog>
  );
}