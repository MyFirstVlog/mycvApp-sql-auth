import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    //* Dependencies of our user service
    constructor(@InjectRepository(User) private repo : Repository<User>){}
    //* El repo sera un repositorio que maneara usuarios
    //* InjectRepository = ayuda, a decir que necesitamos una instance de Repositorio, se debe usarporque  no trabaja bien con generic types like Repository
    create(email: string, password : string){
            const user = this.repo.create({email, password}) //* Asigna una entidad tipo user, esto esta hecho para meter psibles validadciones
            return this.repo.save(user)//* Esta se encarga de guardar ne la base deatos
            //* Pensados para ser usados con entities (save, remove)
    }
    findOne(id : number){
        //const user = this.repo.findOne({email:'sad@dsa.com'}) //! Puede buscar en forma de condicional el find one 
       return this.repo.findOne(id)
    }

    find(email : string){
        return this.repo.find({email})
    }

    async update(id : number, attrs: Partial<User>){
        //* Hace que la partial le permita a attrs que use uno o ninguno, o uno o dos de los atributos de la entidad User 
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('User Not Found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id : number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('El Usuario No existe');
        }
        return this.repo.remove(user);
    }
}
