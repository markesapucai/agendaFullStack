const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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

  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
  }

  async valida() {
    this.cleanUp();

    if (!this.body.email) {
      this.errors.push('E-mail não fornecido.');
    } else {
      const emailValid = validator.isEmail(this.body.email);
      if (!emailValid) this.errors.push('E-mail inválido');
    };

    if (!this.body.password) {
      this.errors.push('Senha não fornecido.');
    } else {
      if (this.body.password.length < 3 || this.body.password.length > 50) {
        this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
      }
    };
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
        return
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