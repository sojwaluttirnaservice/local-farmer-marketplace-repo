const getUser = (request) => {
    return request?.session?.user || { role: 'admin' }
}

const isGet = (request) => {
    return request.method?.toLowerCase() == 'get';
}


module.exports = { getUser, isGet }