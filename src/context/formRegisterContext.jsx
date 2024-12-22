import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const FormContext = createContext();

// Provider para envolver a aplicação
export function FormProvider({ children }) {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

// Hook para acessar o contexto
export function useForm() {
  return useContext(FormContext);
}
