import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import axios from "axios";
import {useSocket} from '../../context/SocketContext'


const Mensagem = () => {
    const {socket, messages:messagesSocket, setMessages:setMessagesSocket} = useSocket()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(messagesSocket)
    const { id, channelId, name } = useLocalSearchParams();
    const { user } = useAuth();
    const [isOnline, setIsOnline] = useState(false)


    const flatListRef = useRef(null); // Referência para o FlatList

    // Função para enviar mensagem
    const sendMessage = async() => {

        const utcDate = new Date(); // Hora em UTC
        try {

            await axios.post('http://192.168.0.102:8090/api/auth/channel/create', {
                id_channel: channelId,
                users: JSON.stringify([{id: user.id, name: user.name}, {id: id, name: name}]),
            });
        } catch (error) {
            console.log(error);
        }

        socket.emit('check-status', id, (isOnline) => {
            const payload = {
                to: id,
                from: socket.id,
                channelId: channelId,
                msg: message,
                status: isOnline ? "Recebido":"Enviado"
            }
    
            setMessagesSocket((prev)=>[...prev, payload])
            socket.emit('chat-private', payload)
        });
        

        setMessage(""); // Limpar a caixa de texto após o envio
    };
    // Use useEffect para escutar as mensagens recebidas
    // Função para rolar para o final sempre que uma nova mensagem for adicionada
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messagesSocket]);  // Quando as mensagens mudarem, rola para o final

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>

            <View style={{flexDirection: 'column', maxHeight: '100%', paddingTop: 50}}>
                <FlatList
                    ref={flatListRef}
                    data={messagesSocket}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                alignSelf: item.from === socket.id ? 'flex-end' : 'flex-start',
                                marginBottom: 10,
                                maxWidth: '80%',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: item.from === socket.id ? item.status == "Recebido" ? "#155E95":"#6A80B9" : "#ddd",
                                    padding: 10,
                                    maxWidth: '100%',
                                    borderTopLeftRadius: item.from === socket.id ? 10 : 1,
                                    borderTopRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: item.from === socket.id ? 1 : 10,
                                    gap: 5
                                }}
                            >
                                <Text style={{color: item.from === socket.id ? 'white' : 'black'}}>{item.msg}</Text>
                            </View>
                            <Text style={{textAlign: 'right', fontSize: 10}}>{item.status}</Text>
                        </View>
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
