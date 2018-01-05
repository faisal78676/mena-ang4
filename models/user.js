const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let emailLengthChecker = function (email) {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validEmailCheck = function (email) {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return regExp.test(email);
    }
}

const emailValidators = [{
        validator: emailLengthChecker,
        message: 'Email must be at least 5 character but no longer 30 character'
    },
    {
        validator: validEmailCheck,
        message: 'Must be a valid email id'
    }
]

let usernameLengthChecker = function (username) {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
}

let validUsername = function (username) {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

const usernameValidator = [{
        validator: usernameLengthChecker,
        message: 'user name  at least 4 character'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special character '
    }
];

let passwordLengthChecker = function (password) {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 32) {
            return false;
        } else {
            return true;
        }
    }
}
let validPassword = function (password) {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}

const passwordValidator = [{
        validator: passwordLengthChecker,
        message: 'Password min 8 character and max 32 character'
    },
    {
        validator: validPassword,
        message: 'Must have uppercase,lowercase,special character and number'
    },
];
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    },
});

userSchema.pre('save', function (next) {
    var vm = this
    if (!vm.isModified('password'))
        return next();

    bcrypt.hash(vm.password, null, null, function (err, hash) {
        if (err) return next(err);
        vm.password = hash;
        next();

    });
});

userSchema.method.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);