import { AutoIncrement, Column, ForeignKey, IsInt, Min, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

@Table
export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @NotEmpty
    @Column
    name: string;

    @NotEmpty
    @ForeignKey(() => User)
    @Column
    userId: number;

    @NotEmpty
    @IsInt
    @Min(1)
    @Column
    priority: number;
}
