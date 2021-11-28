import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { mergeScan } from 'rxjs';
import { promisify } from 'util';
import { UserService } from './user.service';

//! scrypt are in a function rather than return callbacks we oblige it to return promises
const scrypt = promisify(_scrypt); //* devuelve una promesa

@Injectable()
export class AuthService {
    //Para que funcione correctamente neceista una instancia de user service
    constructor(public usersService: UserService){}

    async signup(email: string, password: string): Promise<Object>{
            //* chequear si el email esta siendo usado por otro usuario en la base de datos
            console.log('esto llega a auth service',this.usersService);
            const users = await this.usersService.find(email);
            console.log('esto me sale despues', users )
            if(users.length){
                throw new NotFoundException('Email already in use');
            }
            //* hash la contraseña
            //? generatea salt
            const salt = randomBytes(8).toString('hex'); //* --> 8 bytes of data bin to str, dec are only 8 characters biy as we convert it to hec it returns 16
            //? hash the salt and the password together
            const hash = await scrypt(password,salt,32) as Buffer; //* thid element describes the length of the hash
            //? Join the hashed result and the salt together
            const result = salt + '.' + hash.toString('hex');
            //* crear un nuevo usuario
            const user = await this.usersService.create(email, result);
            //* retornar el usuario
            return user;

    }

    async signin(email: string, password: string){
            const [user] = await this.usersService.find(email) //alemnos un user es devuevlto
            if(!user){
                throw new NotFoundException('el email no esta en nuestrada db')
            }
            const [salt,storedHash] = user.password.split('.');

            //? ahora vamos hacer el hash de la password con el salt almacenado y luego compararlo con el hash almacenado de la db

            const hashVerificacion = await scrypt(password,salt,32) as Buffer;
            
            if(hashVerificacion.toString('hex') === storedHash){
                return user
            }else{
                throw new NotFoundException("Contraseña incorrecta");
            }


    }   

}