const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is necessary']
    },
    password: {
        type: String,
        required: [true, 'Password is necessary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

//User is the name i use to identify my schema(usuarioSchema)
module.exports = mongoose.model('User', usuarioSchema);