import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Text, View } from "react-native"
import BarOpt from "../../components/BarOpt"

const Layout = ()=>{
    return(
        <View style={{flex: 1}}>
            
            <BarOpt/>
            

            <Tabs>
                <Tabs.Screen
                    name="home/index"
                    
                    options={{
                        tabBarLabel: "Início",
                        tabBarIcon: () => <Ionicons name="home" />,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: () => <Ionicons name="accessibility-outline" />,
                        headerShown: false
                    }}
                />
            </Tabs>
        </View>
        
    )
}


export default Layout