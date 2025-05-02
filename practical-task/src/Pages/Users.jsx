import React, { useEffect, useState } from "react";
import { getAllUserData, deleteUser, updateUser } from "../api";
import Navbar from "../components/Navbar";
import { TOAST_SUCCESS } from "../utils/common";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ name: "", number: "", gender: "" });

  const fetchUsers = async () => {
    const res = await getAllUserData();
    if (res.data.success) setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, number: user.number, gender: user.gender });
    setShowEdit(true);
  };

  const handleDelete = (user) => {
    setEditingUser(user);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    await deleteUser(editingUser.id);
    setShowDelete(false);
    fetchUsers();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", editingUser.id);
    formData.append("name", form.name);
    formData.append("email", editingUser.email);
    formData.append("number", form.number);
    formData.append("gender", form.gender);

    try {
      const res = await updateUser(formData);
      if (res.data.success) {
        TOAST_SUCCESS("User updated successfully");
        setShowEdit(false);
        fetchUsers();
      } else {
        alert("Update failed");
      }
    } catch (error) {
      alert("Error updating user");
    }
  };

  return (
    <>
      <Navbar />
      <div className="users-container">
        <h2>User List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.is_admin === "1" ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showEdit && (
          <div className="modal">
            <div className="edit-modal">
              <h3>Edit User</h3>
              <form onSubmit={handleUpdate}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="text" value={editingUser.email} disabled />
                </div>
                <div>
                  <label>Number:</label>
                  <input
                    type="text"
                    value={form.number}
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                    pattern="\d{10}"
                    required
                  />
                </div>
                <div>
                  <label>Gender:</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === "Male"}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === "Female"}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDelete && (
          <div className="modal">
            <div className="delete-modal">
              <p>Are you sure you want to delete this user?</p>
              <div className="modal-actions">
                <button onClick={confirmDelete}>Delete</button>
                <button
                  onClick={() => setShowDelete(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
