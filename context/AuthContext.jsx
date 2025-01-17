import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const updateUserState = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };


  const logoutAuth = async()=>{
    setUser('')
    setToken('')
    await AsyncStorage.removeItem('TOKEN')

  }

  return (
    <AuthContext.Provider value={{ user, token, updateUserState, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
