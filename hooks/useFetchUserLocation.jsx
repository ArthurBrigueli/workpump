import axios from 'axios'
import { useState } from 'react'


const useFetchUserLocation = ()=>{


    const [data, setData] = useState([])

    const getUsers = async(lat, lng, raio)=>{

        console.log(lat, lng, raio)
        

        try{
            const response = await axios.post("http://147.79.82.47:8080/api/auth/users",{
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