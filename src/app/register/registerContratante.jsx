import { Link, useRouter } from "expo-router"
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Checkbox from 'expo-checkbox';
import { useForm } from "../../context/formRegisterContext";
import { Ionicons } from "@expo/vector-icons";


const RegisterContratante = ()=>{

    const router = useRouter()

    const [name, setName] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const {formData, updateFormData} = useForm()


    const handleCreatedAccount = async()=>{
        updateFormData({name, cpf, email, password})
        router.navigate('/register/addAddress')
    }

    const ja = ()=>{
        router.navigate('login')
    }
    


    return(
        <View style={styles.container}>
            <Text style={{fontSize: 40}}>WORKPUMP</Text>
            <Text style={{fontSize: 20}}>CADASTRO</Text>
            <View style={styles.containerPrim}>
                <View style={styles.containerForm}>
                    <TextInput placeholder="Nome completo" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setName(e)}}/>
                    <TextInput placeholder="CPF" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setCpf(e)}}/>
                    <TextInput placeholder="Email" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setEmail(e)}}/>
                    <TextInput placeholder="Senha" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setPassword(e)}}/>
                    <TextInput placeholder="Confirmar senha" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}}/>
                </View>
                <View style={{width: '100%'}}>
                    <TouchableOpacity style={styles.btn} onPress={handleCreatedAccount}>
                        <Text>Continuar Cadastro</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={ja}>
                    <Text>Tenho uma conta</Text>
                </TouchableOpacity>
            </View>
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
    containerPrim: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        gap: 10
    },
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    btn: {
        backgroundColor: '#A9E3E3',
        width: '100%',
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})


export default RegisterContratante