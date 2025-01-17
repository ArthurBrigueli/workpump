import {Slot, Stack} from 'expo-router'
import {FormProvider} from '../../context/formRegisterContext'

const Layout = ()=>{
    return (
        <FormProvider>
            <Stack>
                <Stack.Screen name='index' options={{title: 'Escolha seu tipo de conta'}}/>
                <Stack.Screen name='registerContratante' options={{title: 'Contratante'}}/>
                <Stack.Screen name='registerPrestador' options={{title: 'Prestador de serviço'}}/>
                <Stack.Screen name='addAddress' options={{title: 'Adicionar endereço'}}/>
            </Stack>
        </FormProvider>
    )
}


export default Layout