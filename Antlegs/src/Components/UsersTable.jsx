import React, { useState, useEffect } from 'react';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import ModalManager from '../Modals/ModalManager';

const UsersTable = () => {
  const Allusers = useSelector((state) => state.userdata.all_users_data);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRow, setActiveRow] = useState(null);
  const [updatedata, setUpdatedata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    if (Allusers && Array.isArray(Allusers)) {
      setUsers(Allusers);
      setFilteredUsers(Allusers);
    }
  }, [Allusers]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = (id) => {
    const updated = filteredUsers.filter(user => user._id !== id);
    setFilteredUsers(updated);
    setActiveRow(null);
  };

  const handleUpdate = (id) => {
    console.log(`Update user with ID: ${id}`);
    setActiveRow(null);
  };

  const handleModal = (data,type)=>{
    setUpdatedata(data)
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(user.created_at)}</td>
                  <td className="px-6 py-4 text-right text-sm relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveRow(activeRow === user._id ? null : user._id);
                      }}
                      className="text-gray-400 cursor-pointer hover:text-gray-600 focus:outline-none p-2 rounded-full hover:bg-gray-100"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                    {activeRow === user._id && (
                      <div className="absolute right-0 mt-2 mr-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => handleModal(user,'edituser')}
                            className="flex items-center w-full cursor-pointer text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
                          >
                            <PencilSquareIcon className="mr-3 h-4 w-4" /> Edit User
                          </button>
                          <button
                            onClick={() => handleModal({"user_id":user._id,"username":user.username},'deleteuser')}
                            className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                          >
                            <TrashIcon className="mr-3 h-4 w-4" /> Delete User
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <ModalManager
                data ={updatedata}
                type={modalType}
                closeModal={handleCloseModal}
                isModal={isModalOpen}
               />
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No users found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
