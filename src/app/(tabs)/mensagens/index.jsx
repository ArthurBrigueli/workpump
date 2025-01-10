import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import io from 'socket.io-client'
import { router } from "expo-router";
import { format, formatDate } from 'date-fns'; // Importando a função de formatação

const socket = io('http://192.168.0.102:8088')

const Mensagens = () => {
    const { user } = useAuth(); // Pegando o usuário logado
    const [channels, setChannels] = useState([]); // Para armazenar os canais
    const [usersInfo, setUsersInfo] = useState([]); // Para armazenar as informações dos outros usuários

    const joinChannel = (userDetails, channel) => {
        // Emite o evento para o destinatário entrar no canal
        const channelId = channel.idChannel;
    
        // Navega para a tela de mensagens
        router.push(`/mensagem?id=${userDetails.id}&name=${userDetails.name}&channelId=${channelId}`);
    };

    useEffect(() => {
        const fetchMessages = async () => {
            const idUser = user.id.toString(); // ID do usuário atual como string
            try {
                // Requisição para buscar os canais do usuário
                const response = await axios.get(`http://192.168.0.102:8090/api/auth/channel/${idUser}`);
                const channelsWithParsedUsers = response.data.map(channel => ({
                    ...channel,
                    users: JSON.parse(channel.users), // Parse da string para array
                }));

                setChannels(channelsWithParsedUsers); // Atualiza os canais
            } catch (error) {
                console.error("Erro ao buscar canais ou mensagens:", error);
            }
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        if (channels.length > 0) {
            channels.forEach((channel) => {
                socket.emit('joinPrivateChannel', channel.idChannel);
            });

            socket.on('privateMessage', (data) => {
                setChannels((prevChannels) =>
                    prevChannels.map((channel) =>
                        channel.idChannel === data.channelId
                            ? { ...channel, lastMessage: data.message, timestamp: data.timestamp }
                            : channel
                    )
                );
            });
        }

        return () => {
            socket.off('privateMessage');
        };
    }, [channels]);

    return (
        <View style={{ gap: 10, padding: 20}}>
            {channels.map((channel, index) => {
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
