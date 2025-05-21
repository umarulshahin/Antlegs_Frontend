import React from 'react'
import UseUsers from '../Hooks/UseUsers';

const DeleteModal = ({data,isModal,closeModal}) => {
 if (!isModal) return null;
 
   const {DeleteUser_axios}=UseUsers()
  const handleDelete =(data)=>{
    console.log(data,'delete data')
    DeleteUser_axios(data)
    closeModal()
  }
  return (
    <div className="fixed inset-0  bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between bg-red-500 rounded-t-2xl px-4 py-3">
          <h2 className="text-lg font-semibold text-white">Confirm Delete</h2>
          <button
            onClick={closeModal}
            className="text-white text-xl cursor-pointer hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center">
          <p className="text-gray-700 text-base">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-red-600">
              "{data?.username}"
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end px-6 pb-6 gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete({"id":data.user_id})}
            className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md text-sm font-medium hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

}

export default DeleteModal