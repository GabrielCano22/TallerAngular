import { modeloReservas } from "../Models/Modeloreserva.js";

export class ServidorReserva {

    async buscarReservas(){
        let reservas = await modeloReservas.find()
        return reservas
    }

    async buscarReservaPorId(id){
        let reserva = await modeloReservas.findById(id)
        return reserva
    }

    async agregarReservasEnBd(datos){
        let datosValidados = new modeloReservas(datos)
        return await datosValidados.save()
    }

    async editarReserva(id,datos){
        return await modeloReservas.findByIdAndUpdate(id,datos)
    }
    async eliminarReserva(id){
        return await modeloReservas.findByIdAndDelete(id)
    }
}