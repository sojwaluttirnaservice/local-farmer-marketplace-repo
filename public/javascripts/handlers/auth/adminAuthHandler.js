import { api } from "../../utils/instance.js";
import toast from "../../utils/toasts.js";
// import toast from "../../utils/toasts.js";

// const { api } = require("../../utils/instance.js");





// const handleLogin = async (loginDetails) => {
//     try {

//         const { data } = await axios.post("/api/v1/auth/login", loginDetails);

//         console.log(data)

//         const { success, message } = data

//         if (success) {
//             toast.success(message)
//             setTimeout(() => {
//                 window.location.href = "/admin/dashboard" 
//             }, 100)
//         } else {
//             toast.error(message)
//         }
//     } catch (err) {
//         console.error(err);
//         toast.error(err?.response?.data?.message || "Something went wrong")
//     }
// }




$(document).on('click', '#admin-login-btn', async function (e) {
    e.preventDefault();

    const loginDetails = new FormData(document.getElementById('login-form'));

    const { _data, _error } = await api.post('/auth/admin', loginDetails)

    if (_data) {
        let { success, message, data } = _data;
        toast.success(message)
        location.href = '/admin/dashboard'
    }
})