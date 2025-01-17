import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native"
import {useForm} from '../../context/formRegisterContext'
import { Link, router, useRouter } from "expo-router"
import { useState } from "react";
import axios from 'axios'
import useFetchUser from '../../hooks/useFetchUser'

const addAddress = ()=>{

    const {formData, updateFormData } = useForm();
    const {registerUser, loading} = useFetchUser()
    const [cep, setCep] = useState()
    const [cidade, setCidade] = useState()
    const [estado, setEstado] = useState()
    const [rua, setRua] = useState()
    const [numero, setNumero] = useState()
    const [telefone, setTelefone] = useState()


    const handleCreatedAccount = async()=>{
        registerUser(cep, cidade, estado, rua, numero, telefone)
        router.navigate('login')
        
    }

    const jatenho = ()=>{
        router.navigate('login')
    }

    return(
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 40}}>WORKPUMP</Text>
                <Text style={{fontSize: 20}}>Adicionar endereço</Text>
            </View>
            <View style={styles.containerForm}>
                <TextInput placeholder="Numero de Telefone/Celular" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setTelefone(e)}}/>
                <TextInput placeholder="CEP" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setCep(e)}}/>
                <TextInput placeholder="Cidade" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setCidade(e)}}/>
                <TextInput placeholder="Estado" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setEstado(e)}}/>
                <TextInput placeholder="Rua" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setRua(e)}}/>
                <TextInput placeholder="Numero" style={{width: '100%', borderWidth: 2, borderColor: 'black', borderRadius: 100, paddingLeft: 10}} onChangeText={(e)=>{setNumero(e)}}/>
            </View>
            <View style={{width: '90%'}}>
                {loading ? (
                    <TouchableOpacity style={styles.btn} onPress={handleCreatedAccount} disabled>
                        <ActivityIndicator size="large" color="black"/>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={styles.btn} onPress={handleCreatedAccount}>
                        <Text>Criar conta</Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity onPress={jatenho}>
                <Text>Ja tenho uma conta</Text>
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
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
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


export default addAddress