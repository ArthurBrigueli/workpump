import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {Link, router} from 'expo-router'
import axios from 'axios'
import {useAuth} from '../../context/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ()=>{



    const [showPassword, setShowPassword] = useState(true)
    const {updateUserState} = useAuth()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)


    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }


    const handleLogin = async()=>{
        try{
            const response = await axios.post('http://192.168.0.102:8090/api/auth/login',{
                name: name, 
                password: password
            })
            console.log(response.data)
            updateUserState(response.data.user, response.data.token)
            await AsyncStorage.setItem('TOKEN', response.data.token)
            setError(false)
            router.replace('../home')
            
        }catch(error){
            console.log(error)
            setError(true)
        }
    }


    const handleCrateAccount = ()=>{
        router.navigate('../(tabs)/home')
    }






    return(
        
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 40}}>WORKPUMP</Text>
            </View>
            <View style={styles.containerform}>
                <View style={{borderWidth: 1, borderColor: 'black', width: '100%', borderRadius: 100, paddingLeft: 10}}>
                    <TextInput placeholder="Usuario" onChangeText={(e)=>{setName(e)}}/>
                </View>
                <View style={{borderWidth: 1, borderColor: 'black', width: '100%', borderRadius: 100, paddingLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput placeholder="Senha" style={{width: '90%'}} secureTextEntry={showPassword} onChangeText={(e)=>{setPassword(e)}}/>
                    <TouchableOpacity onPress={handleShowPassword}>
                        {showPassword ? (
                            <Ionicons name="eye-outline" size={20} color="black" />
                        ):(
                            <Ionicons name="eye-off-outline" size={20} color="black" />
                        )}
                    </TouchableOpacity>
                </View>
                {error && (
                    <Text>Informaçoes incorreta</Text>
                )}
                <TouchableOpacity style={{backgroundColor: '#A9E3E3', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 100}} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCrateAccount}>
                    <Text>Criar conta</Text>
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
    containerform: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        gap: 20
    }
})


export default Login