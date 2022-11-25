import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//idHabitacion:String
//fecha de entrada:Date
//fecha de salida:Date
//numero de adultos:Number
//numero de ninos:Number
//function costoReserva()

const EsquemaReservas = new Schema({
    idHabitacion:{
        required:true,
        type:String
    },
    fechaDeEntrega:{
        required:true,
        type:Date
    },
    fechaDeSalida:{
        required:true,
        type:Date
    },
    numeroAdultos:{
        required:true,
        type:Number
    },
    numeroNinos:{
        required:true,
        type:Number
    },   
    costoReserva:{
        require:false,
        type:Numbrer
    } 
});

export const modeloReservas = mongoose.model('reservas',EsquemaReservas)