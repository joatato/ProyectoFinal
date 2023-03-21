import { Schema, model } from "mongoose";

const productsColeccion = 'products';

const productsEsquema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, `400 Bad Request. Ya existe en la base de datos un producto con ese nombre`]
    },
    description: String,
    code: {
        type: Number,
        required: true,
        unique: [true, `El código debe ser único en la DB`]
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: String,
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: Boolean
});

export const productModels = model(productsColeccion, productsEsquema)

 