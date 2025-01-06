import { useState } from 'react';
import {useForm} from '../context/formRegisterContext'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const useFetchUser = ()=>{

    const {formData, updateFormData } = useForm();
    const [loading, setLoading] = useState(false)
    const {updateUserState} = useAuth()





    const registerUser = async(cep, cidade, estado, rua, numero, telefone)=>{

        setLoading(true)

        const response = await axios.post('http://192.168.0.102:8090/api/auth/register/user', {
            name: formData.name,
            cpf: formData.cpf,
            email: formData.email,
            telephone: telefone,
            password: formData.password,
            role: formData.role,
            cep: cep,
            city: cidade,
            state: estado,
            road: rua,
            number: numero
        })

        setLoading(false)

    }


    return {registerUser, loading}

}

export default useFetchUser



