import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import axios from "axios";
import {useSocket} from '../../context/SocketContext'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Mensagem = () => {
    const {socket, channels, setChannels, setUpdateChannels, updateChannels} = useSocket()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const { id, channelId, name } = useLocalSearchParams();
    const { user } = useAuth();
    const [isOnline, setIsOnline] = useState(false)


    const flatListRef = useRef(null); // Referência para o FlatList

    // Função para enviar mensagem
    const sendMessage = async () => {

        socket.emit('check-status', id, async(isOnline) => {
            
            const payload = {
                to: {id: id, name: name},
                from: {socketId: socket.id, id: user.id,name: user.name},
                channelId: channelId,
                msg: message,
                status: "Enviado"
            }

            //para apagar as mensagens local de um chat (temporario para teste)
            //await AsyncStorage.removeItem(`chat_${channelId}`)

            // Envia para o socket
            socket.emit("chat-private", payload);
    
            setMessage(""); // Limpa o campo de entrada

        });
    
    };
    // Use useEffect para escutar as mensagens recebidas
    // Função para rolar para o final sempre que uma nova mensagem for adicionada
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);  // Quando as mensagens mudarem, rola para o final


    useEffect(() => {
        // Carregar mensagens do AsyncStorage ao montar o componente
        const loadMessages = async () => {
            const existingChat = await AsyncStorage.getItem(`chat_${channelId}`);
            const messagesStorage = existingChat ? JSON.parse(existingChat) : [];
            setMessages(messagesStorage); // Define as mensagens carregadas no estado
        };
        loadMessages();
    }, [channelId]);


    //recebe a mensagem enviada para o
    useEffect(() => {
        // Ouvir mensagens recebidas pelo socket
        const handleMessage = async (data) => {
            if (data.channelId === channelId) {
                setMessages((prev) => [...prev, data]);
            }
        };
    
        socket.on("chat-private", handleMessage);
    
        return () => {
            socket.off("chat-private", handleMessage); // Remove o ouvinte ao desmontar
        };
    }, [channelId]);


    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>

            <View style={{flexDirection: 'column', maxHeight: '100%', paddingTop: 50}}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={({ item }) => (
                        item.channelId == channelId && (
                            <View
                            style={{
                                alignSelf: item.to.id == user.id ? 'flex-start' : 'flex-end',
                                marginBottom: 10,
                                maxWidth: '80%',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: item.to.id == user.id ? "#ddd" : item.status == "Recebido" ? "#155E95":"#6A80B9",
                                    padding: 10,
                                    maxWidth: '100%',
                                    borderTopLeftRadius: item.to.id == user.id ? 1 : 10,
                                    borderTopRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: item.to.id == user.id ? 10 : 1,
                                    gap: 5
                                }}
                            >
                                <Text style={{color: item.to.id == user.id ? 'black' : 'white'}}>{item.msg}</Text>
                            </View>
                            {item.to.id != user.id && (
                                <Text style={{textAlign: 'right', fontSize: 10}}>{item.status}</Text>
                            )}
                        </View>
                        )
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TextInput
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        padding: 10,
                        flex: 1,
                        borderRadius: 10,
                        marginRight: 10,
                    }}
                    placeholder="Digite sua mensagem"
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity
                    onPress={sendMessage}
                >
                    <Ionicons name="paper-plane-outline" size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Mensagem;
