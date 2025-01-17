import { Text, View } from "react-native"
import {useAuth} from '../../../context/AuthContext'

const Profile = ()=>{

    const {user, token} = useAuth()


    

    
    return(
        <View>
            <Text>Profile</Text>
            <Text>{user.name}</Text>
            <Text>{token}</Text>
        </View>
    )
}


export default Profile