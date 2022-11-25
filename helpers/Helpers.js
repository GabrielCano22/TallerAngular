import { ServicioHabitacion } from "../services/ServicioHabitacion";

export class Helpers {
    async validar(datosReserva){
        let objetoServicioHabitacion = new ServicioHabitacion()
        try{
            let objHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)

                let cantidadDiasReservados=(Date.parse(datosReserva.fechaSalida)-Date.parse(datosReserva.fechaEntrada))/60/60/24000
                if(cantidadDiasReservados>0){
                    let cantidadPersonas=datosReserva.numeroAdultos+datosReserva.numeroNinos
                    if(cantidadPersonas>0&&cantidadPersonas<=objHabitacion.numeroMaximoPersonas){
                        let costoReserva=objHabitacion.valorNoche*cantidadDiasReservados;
                        datosReserva.costoreserva=costoReserva
                        //await objserviciorecerva.guardarReserva(datosReserva)
                        
                        return {"estado":true, "info":datosReserva}

                    }else{
                       return {"estado":objHabitacion.numeroMaximoPersonas, "info":"p"}
                    }
                }else{
                    return {"estado":false, "info":"d"}
                }
            
        }catch(error){

            return error
        }
    }
}