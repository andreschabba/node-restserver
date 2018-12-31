const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let categoriaSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'Description is obligatorily ']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Category', categoriaSchema);