import { Text, View } from "react-native"
import {useAuth} from '../../../context/AuthContext'

const Home = ()=>{

    const {user, token} = useAuth()


    
    

    
    return(
        <View>
            <Text>Home Teste</Text>
            <Text>{user.name} teste</Text>
            <Text>{token} teste</Text>
        </View>
    )
}


export default Home