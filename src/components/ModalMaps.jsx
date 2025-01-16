import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ModalMaps = ({lat, lng, raio:oi, closeModal, modalRef}) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const [raio, setRaio] = useState(100)
    
    const confirmed = ()=>{
        oi(raio / 1000)
        closeModal()
    }
    return (
        <BottomSheet
            snapPoints={snapPoints}
            ref={modalRef}
            index={-1}
            backgroundStyle={{ backgroundColor: '#77A6BE' }}
            enablePanDownToClose={true}
        >
            <BottomSheetView style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', height: '100%', alignItems:'center', gap: 10}}>
                    <View style={{width: '90%', height: '70%'}}>
                        
                    </View>
                    <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                        <TouchableOpacity onPress={()=>{setRaio(100)}} style={{backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 5}}>
                            <Text>100Metros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRaio(1000)}} style={{backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 5}}>
                            <Text>1KM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRaio(5000)}} style={{backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 5}}>
                            <Text>5KM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRaio(10000)}} style={{backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 5}}>
                            <Text>10KM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRaio(100000)}} style={{backgroundColor: 'white', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 5}}>
                            <Text>100KM</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={confirmed} style={{backgroundColor: '#A9E3E3', borderRadius: 100, paddingHorizontal: 50, paddingVertical: 10}}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default ModalMaps;
