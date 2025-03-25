import { removeItem, storeItem } from "../../utils/common-handler.js";
import { api } from "../../utils/instance.js";
import toast from "../../utils/toasts.js";



const handleLogin = async (e) => {


    e.preventDefault();

    const loginDetails = new FormData(document.getElementById('login-form'));


    const { _data, _error } = await api.post('/auth/login', loginDetails)

    if (_data.success) {
        storeItem('user', _data.data.user)
        toast.success(_data.message, () => {
            setTimeout(() => {
                location.href = '/'
            }, 1000)
        })
    }

}



const handleLogout = async (e) => {
    e.preventDefault()

    const userResponse = confirm('Are you sure you want to logout?')

    if (userResponse) {
        const { _data, _error } = await api.post('/auth/logout')

        if (_data.success) {
            toast.success(_data.message, () => {
                setTimeout(() => {
                    removeItem('user')
                    location.href = '/';
                })
            })
        }
    }
}


$(document).on('click', '#login-btn', handleLogin)


$(document).on('click', '.logout-btn', handleLogout)