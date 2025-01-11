import { Stack } from "expo-router"
import { AuthProvider } from "../context/AuthContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {SocketProvider} from '../context/SocketContext'

const Layout = ()=>{
    return(
        
        <SocketProvider>
            <AuthProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <Stack>
                        <Stack.Screen name="login" options={{headerShown: false}}/>
                        <Stack.Screen name="register" options={{headerShown: false}}/>
                        <Stack.Screen name="mensagem" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                </GestureHandlerRootView>
            </AuthProvider>
        </SocketProvider>
    )
}


export default Layout