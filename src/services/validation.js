// Common validation patterns
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[0-9])(?=.*\W).{8,}$/,
    phone: /^\+?[\d\s-]{10,}$/,
    price: /^\d+(\.\d{1,2})?$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
};

// Validation Rules
const rules = {
    required: (value) => {
        if (value === undefined || value === null) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return true;
    },
    email: (value) => {
        if (!value) return true; // Skip if empty (use required rule for required fields)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    minLength: (value, length) => {
        if (!value) return true;
        return String(value).length >= length;
    },
    maxLength: (value, length) => {
        if (!value) return true;
        return String(value).length <= length;
    },
    min: (value, min) => {
        if (!value) return true;
        return Number(value) >= min;
    },
    max: (value, max) => {
        if (!value) return true;
        return Number(value) <= max;
    },
    password: (value) => {
        if (!value) return true;
        // At least 8 characters, one number, one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*\W).{8,}$/;
        return passwordRegex.test(value);
    },
    match: (value, target) => {
        return value === target;
    },
    number: (value) => {
        if (!value) return true;
        return !isNaN(value) && isFinite(value);
    },
    positiveNumber: (value) => {
        if (!value) return true;
        return !isNaN(value) && Number(value) > 0;
    },
    url: (value) => {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
    file: (value, { maxSize, types } = {}) => {
        if (!value) return true;
        if (!(value instanceof File)) return false;
        
        if (maxSize && value.size > maxSize) return false;
        if (types && !types.includes(value.type)) return false;
        
        return true;
    }
};

// Error Messages
const messages = {
    required: field => `${field} is required`,
    email: field => `${field} must be a valid email`,
    minLength: (field, length) => `${field} must be at least ${length} characters`,
    maxLength: (field, length) => `${field} cannot exceed ${length} characters`,
    min: (field, min) => `${field} must be at least ${min}`,
    max: (field, max) => `${field} cannot exceed ${max}`,
    password: field => `${field} must have at least 8 characters, one number and one special character`,
    match: (field, target) => `${field} must match ${target}`,
    number: field => `${field} must be a valid number`,
    positiveNumber: field => `${field} must be a positive number`,
    url: field => `${field} must be a valid URL`,
    file: field => `${field} is not a valid file`
};

// Validation Function
export const validate = (values, schema) => {
    const errors = {};
    let isValid = true;

    Object.entries(schema).forEach(([field, fieldRules]) => {
        Object.entries(fieldRules).forEach(([ruleName, ruleValue]) => {
            // Skip validation if field is empty and not required
            if (!values[field] && ruleName !== 'required') return;

            const rule = rules[ruleName];
            if (!rule) return;

            let isValidField = true;
            if (ruleName === 'match') {
                isValidField = rule(values[field], values[ruleValue]);
            } else if (typeof ruleValue === 'object') {
                isValidField = rule(values[field], ruleValue);
            } else if (typeof ruleValue === 'boolean') {
                isValidField = ruleValue ? rule(values[field]) : true;
            } else {
                isValidField = rule(values[field], ruleValue);
            }

            if (!isValidField) {
                errors[field] = messages[ruleName](
                    field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'),
                    ruleName === 'match' ? ruleValue.charAt(0).toUpperCase() + ruleValue.slice(1) : ruleValue
                );
                isValid = false;
            }
        });
    });

    return { isValid, errors };
};

// Validation Schemas
export const schemas = {
    login: {
        email: { required: true, email: true },
        password: { required: true }
    },
    register: {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        password: { required: true, password: true },
        confirmPassword: { required: true, match: 'password' }
    },
    store: {
        name: { required: true, minLength: 2 },
        address: { required: true }
    },
    item: {
        name: { required: true, minLength: 2 },
        price: { required: true, positiveNumber: true },
        stock: { required: true, number: true, min: 0 },
        store_id: { required: true },
        image: { 
            file: {
                maxSize: 5 * 1024 * 1024, // 5MB
                types: ['image/jpeg', 'image/png', 'image/gif']
            }
        }
    },
    transaction: {
        item_id: { required: true },
        quantity: { required: true, positiveNumber: true },
        total: { required: true, positiveNumber: true }
    },
    profile: {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true }
    },
    topUp: {
        amount: { required: true, positiveNumber: true }
    }
};

export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!patterns.email.test(email)) return 'Please enter a valid email address';
    return '';
};

export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (!patterns.password.test(password)) {
        return 'Password must have at least 8 characters, one number and one special character';
    }
    return '';
};

export const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
};

export const validatePrice = (price) => {
    if (!price) return 'Price is required';
    if (!patterns.price.test(price)) return 'Please enter a valid price';
    if (price <= 0) return 'Price must be greater than 0';
    return '';
};

export const validateStock = (stock) => {
    if (stock === undefined || stock === null) return 'Stock is required';
    if (isNaN(stock) || stock < 0) return 'Stock must be a positive number';
    return '';
};

export const validateQuantity = (quantity, maxQuantity) => {
    if (!quantity) return 'Quantity is required';
    if (quantity <= 0) return 'Quantity must be greater than 0';
    if (maxQuantity !== undefined && quantity > maxQuantity) {
        return `Quantity cannot exceed ${maxQuantity}`;
    }
    return '';
};

export const validateLoginForm = ({ email, password }) => {
    const errors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateRegistrationForm = ({ name, email, password }) => {
    const errors = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateStoreForm = ({ name, address }) => {
    const errors = {};
    
    if (!name) errors.name = 'Store name is required';
    if (!address) errors.address = 'Store address is required';

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateItemForm = ({ name, price, stock, store_id }) => {
    const errors = {};
    
    if (!name) errors.name = 'Item name is required';
    if (!store_id) errors.store_id = 'Store is required';
    
    const priceError = validatePrice(price);
    const stockError = validateStock(stock);

    if (priceError) errors.price = priceError;
    if (stockError) errors.stock = stockError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateTransactionForm = ({ item_id, quantity, user_id }) => {
    const errors = {};
    
    if (!item_id) errors.item_id = 'Item is required';
    if (!user_id) errors.user_id = 'User is required';
    
    const quantityError = validateQuantity(quantity);
    if (quantityError) errors.quantity = quantityError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};