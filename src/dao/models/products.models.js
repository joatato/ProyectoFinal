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
<<<<<<< Updated upstream:src/dao/models/productModels.js
    thumbnail: String,
=======
    thumbnail: {
        type: String,
        imageDescription: [String]
    },
>>>>>>> Stashed changes:src/dao/models/products.models.js
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

productsEsquema.plugin(mongoosePaginate);

export const productsModel = model(productsColeccion, productsEsquema)

 