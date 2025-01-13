// context/SocketContext.jsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messageContext, setMessageContext] = useState(null)
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const socketInstance = io('http://192.168.0.102:8088'); // URL do seu servidor
        
        socketInstance.on('chat-private', (data)=>{
            setMessageContext(data)
            setMessages((prev)=>[...prev, data])
        
        })

        


        socketInstance.on('register', (data)=>{
            const fetchMessages = async () => {
                const idUser = data.toString(); // ID do usuário atual como string
                try {
                    // Requisição para buscar os canais do usuário
                    const response = await axios.get(`http://192.168.0.102:8090/api/auth/channel/${idUser}`);
    
                    //id_channel: channelId,
                    //users: JSON.stringify([{id: userAuth.id, name: userAuth.name}, {id: user.id, name: user.name}]),
    
                    const channelsWithParsedUsers = response.data.map(channel => ({
                        ...channel,
                        users: JSON.parse(channel.users), // Parse da string para array
                    }));
    
                    setChannels(channelsWithParsedUsers); // Atualiza os canais
                } catch (error) {
                    console.error("Erro ao buscar canais ou mensagens:", error);
                }

            };

            fetchMessages()
        })

        
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect(); // Desconectar o socket ao desmontar o contexto
        };
    }, []);

    
    

    useEffect(()=>{
        setChannels((prev) => {
            const update = prev.map((channel) => {
                if(channel.idChannel == messageContext.channelId){
                    return {
                        ...channel,
                        lastMessage: messageContext.msg
                    }
                }
                return channel
            })

            return update
        })
    }, [messageContext])




    return (
        <SocketContext.Provider value={{socket, messageContext, setMessageContext, channels, setChannels, messages, setMessages}}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
