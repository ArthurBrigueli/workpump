import { Stack } from "expo-router"
import { AuthProvider } from "../context/AuthContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Layout = ()=>{
    return(
        <AuthProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <Stack>
                    <Stack.Screen name="login" options={{headerShown: false}}/>
                    <Stack.Screen name="register" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>
            </GestureHandlerRootView>
        </AuthProvider>
    )
}


export default Layout