import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validate single field on blur if validation function exists
        if (validate) {
            const validationResult = validate(values);
            if (validationResult.errors && validationResult.errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: validationResult.errors[name]
                }));
            }
        }
    }, [values, validate]);

    const handleSubmit = useCallback(async (onSubmit) => {
        return async (e) => {
            e.preventDefault();
            setIsSubmitting(true);

            // Validate all fields
            if (validate) {
                const validationResult = validate(values);
                setErrors(validationResult.errors || {});

                if (!validationResult.isValid) {
                    setIsSubmitting(false);
                    // Mark all fields as touched on failed submit
                    setTouched(
                        Object.keys(values).reduce((acc, key) => ({
                            ...acc,
                            [key]: true
                        }), {})
                    );
                    return;
                }
            }

            try {
                await onSubmit(values);
            } catch (error) {
                setErrors(prev => ({
                    ...prev,
                    submit: error.message
                }));
            } finally {
                setIsSubmitting(false);
            }
        };
    }, [values, validate]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, []);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setFieldValue,
        setFieldError
    };
};

export default useForm;