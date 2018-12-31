var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is obligatorily ']
    },
    price: {
        type: Number,
        required: [true, 'Price is necessary']
    },
    description: {
        type: String,
        required: false
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Product', productoSchema);