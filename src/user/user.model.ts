import { AutoIncrement, Column, IsEmail, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @IsEmail
    @Unique
    @Column
    email: string;
}