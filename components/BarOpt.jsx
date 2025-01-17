import { StyleSheet, Text, View } from "react-native"

const BarOpt = ()=>{
    return(
        <View style={styles.container}>
            <Text style={{color: "white", textAlign: 'center'}}>
                Nao sufoque o artista, jaja eu faço essa parte, o tamanho ja ta certo entao nao vai afeta nada que fizer
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '10%',
        alignContent: 'center',
        justifyContent: 'center'
    }
})


export default BarOpt