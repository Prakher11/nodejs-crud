import { Schema, model } from "mongoose";

const itemSchema = new Schema({

    Id:{
        type: String
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