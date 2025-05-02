import axios from "axios"

const BASE_URL = "https://rainflowweb.com/demo/react_test"

const api = axios.create({
    baseURL : BASE_URL,
    headers : {},
})

export const registerUser = (formData) => api.post('/new_user.php' , formData);
export const loginUser = (formData) => api.post('/login.php' , formData);
export const logoutUser = () => api.get('/logout.php');
export const getAllUserData = () => api.get('/user_list.php');
export const updateUser = (formData) => api.post('/update_user.php',formData);
export const deleteUser = (id) => api.get(`/delete_user.php?user_id=${id}`)
