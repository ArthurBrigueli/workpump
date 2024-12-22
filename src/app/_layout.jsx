import { Stack } from "expo-router"
import { AuthProvider } from "../context/AuthContext"

const Layout = ()=>{
    return(
        <AuthProvider>
            <Stack>
                <Stack.Screen name="login" options={{headerShown: false}}/>
                <Stack.Screen name="register" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </AuthProvider>
    )
}


export default Layout