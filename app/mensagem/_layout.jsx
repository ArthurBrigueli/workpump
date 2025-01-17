import { Stack, useLocalSearchParams } from "expo-router";
import { useSocket } from '../../context/SocketContext';
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

const Layout = () => {
  const { id, name } = useLocalSearchParams(); // ID do usuário do chat
  const { socket } = useSocket(); // Conexão com o socket
  const [isOnline, setIsOnline] = useState(null);

  // Verifica o status inicial do destinatário
  useEffect(() => {
    socket.emit('check-status', id, (isOnline) => {
      setIsOnline(isOnline);
    });
  }, [id]);

  // Escuta atualizações em tempo real
  useEffect(() => {
    socket.on('user-status', (data) => {
      setIsOnline(data.online);
    }); // Escuta o evento

    return () => {
      socket.off('user-status', (data) => {
        setIsOnline(data.online);
      }); // Limpa o listener ao desmontar
    };
  }, [socket, id]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={styles.headerText}>{name}</Text>
              <Text style={{fontSize: 10}}>{isOnline ? (
                "Online"
              ):(
                "Offline"
              )}</Text>
            </View>
          ),
          headerShown: true,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
  },
  headerText: {
    marginRight: 8, // Espaçamento entre o texto e o ícone
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20, // Define a altura da linha para ajudar no alinhamento
  },
  icon: {
    alignSelf: "center", // Certifica-se de que o ícone está no centro vertical
  },
});

export default Layout;
