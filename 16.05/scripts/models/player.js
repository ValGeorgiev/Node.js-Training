var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    points: {
        type: Number,
        min: 0,
        default: 0
    }
});

PlayerSchema.path('email').validate(function (email) {
    return email.length >= 5 && email.length <= 60;
});

PlayerSchema.path('name').validate(function (name) {
    return name.length >= 4 && name.length <= 30;
});

PlayerSchema.path('password').validate(function (password) {
    return password.length > 5 && password.length <= 40;
});

PlayerSchema.pre('save', function(next){
    var player = this;
    if (!player.isModified('password')){
        return next();
    }
    bcrypt.hash(player.password, null, null, function(err, hash){
        if(err){
           return next(err);
        }
        player.password = hash;
        next();
    });
});

PlayerSchema.methods.comparePassword = function(password){
    var player = this;

    return bcrypt.compareSync(password, player.password);
};

module.exports = mongoose.model('Player', PlayerSchema);