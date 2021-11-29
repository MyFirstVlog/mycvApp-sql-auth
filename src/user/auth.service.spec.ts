import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from "@nestjs/testing";
import { notEqual } from "assert";
import { AuthService } from './auth.service';
import { User } from "./user.entity";
import { UserService } from './user.service';
describe('AuthService', () => {
    
let service: AuthService;
let fakeUserService: Partial<UserService>;

beforeEach(async ()=> {
    //* Fake user service
    //* ts understand we arr creating a partir instance of UserService
    const users: User[] = [];
     fakeUserService= {
        find:(email:string) => {
            const filteredUsers = users.filter(user => user.email === email)
            return Promise.resolve(filteredUsers);
        },
        create: (email: string, password : string) => {
            const user = {id:Math.floor(Math.random()*999999), email, password} as User;
            users.push(user)
            return Promise.resolve(user);
        } //* Hace que no se queje por los metodos o attrs que no tenemos implementados
        //* Suministar los metodos los cuales auth service hace uso

    }
    //* Create testin di container
    const module = await Test.createTestingModule({
        providers:[
                AuthService,
                //* Auth necesita de userservice entonces denle el fake value
                {
                    provide: UserService,
                    useValue: fakeUserService
                }
        ],
    }).compile();

    service = module.get(AuthService); //? Service de tipo AuthService

})

it('can create an instance of auth service', async() => {
    
    expect(service).toBeDefined();
})

it('creates a new user with salted and hashed password', async () =>{
    const user : any = await service.signup('cristiano@gmail.com', '123123');

    expect(user.password).not.toEqual('123123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

})

// it('throws an error if users signs up with email that is in use', async (done)=> {
//     fakeUserService.find = () => Promise.resolve([{id:1, email:'isabel@gmail.com', password: '321'} as User]) 
//     try {
//         await service.signup('isabel@gmail.com', 'dsada'); //* nECESARIO PONER EL DONe
//     } catch (error) {
//         // expect(error).toBeInstanceOf(NotFoundException)
//         expect(error.message).toBe('Email already in use')
//     }
// } )

it('throws an error if user signs up with email that is in used', async() => {
    // fakeUserService.find = () => Promise.resolve([{id: 1, email: 'as', password: 'wsdsad'} as User]);
    // service.signup('asdf@asdf.com', 'asdf').catch(e => done());
    await service.signup('prueba@prueba.com','123123');
    let user: User;
    try {
        user = await service.signup('prueba@prueba.com','123123') as User;
    } catch (error) {
        console.log({error})
        expect(error).toBeInstanceOf(NotFoundException)
    }
    expect(user).not.toBeDefined();

});

it('throws if signin isa called with an use email',  (done) => {
    service.signin('fdsfsd@dsfsd.com','dfsarfs').catch(e => done())
})

it('throws if an inavalid password is provided', async ()=> {
    // fakeUserService.find = () => Promise.resolve([{id: 1, email: 'as@sfsd.com', password: 'wsdsad'} as User]);
    await service.signup('prueba@prueba.com', '123123')
    try {
        await service.signin('prueba@prueba.com', '123124')
    } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
    }
})

it('returns a user if correct password is provided', async ()=> {
    //?fakeUserService.find = () => Promise.resolve([{id: 1, email: 'as@sfsd.com', password: '864e7acb8f31e2b2.f11dede6fcb72af74dd4518b4e410e07d0311771d84065f110328815ddefe621'} as User]);
//?
    //?const user = service.signin('as@sfsd.com','123123') //* NO importa siempre va a devolver el mismo objeto de arriba
//?
    //?expect(user).toBeDefined()
    //?expect(typeof user).toBe('object')

    //* Esto para saber the salted and hashed password de 123123 luego comment and uncomment the above code
    // const user = await service.signup('prueba@prueba.com','123123')
    // console.log(user)

    await service.signup('prueba@prueba.com','123123');
   
    const user = await service.signin('prueba@prueba.com','123123') 
    expect(user).toBeDefined()
    expect(typeof user).toBe('object')

})

})
