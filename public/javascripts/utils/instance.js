import toast from "./toasts.js";

// Create an Axios instance with a base URL for API requests
const instance = axios.create({
    baseURL: "/api/v1", // Base API URL for all requests
});

/**
 * A higher-order function to handle API requests asynchronously.
 * It wraps an async function, executes it, and manages error handling.
 *
 * @param {Function} fn - The async function that makes the API request.
 * @returns {Function} - A wrapped function that executes the API call and returns an object with `data` and `error` properties.
 */
const asyncApiHandler = (fn) => async (...args) => {
    const state = { _data: null, _error: null };

    try {
        const result = await fn(...args); // Execute the passed async function
        state._data = result; // Store the result data
    } catch (err) {
        state._error = err?.response?.data?.message || "Something went wrong"; // Store the error message
        console.error(err);
        toast.error(state._error); // Show a toast notification for the error
    }

    return state; // Return the state object
};

/**
 * API utility object to handle GET, POST, PUT, and DELETE requests.
 */
const api = {
    /**
     * Sends a GET request to the specified URL.
     *
     * @param {string} url - The endpoint URL.
     * @param {object} [config={}] - Optional Axios configuration.
     * @returns {Promise<{ data: any, error: string | null }>} - A promise that resolves with the response data or an error message.
     */
    get: asyncApiHandler(async (url, config = {}) => {
        const response = await instance.get(url, config);
        return response.data; // Return the response data from the API
    }),

    /**
     * Sends a POST request to the specified URL with the given payload.
     *
     * @param {string} url - The endpoint URL.
     * @param {object} data - The request payload.
     * @param {object} [config={}] - Optional Axios configuration.
     * @returns {Promise<{ data: any, error: string | null }>} - A promise that resolves with the response data or an error message.
     */
    post: asyncApiHandler(async (url, data, config = {}) => {
        const response = await instance.post(url, data, config);
        return response.data; // Return the response data from the API
    }),

    /**
     * Sends a PUT request to update an existing resource at the specified URL.
     *
     * @param {string} url - The endpoint URL.
     * @param {object} data - The updated data payload.
     * @param {object} [config={}] - Optional Axios configuration.
     * @returns {Promise<{ data: any, error: string | null }>} - A promise that resolves with the response data or an error message.
     */
    put: asyncApiHandler(async (url, data, config = {}) => {
        const response = await instance.put(url, data, config);
        return response.data; // Return the response data from the API
    }),

    /**
     * Sends a DELETE request to remove a resource at the specified URL.
     *
     * @param {string} url - The endpoint URL.
     * @param {object} [config={}] - Optional Axios configuration.
     * @returns {Promise<{ data: any, error: string | null }>} - A promise that resolves with the response data or an error message.
     */
    delete: asyncApiHandler(async (url, config = {}) => {
        const response = await instance.delete(url, config);
        return response.data; // Return the response data from the API
    }),
};

export { api };
