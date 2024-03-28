import React from 'react'

export default function UserCard(props) 
{const {el, openModal} = props

  return (
    
      <div className="card w-5/6 bg-cyan-400 shadow-xl mx-auto cursor-pointer
    active:shadow-none active:translate-x-2 active:translate-y-1" onClick={()=>openModal(el.id)}>
      <div className="card-body">
        <h2 className="card-title">User Information</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Name: {el.fname}</h3>
            <p>Username: {el.username}</p>
            <p>Password: {el.password}</p>
            <p>Email: {el.email}</p>
            <p>Role: {el.role}</p>
            
          </div>
          {/* <div className="flex justify-center">
          <div className="badge badge-secondary" onClick={handleDelete}>delete</div>
          </div> */}
        </div>
      </div>
    </div>
    
  )
}
