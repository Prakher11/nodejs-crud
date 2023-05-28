import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const itemSchema = new Schema({
    Id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      
    Name:{
        type: String,
        required: true
    },

    Price:{
        type: Number,
        required: true
    },
    },
    // {
    //     toJSON: { virtuals: true },
    //     id: false, // Exclude the default _id field
    // }
    {
        versionKey: false, // Exclude the __v field
        toJSON: {
          transform: function (doc, ret) {
            delete ret._id; // Exclude the _id field
          },
        },
    }
);

// itemSchema.virtual("Id").get(function () {
//     return this._id.toString();
//   });

const Item = model('Item', itemSchema);

export default Item;