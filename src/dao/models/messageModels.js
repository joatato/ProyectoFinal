import { Schema, model } from "mongoose";

const messagesColeccion='messages';

const messagesEsquema=new Schema({
    nombre: {
        type:String,
        required: true,
        unique: [true, `El nombre debe ser único en la DB`]
    },
    poder: String,
    fuerza0a100: Number,
    fecAlt:{
        type:Date,
        default: Date.now()
    }
});

export const messagesModelo=model(messagesColeccion, messagesEsquema)
