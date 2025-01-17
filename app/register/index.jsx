import { Link, useRouter } from "expo-router"
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Checkbox from 'expo-checkbox';
import {useForm} from '../../context/formRegisterContext'


const Register = ()=>{

    const router = useRouter()
    const { updateFormData } = useForm();


    const handleContratante = (role)=>{
        updateFormData({role})
        router.navigate("/register/registerContratante")
    }

    const handlePrestador = (role)=>{
        updateFormData({role})
        router.navigate('/register/registerPrestador')
    }

    const handleLogin = ()=>{
        router.navigate('/login')
    }


    return(
        <View style={styles.container}>
            <Text style={{fontSize: 40}}>WORKPUMP</Text>
            <Text style={{fontSize: 20}}>Escolha seu tipo de conta</Text>
            <View style={styles.containerBtn}>
                <TouchableOpacity onPress={()=>{handleContratante("Contratante")}} style={styles.btn}>
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}>Contratante</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handlePrestador("Prestador")}} style={styles.btn}>
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}>Prestador de serviço</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogin}>
                <Text>Tenho uma conta</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    containerBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '50%'
    },
    btn: {
        backgroundColor: '#A9E3E3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 15,
        borderRadius: 100,
        width: '100%',
    }
    
})


export default Register