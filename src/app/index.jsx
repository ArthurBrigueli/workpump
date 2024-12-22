import { Link, Redirect, router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import {useAuth} from '../context/AuthContext'

const Home = ()=>{

    return <Redirect href="/login" />;
}


export default Home