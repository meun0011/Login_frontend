import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalEditUser = ({ user, closeModal, setTrigger }) => {
  const [editedUser, setEditedUser] = useState({
    id: '',
    fname: '',
    email: '',
    // Add more fields as necessary
  });

  // Populate the form when the modal opens or the user prop changes
  useEffect(() => {
    if (user) {
      setEditedUser({
        id: user.id,
        fname: user.fname,
        email: user.email,
        // Ensure to add all necessary fields here
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const rs = await axios.put(`http://localhost:8889/todos/adminput${user.id}`, editedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrigger(prev => !prev);
      closeModal(); // Close the modal on success
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle errors, maybe set an error message state and display it
    }
  };

  // Don't render if there's no user data
  if (!user) return null;

  return (
    <dialog id="edit_user_modal" className="rounded-lg p-5 bg-white shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>

        {/* Name Field */}
        <label htmlFor="fname" className="mb-2">Name</label>
        <input
          id="fname"
          name="fname"
          type="text"
          value={editedUser.fname}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />

        {/* Email Field */}
        <label htmlFor="email" className="mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={editedUser.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />

        {/* Add more fields as needed */}

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        {/* Cancel Button */}
        <button type="button" onClick={closeModal} className="mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-700">
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default ModalEditUser;
