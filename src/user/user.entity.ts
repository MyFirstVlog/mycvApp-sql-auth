import { Exclude } from 'class-transformer';
import {AfterInsert,AfterRemove, AfterUpdate,Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

//* Define lo que es un usuario, es como un esquema
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    email : string;
    @Column()
    @Exclude()
    password: string;
    @AfterInsert()
    logInsert(){
        console.log('Inserted User With ID ->', this.id);
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Updated User With ID ->', this.id);
    }
    @AfterRemove()
    logRemove(){
        console.log('Removed User Wtij ID ->', this.id);
    }
}