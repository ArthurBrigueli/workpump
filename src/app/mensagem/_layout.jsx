import { Stack, useLocalSearchParams } from "expo-router"

const Layout = ()=>{


    const {id, name} = useLocalSearchParams()



    return(
        <Stack>
            <Stack.Screen name="index" options={{title: `${name}`, headerShown: true}}/>
        </Stack>
    )
}


export default Layout