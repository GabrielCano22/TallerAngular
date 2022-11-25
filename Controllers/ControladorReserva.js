import { ServidorReserva } from "../services/ServidorReserva.js"
import { ServicioHabitacion } from "../services/ServicioHabitacion.js"
import {Helpers} from "../helpers/Helpers.js"
export class ControladorReserva{

    constructor(){}

    async buscarReservas(request,response){
        let objetoServicioReservas = new ServidorReserva()

        try{
            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioReservas.buscarReservas(),

            })
        }catch(error){
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
    }

    async buscarReservaPorId(request,response){

        let id = request.params.idReserva
        let objetoServicioReservas = new ServidorReserva
        console.log('El id es: '+id)
        try{
            let consultaId = await objetoServicioReservas.buscarReservaPorId(id)
            if(consultaId != null){
                response.status(200).json({
                    "mensaje":"Exito en la consulta "+id, //recibo id de la peticion
                    "datos":consultaId
                    // "estado":true
                })
            }else{
                response.status(401).json({
                    "mensaje":"Error la persona con id: "+id + "No tiene una reserva",
                    "datos":null
                })
            }

        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
    }

    async registrarReserva(request,response){
        let objtHelp= new Helpers
        let datosReserva = request.body
        let objetoServicioReservas = new ServidorReserva
        // let objetoServicioHabitacion = new ServicioHabitacion()
        let respuesta = await objtHelp.validar(datosReserva)
        console.log(respuesta)
        if(respuesta.estado==true){
            objetoServicioReservas.guardarReserva(respuesta.info)
            response.status(200).json({
                "mensaje":"Exito en la reservación",
                "datos":respuesta.info
            })
        }else if(respuesta.info=="p"){
            response.status(403).json({
                "mensaje":"La habitación no puede contener más de "+respuesta.estado+" personas",
                "datos":null
            })
        }else if(respuesta.info=="d"){
            response.status(402).json({
                "mensaje":"Por favor verifique las fechas ingresadas, usted no puede viajar en el tiempo...",
                "datos":null
            })
        }else{
            response.status(400).json({
                "mensaje":"Error en la consulta "+error,
                "datos":null
            })
        }
    }

    async editarReserva(request,response){

        let id = request.params.idReserva
        let datosEditar = request.body
        let objetoServicioReservas = new ServidorReserva
        let respuesta = await objHelp.validar(datosEditar)
        console.log(respuesta)

        if(respuesta.estado==true){
            objetoServicioReservas.editarReserva(id,respuesta)
            response.status(200).json({
                "mensaje":"Exito en la edición de la reserva",
                "datos":respuesta.info
            })
        }else if(respuesta.info=="p"){
            response.status(403).json({
                "mensaje":"La habitación no puede contener más de "+respuesta.estado+" personas"
            })
        }else if(respuesta.info=="d"){
            response.status(402).json({
                "mensaje":"Por favor verifique las fechas ingresadas, usted no puede viajar en el tiempo...",
                "datos":null
            })
        }else{
            response.status(400).json({

            })
        }
    }
    async eliminarReserva(request,response){
        let id = request.params.idReserva
        let objetoServicioReservas = new ServidorReserva

        try{
            await objetoServicioReservas.eliminarHabitacion(id)
            response.status(200).json({
                "mensaje":"Exito eliminando ",
                "datos":null
            })
        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la eliminación "+error,
                "datos":null
            })
        }
    }
}