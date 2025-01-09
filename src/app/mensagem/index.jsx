import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import io from 'socket.io-client';
import { useAuth } from "../../context/AuthContext";

const socket = io('http://192.168.0.102:8088');  // A URL do seu servidor

const Mensagem = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id, channelId } = useLocalSearchParams();
    const { user } = useAuth();

    const flatListRef = useRef(null); // Referência para o FlatList

    // Função para enviar mensagem
    const sendMessage = () => {
        const userid = user.id;
        socket.emit('privateMessage', { channelId, message, senderId: userid });
        setMessage(""); // Limpar a caixa de texto após o envio
    };

    // Use useEffect para escutar as mensagens recebidas
    useEffect(() => {
        // Envia para o servidor para entrar no canal privado
        socket.emit('joinPrivateChannel', channelId);

        // Escutando o evento 'privateMessage' do Socket.IO
        socket.on('privateMessage', (data) => {
            // Adicionando a mensagem e o senderId ao estado
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: data.message, senderId: data.senderId },
            ]);
        });


        // Cleanup: Remover o listener quando o componente for desmontado
        return () => {
            socket.off('privateMessage');
        };
    }, []);  // Esse efeito só será executado uma vez quando o componente for montado

    // Função para rolar para o final sempre que uma nova mensagem for adicionada
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);  // Quando as mensagens mudarem, rola para o final

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>

            <View style={{flexDirection: 'column', maxHeight: '100%', paddingTop: 50}}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                alignSelf: item.senderId === user.id ? 'flex-end' : 'flex-start',
                                marginBottom: 10,
                                maxWidth: '80%',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: item.senderId === user.id ? '#155E95' : '#ddd',
                                    padding: 10,
                                    borderRadius: 10,
                                    maxWidth: '100%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: item.senderId === user.id ? 'white' : 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.senderId === user.id ? 'Você' : `Usuário ${item.senderId}`}
                                </Text>
                                <Text style={{color: item.senderId === user.id ? 'white' : 'black'}}>{item.message}</Text>
                            </View>
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
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Mensagem;
