import {AfterInsert,AfterRemove, AfterUpdate,Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Reports } from '../reports/reports.entity';
// console.log(Reports) cicurlar dependency for that reason we use ()=> Reports
//* Define lo que es un usuario, es como un esquema
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    email : string;
    @Column()
    password: string;
    @OneToMany(()=> Reports, (reports)=> reports.user)
    reports: Reports[];
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