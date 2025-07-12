import { useState, useCallback } from 'react';

interface FormConfig<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isLoading: boolean;
  isSubmitting: boolean;
  touched: Partial<Record<keyof T, boolean>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: FormConfig<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isLoading: false,
    isSubmitting: false,
    touched: {}
  });

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: '' },
      touched: { ...prev.touched, [name]: true }
    }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error }
    }));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldValue(name as keyof T, value);
  }, [setFieldValue]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Validate form if validation function is provided
      if (validate) {
        const errors = validate(state.values);
        const hasErrors = Object.keys(errors).length > 0;
        
        if (hasErrors) {
          setState(prev => ({ 
            ...prev, 
            errors,
            isSubmitting: false 
          }));
          return;
        }
      }

      // Submit form
      await onSubmit(state.values);
      
      // Reset form on successful submission
      setState(prev => ({
        ...prev,
        values: initialValues,
        errors: {},
        touched: {},
        isSubmitting: false
      }));
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false 
      }));
      throw error;
    }
  }, [state.values, validate, onSubmit, initialValues]);

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      isLoading: false,
      isSubmitting: false,
      touched: {}
    });
  }, [initialValues]);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  return {
    values: state.values,
    errors: state.errors,
    isLoading: state.isLoading,
    isSubmitting: state.isSubmitting,
    touched: state.touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setLoading
  };
} 