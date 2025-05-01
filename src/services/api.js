import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || {
            success: false,
            message: error.message || 'An error occurred'
        });
    }
);

// Auth APIs
export const loginUser = (email, password) => 
    api.post(`/user/login`, { email, password });

export const registerUser = (userData) =>
    api.post('/user/register', null, { params: userData });

export const updateProfile = (userData) =>
    api.put('/user', userData);

export const deleteUser = (userId) =>
    api.delete(`/user/${userId}`);

export const topUpBalance = (userId, amount) =>
    api.post('/user/topUp', null, { params: { id: userId, amount } });

// Store APIs
export const getAllStores = () =>
    api.get('/store');

export const getStoreById = (id) =>
    api.get(`/store/${id}`);

export const createStore = (storeData) =>
    api.post('/store/create', storeData);

export const updateStore = (storeData) =>
    api.put('/store', storeData);

export const deleteStore = (id) =>
    api.delete(`/store/${id}`);

// Item APIs
export const getAllItems = () =>
    api.get('/item');

export const getItemById = (id) =>
    api.get(`/item/byId/${id}`);

export const getStoreItems = (storeId) =>
    api.get(`/item/byStoreId/${storeId}`);

export const createItem = (formData) =>
    api.post('/item/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

export const updateItem = (formData) =>
    api.put('/item', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

export const deleteItem = (id) =>
    api.delete(`/item/${id}`);

// Transaction APIs
export const getAllTransactions = () =>
    api.get('/transaction');

export const createTransaction = (transactionData) =>
    api.post('/transaction/create', transactionData);

export const payTransaction = (transactionId) =>
    api.post(`/transaction/pay/${transactionId}`);

export const deleteTransaction = (transactionId) =>
    api.delete(`/transaction/${transactionId}`);

export default api;