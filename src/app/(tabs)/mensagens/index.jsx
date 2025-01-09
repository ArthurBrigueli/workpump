import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import io from 'socket.io-client'
import { router } from "expo-router";

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

    const aa = ()=>{
        const fetchMessage = async () => {
            try {
                const idUser = user.id.toString(); // Convertendo o ID para string
                const response = await axios.get(`http://192.168.0.102:8090/api/auth/channel/${idUser}`);
                
                // Transformando a string de 'users' em array
                const channelsWithParsedUsers = response.data.map(channel => {
                    return {
                        ...channel,
                        users: JSON.parse(channel.users) // Fazendo o parse para converter a string em array
                    };
                });

                setChannels(channelsWithParsedUsers); // Armazenando os canais com o 'users' como array

                // Agora, vamos pegar as informações dos usuários
                const userIds = channelsWithParsedUsers.flatMap(channel => channel.users)
                    .filter(userId => userId !== user.id); // Excluindo o id do usuário logado
                
                // Remover duplicatas de IDs de usuários
                const uniqueUserIds = [...new Set(userIds)];

                // Fazendo o GET para pegar as informações dos outros usuários
                const userInfoPromises = uniqueUserIds.map(userId => axios.get(`http://192.168.0.102:8090/api/auth/user/${userId}`));

                // Espera todas as requisições de usuário
                const userInfoResponses = await Promise.all(userInfoPromises);

                // Armazenar as informações dos usuários
                const usersDetails = userInfoResponses.map(response => response.data);
                setUsersInfo(usersDetails);

            } catch (error) {
                console.log(error);
            }
        };

        fetchMessage()
    }
    
    

    return (
        <View style={{gap: 10, padding: 10}}>
            <TouchableOpacity onPress={aa}>
                <Text>Atualizar</Text>
            </TouchableOpacity>
            {channels.map((channel, index) => (
                <View key={index} style={{backgroundColor: 'gray', padding: 10}}>
                    <Text>ID do Canal: {channel.idChannel}</Text>
                    {channel.users.map((userId) => {
                        // Exibe os nomes dos usuários com quem está conversando, se não for o próprio usuário
                        if (userId !== user.id) {
                            const userDetails = usersInfo.find(user => user.id === userId);
                            return userDetails ? (
                                <View key={userId}>
                                    <Text>Nome: {userDetails.name}</Text>
                                    <TouchableOpacity 
                                        style={{backgroundColor:'red', padding: 10}} 
                                        onPress={() => joinChannel(userDetails, channel)}
                                    >
                                        <Text>Entrar na mensagem</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null;
                        }
                    })}
                </View>
            ))}
        </View>

    );
};

export default Mensagens;
