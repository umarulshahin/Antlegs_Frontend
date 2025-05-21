import React from 'react';
import useUsers from '../Hooks/UseUsers';


const EditModal = ({ data, isModal, closeModal }) => {
  if (!isModal) return null;

  const {EditUser_axios} = useUsers()
  const handleSubmit = (e) => {

    e.preventDefault();
    const form = e.target
    const updatedata = {
        '_id': data._id,
        'username': form.username.value,
        'email': form.email.value
    }
    EditUser_axios(updatedata)
    closeModal()

  }

  return (
    <div className="fixed inset-0  bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              defaultValue={data?.username}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              name="username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={data?.email}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              name="email"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 font-semibold cursor-pointer py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 font-semibold cursor-pointer py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
