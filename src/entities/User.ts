import { randomUUID } from "crypto";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user: string

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    constructor(
        id_user: string,
        name: string,
        email:string,
        password:string
    ){

        if(!id_user){
            this.id_user = randomUUID()
        }else{
            this.id_user = id_user
        }

        
        this.name = name
        this.email = email
        this.password = password
    }
}