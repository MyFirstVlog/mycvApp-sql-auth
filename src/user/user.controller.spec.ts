import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService:Partial<UserService>; //! Partial indica que solo se tendran en cuenta algunos metodos de userService
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {

    fakeUserService = {
        findOne : (id: number) => {
          return Promise.resolve({id, email:'prueba@prube.com', password:'12121221'} as User)
        },
        find : (email: string) => {
          return Promise.resolve([{id: 1, email:'prueba@prueba.com', password: '123456' } as User])
        },
        // remove:() => {},
        // update:() => {}
    };
     fakeAuthService= {
    //     signup: () => {},
        signin: (email: string, password: string) => {
           return Promise.resolve({id: 1, email:'prueba@prueba.com', password:'123456'} as User)
        },
     };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        {
          provide: UserService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Find All User, return list of user with th given email', async()=>{
      const users = await controller.findAllUsers('prueba@prueba.com');

      expect(users.length).toBe(1)
      expect(users[0]).toEqual({id: 1, email:'prueba@prueba.com', password: '123456' });

  })

  it('find user with an specific id and return user', async()=> {
      const user = await controller.findOneUser('1');
      expect(user).toBeDefined()
  })

  it('find one user error if given id is not found', async()=> {
      fakeUserService.findOne = () => null;
      try {
        await controller.findOneUser('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
  })

  it('signIn updates session object and return user', async()=> {
    const session = {userId: 10};
    const user = await controller.signIn({email:'prueba@prueba.com', password: 'asasda'}
                                          , session)

    expect(session.userId).toEqual(1);
    expect(user.id).toEqual(1)}
  )

});
