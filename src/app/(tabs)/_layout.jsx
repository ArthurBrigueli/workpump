import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import BarOpt from "../../components/BarOpt";

const Layout = () => {
    return (
        <View style={{ flex: 1 }}>
            <BarOpt />
            <Tabs>
                <Tabs.Screen
                    name="home/index"
                    options={{
                        tabBarLabel: "Início",
                        tabBarIcon: () => <Ionicons name="home" size={24} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="mensagens"
                    options={{
                        tabBarLabel: "Mensagens",
                        tabBarIcon: () => <Ionicons name="chatbox" size={24} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: () => <Ionicons name="person" size={24} />,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </View>
    );
};

export default Layout;
