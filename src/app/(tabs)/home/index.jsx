import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import ProfileUser from "../../../components/ProfileUser";
import SearchProfile from "../../../components/SearchProfile";
import useFetchUserLocation from "../../../hooks/useFetchUserLocation";
import ModalMaps from "../../../components/ModalMaps";
import ModalProfileUser from "../../../components/ModalProfileUser";
import axios from "axios";

const Home = () => {

    const { getUsers, data } = useFetchUserLocation();
    const { user } = useAuth();
    const [raio, setRaio] = useState(0.1);
    const [profileUserId, setProfileUserId] = useState()


    const modalRef = useRef(null);
    const modalRefUserProfile = useRef(null);

    const openModal = () => {
        modalRef.current?.expand();
        
    };

    const closeModal = ()=>{
        modalRef.current?.close()
    }


    const openModalUserProfile = async(id) => {
        modalRefUserProfile.current?.expand();
        const response = await axios.get(`http://192.168.0.102:8090/api/auth/user/${id}`)
        setProfileUserId(response.data)
        
        
    };

    const closeModalUserProfile = ()=>{
        modalRefUserProfile.current?.close()
        console.log('fechou')
    }

    useEffect(() => {
        getUsers(user.lat, user.lng, raio);
    }, [raio]);


    const renderItem = ({ item, index }) => (
        item.id != user.id && (
            <ProfileUser key={index} user={item} name={item.name} id={item.id} index={index} openModal={openModalUserProfile}/>
        )
        
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', gap: 10 }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                <SearchProfile openModal={openModal} raio={raio} />
            </View>
            <View>

            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 20, paddingBottom: 20, width: '100%', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            />


            <ModalMaps lat={user.lat} lng={user.lng} raio={setRaio} modalRef={modalRef} closeModal={closeModal}/>
            
            <ModalProfileUser modalRef={modalRefUserProfile} user={profileUserId} closeModal={closeModalUserProfile}/>
            
            
        </View>
    );
};

const styles = StyleSheet.create({});

export default Home;
