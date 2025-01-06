import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useEffect, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native"

const ModalProfileUser = ({modalRef, user, closeModal})=>{

    const snapPoints = useMemo(() => ['50%'], []);


    console.log(user)


    const handleContact = ()=>{
        console.log('ksaksa')
    }



    return(
        <BottomSheet
            snapPoints={snapPoints}
            ref={modalRef}
            index={-1}
            backgroundStyle={{ backgroundColor: '#77A6BE' }}
            enablePanDownToClose={true}
            onClose={closeModal}
        >
            <BottomSheetView style={{flex: 1, alignItems: 'center'}}>
                {user && (
                    <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                        <View style={{backgroundColor: 'white', width: '90%', borderRadius: 15, padding: 15, flexDirection: 'row', gap: 20}}>
                            <View style={{backgroundColor: 'gray', width: 100, height: 100, borderRadius: 15}}>

                            </View>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>{user.role}</Text>
                            </View>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <TouchableOpacity onPress={handleContact} style={{backgroundColor: '#A9E3E3', padding: 10, borderRadius: 10, paddingHorizontal: 30}}>
                                <Text style={{fontWeight: 'bold'}}>Entrar em contato</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </BottomSheetView>
        </BottomSheet>
    )
}


export default ModalProfileUser