import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import io from 'socket.io-client'
import { router } from "expo-router";
import { format, formatDate } from 'date-fns'; // Importando a função de formatação
import {useSocket} from '../../../context/SocketContext'

const Mensagens = () => {
    const { user } = useAuth(); // Pegando o usuário logado
    const [usersInfo, setUsersInfo] = useState([]); // Para armazenar as informações dos outros usuários
    const {socket, messageContext, channels:channelsRonaldo, setChannels} = useSocket()




    const joinChannel = (userDetails, channel) => {
        // Emite o evento para o destinatário entrar no canal
        const channelId = channel.idChannel;
    
        // Navega para a tela de mensagens
        router.push(`/mensagem?id=${userDetails.id}&name=${userDetails.name}&channelId=${channelId}`);
    };




    return (
        <View style={{ gap: 10, padding: 20}}>
            {channelsRonaldo.map((channel, index) => {
                const sender = channel.users.find(u => u.id !== user.id);
                const formattedTime = channel.timestamp ? format(new Date(channel.timestamp), 'HH:mm') : '';
                return (
                    <TouchableOpacity 
                        key={index} 
                        style={{
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            justifyContent: 'space-between'
                        }}
                        onPress={() => joinChannel(sender, channel)}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                            <View style={{ backgroundColor: 'gray', width: 50, height: 50, borderRadius: 100 }} />

                            <View>
                                <Text>{sender?.name || "Desconhecido"}</Text>
                                <Text style={{ color: 'gray', fontSize: 12 }}>
                                    {channel.lastMessage || "Sem mensagens ainda"}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{color: 'gray', fontSize: 12}}>{formattedTime}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default Mensagens;
