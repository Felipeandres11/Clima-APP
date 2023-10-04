import axios, {isCancel, AxiosError} from 'axios';

class Busquedas {
    historial = ['Santiago', 'Madrid', 'Buenos Aires', 'La Paz']
    constructor(){
        //TODO: LEER DB SI EXISTE
    }

    async ciudad(lugar = ''){

        try {
            //PETICION HTTP
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data.data[0])
            return []; //Retornar los lugares
        } catch (error) {
            return []
        }
        
    }
}

export {Busquedas}