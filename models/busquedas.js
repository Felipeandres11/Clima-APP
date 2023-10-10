import fs from 'fs'

import axios, {isCancel, AxiosError} from 'axios';

class Busquedas {
    historial = ['Santiago', 'Madrid', 'Buenos Aires', 'La Paz']

    dbPath = './DB/database.json';

    constructor(){
        //TODO: LEER DB SI EXISTE
        this.leerDB()
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1) );
            return palabras.join(' ')
        });
    }

    get paramsOpenWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = ''){

        try {
            //PETICION HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })

            const resp = await instance.get();
           
        
            // const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=pk.eyJ1IjoiZnBhbG1hMTEiLCJhIjoiY2xuYzRndm15MGZmczJvbzJhc2lvejk0ZyJ9.b8zr6ePhwrCzcNi4gqkghg&limit=5&language=es`);
            // console.log(resp.data)
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return []
        }
        
    }

    async climaLugar(lat,lon){
        
        try {
            //instance axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            })

            const resp = await instance.get();

            const {weather, main} = resp.data

            return ({
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            })
           
           
        



        } catch (error) {
            console.log(error)
        }
    }

    async agregarHistorial( lugar = ''){
        //TODO: Prevenir duplicados

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        //RETORNAR SOLO 6 ELEMENTOS EN LA LISTA
        this.historial = this.historial.splice(0,5);
        
        this.historial.unshift(lugar.toLocaleLowerCase())

        //Grabar en DB
        this.guardarDB()

    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        //DEBE DE EXISTIR...
        if(!fs.existsSync(this.dbPath)){
            return null
        }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info)
        
        this.historial = data.historial;
    }

}

export {Busquedas}