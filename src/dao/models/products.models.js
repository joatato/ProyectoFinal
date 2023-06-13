import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsColeccion = 'products';

const productsEsquema = new Schema({
    owner: {
        type: String,
        default: "admin",
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: [true, `400 Bad Request. Ya existe en la base de datos un producto con ese nombre`]
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: [true, `El código debe ser único en la DB`]
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        imageDescription: [String]
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
});

productsEsquema.plugin(mongoosePaginate);

export const productsModel = model(productsColeccion, productsEsquema)

