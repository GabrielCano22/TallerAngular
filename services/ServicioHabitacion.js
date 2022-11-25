import {modeloHabitacion} from '../Models/ModeloHabitacion.js'

export class ServicioHabitacion{

    //aqui programo metodos para cada una de las
    //consultas que quiero hacer en bd

    async buscarHabitaciones(){
        let habitaciones=await modeloHabitacion.find()
        return habitaciones
    }

    async buscarHabitacionPorId(){
        let habitacion=await modeloHabitacion.findById(id)
        return habitacion
        
    }

    async agregarHabitacionEnBD(datos){
        let datosValidados=new modeloHabitacion(datos)
        return await datosValidados.save()
    }

    async editarHabitacion(id,datosConLosQueEdito){

        return await modeloHabitacion.findByIdAndUpdate(id,datosConLosQueEdito)
    }
    async eliminarhabitacion(id){
        return await modeloHabitacion.findByIdAndDelete(id)
        
    }

}