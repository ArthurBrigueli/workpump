import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {useAuth} from '../../../context/AuthContext'
import ProfileUser from "../../../components/ProfileUser"
import SearchProfile from "../../../components/SearchProfile"
import { useEffect, useState } from "react"
import useFetchUserLocation from "../../../hooks/useFetchUserLocation"
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ModalMap from "../../../components/ModalMap"

const Home = ()=>{

    const {getUsers, data} = useFetchUserLocation()
    const {user} = useAuth()
    const [raio, setRaio] = useState(0.1)




    useEffect(()=>{
        const a = ()=>{
            getUsers(user.lat, user.lng, raio)
        }

        a()
    },[raio])
   
    const [modal, setModal] = useState(false)


    const a = ()=>{
        setModal(true)
    }

    const closeModal = ()=>{
        setModal(false)
    }

    const renderItem = ({ item, index }) => (
        <ProfileUser key={index} user={item} name={item.name} id={item.id} index={index} />
    );
    
    return(
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', gap: 10}}>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
                <SearchProfile openModal={a} raio={raio}/>
            </View>
            <View>
                
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Supondo que `id` seja único e numérico
                contentContainerStyle={{ gap: 20, paddingBottom: 20, width: '100%', alignItems: 'center' }} // Espaçamento entre os itens
                showsVerticalScrollIndicator={false}
            />

            {modal && (
                <ModalMap lat={user.lat} lng={user.lng} raio={setRaio} closeModal={closeModal}/>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    
})


export default Home