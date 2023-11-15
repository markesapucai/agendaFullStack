const mongoose = require('mongoose');
const validator = require('validator');

const loginSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true }
})

const LoginModel = mongoose.model('Login', loginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch (error) {
            console.log(error)
        }
        
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if (this.body.password.length < 4 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 4 e 20 caracteres')
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password,
            city: this.body.city,
            state: this.body.state
        }
    }
}

module.exports = Login;