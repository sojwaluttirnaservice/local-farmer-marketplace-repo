import { api } from "../../utils/instance.js"
import toast from "../../utils/toasts.js"

const handleSignup = async (e) => {

    e.preventDefault()

    const signupForm = document.getElementById('signup-form')

    const signupData = new FormData(signupForm)

    let { _data, _error } = await api.post('/auth/signup', signupData)

    if (_data.success) {
        toast.success(_data.message, () => {
            setTimeout(() => {
                location.href = '/auth/login'
            }, 1000)
        })
    }
}


$(document).on('click', '#signup-btn', handleSignup)