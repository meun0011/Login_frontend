import axios from "axios";
import {useState} from "react";

export default function NewTodoForm() {
  const [input, setInput] = useState({
    title : '',
    Description : '',
    dueDate : new Date().toISOString().split('T')[0],
    EndDate: ''
  })

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

  // const hdlSubmit = async e => {
  //   try{
  //     e.preventDefault()
  //     // setInput(prv => ({...prv, dueDate: new Date(prv.dueDate) }))
  //     const output = { ...input, dueDate: new Date(input.dueDate) }
  //     const token = localStorage.getItem('token')
  //     const rs = await axios.post('http://localhost:8889/todos', output, {
  //       headers : { Authorization : `Bearer ${token}`}
  //     })
  //     alert('Create new OK')
  //   }catch(err) {
  //     alert(err.message)
  //   }
  // }
 
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
  
      // Assuming dueDate is correctly formatted
      const formattedDueDate = new Date(input.dueDate).toISOString();
  
      // Format EndDate with a time component, defaulting to the start of the day in UTC
      let formattedEndDate = input.EndDate ? new Date(input.EndDate) : new Date();
      formattedEndDate.setUTCHours(0, 0, 0, 0); // Optionally set to the start of the day
      formattedEndDate = formattedEndDate.toISOString();
  
      const output = {
        ...input,
        dueDate: formattedDueDate,
        EndDate: formattedEndDate,
      };
  
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8889/todos/new', output, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert('Create new OK');
    } catch (err) {
      alert(err.message);
    }
  };
  

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}
    >
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
      <label className="form-control w-full max-w-[220px]">
  <div className="label">
    <span className="label-text">End Date</span>
  </div>
  <input type="date" name="EndDate" value={input.EndDate || ''} onChange={hdlChange} />
</label>
      <button className="btn btn-primary">Add new</button>
    </form>
  );
}
