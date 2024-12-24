import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

const ProfileUser = ({user, name, id, index})=>{
    return(
        <View key={index} style={{flexDirection: 'row', backgroundColor: '#D2D1D1', alignItems: 'center', width: '90%', justifyContent: 'space-between', paddingHorizontal: 15, padding: 10, borderRadius: 15}}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{borderRadius: 10, backgroundColor: '#A0A0A0', width: 50, height:50}}>

                </View>
                <View style={{gap: 10, width: '75%'}}>
                    <View style={{flexDirection: 'row', gap: 15}}>
                        <Text>{name}</Text>
                        <Text>#{id}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                        <Text style={{backgroundColor: '#C0C0C0', borderRadius: 100, paddingHorizontal: 15, paddingVertical: 1}}>{user.road}</Text>
                        <Text style={{backgroundColor: '#C0C0C0', borderRadius: 100, paddingHorizontal: 15, paddingVertical: 1}}>tag</Text>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity>
                    <Ionicons name="arrow-forward-outline" size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default ProfileUser