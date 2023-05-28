import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const itemSchema = new Schema({

    Id:{
        type: String,
        default: uuidv4,
        unique: true
    },

    Name:{
        type: String,
        required: true
    },

    Price:{
        type: Number,
        required: true
    }
});

const Item = model('Item', itemSchema);

export default Item;