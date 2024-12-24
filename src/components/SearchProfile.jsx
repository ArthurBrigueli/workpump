import { Ionicons } from "@expo/vector-icons"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

const SearchProfile = ({openModal, raio})=>{

    const displayRaio = () => {
        if (raio < 1) {
          return `${raio * 1000} Metros`; // Se for menor que 1, converte para metros
        } else {
          return `${raio} KM`; // Caso contrário, exibe em km
        }
    };



    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#D9D9D9', width: '90%', borderRadius: 100, paddingHorizontal: 20, height: 50}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View>
                    <Ionicons name="search-outline" size={20}/>
                </View>
                <View>
                    <TextInput placeholder="Procurar perfil"/>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={openModal} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 5, paddingVertical: 4}}>
                <Text>
                    {displayRaio()}
                </Text>
                    <Ionicons name="chevron-down-outline" size={15}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default SearchProfile