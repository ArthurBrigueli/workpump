import { Stack, useLocalSearchParams } from "expo-router";

const MensagemLayout = () => {



    return (
        <Stack>
            {/* Registre apenas as rotas internas */}
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default MensagemLayout;
