import axios from 'axios'
import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import UserEdit from '../components/UserEdit'

export default function EditUserForm() {
  const [users, setUsers] = useState([])
  const [editIdx, setEditIdex] = useState(-1)


  useEffect(() => {
    const run = async () => {
    
        let token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/todos/adminall",
          {
            headers: { Authorization: `Bearer ${token}` },
          })
        setUsers(response.data.users)
    }

    run()
  }, []) 
  const openModal = (id) =>{
    let idx = users.findIndex(el => el.id === id);
    setEditIdex(idx)
    document.getElementById('my_modal_2').showModal()
  }
  return (<>  
    <div className='flex flex-col gap-4'>
      <div className='text-center text-xl text-blue-400'> EditUser</div>
<UserEdit el={users[editIdx]}/>
      <div className='flex flex-col gap-4'>
   {/* {JSON.stringify(users)} */}

    {users.map(el =>(
        <UserCard Key={el.id} el={el} openModal={openModal}/>
    ))}
    </div>
   </div>
    </>

  )
    
}

