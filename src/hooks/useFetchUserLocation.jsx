import axios from 'axios'
import { useState } from 'react'


const useFetchUserLocation = ()=>{


    const [data, setData] = useState([])

    const getUsers = async(lat, lng, raio)=>{

        console.log(lat, lng, raio)
        

        try{
            const response = await axios.post("http://192.168.0.102:8090/api/auth/users",{
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                raio: parseFloat(raio)
            })
    
            setData(response.data)
        }catch(error){
            console.log(error)
        }
    }


    return {getUsers, data}


}


export default useFetchUserLocation