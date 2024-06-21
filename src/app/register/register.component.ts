import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultaCepService } from '../service/ConsultaCepService';
import { UserService } from '../service/UserService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class RegisterComponent {

  user = {
    username: '',
    password: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: ''
  };

  passwordValidations = {
    lowercase: false,
    uppercase: false,
    number: false,
    length: false,
  };

  constructor(
    private cepService: ConsultaCepService,
    private userService: UserService,
    private router: Router,
  ) {}

  consultaCep(valor: string, form: NgForm) { 
    this.cepService.buscar(valor).subscribe(
      (dados: any) => this.populaForm(dados, form),
      (error) => {
        console.error('Erro ao consultar CEP:', error);
      }
    );
  }

  populaForm(dados: any, form: NgForm) {
    form.form.patchValue({
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    });
  }

  navigate() {
    this.router.navigate(['/']);
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const newUser = {
        username: form.value.username,
        password: form.value.password,
        cep: form.value.cep,
        logradouro: form.value.logradouro,
        bairro: form.value.bairro,
        cidade: form.value.cidade,
        uf: form.value.uf,
        numero: form.value.numero,
        complemento: form.value.complemento 
      };

      this.userService.createUser(newUser).subscribe(
        (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  validatePassword(): void {
    const password = this.user.password;
    this.passwordValidations.lowercase = /[a-z]/.test(password);
    this.passwordValidations.uppercase = /[A-Z]/.test(password);
    this.passwordValidations.number = /\d/.test(password);
    this.passwordValidations.length = password.length >= 8;
  }
}
