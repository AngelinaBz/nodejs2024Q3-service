import { IsUUID, IsString, IsNotEmpty, IsNumber } from "class-validator";
import { User } from "./user.interface";
import { v4 as uuidv4 } from "uuid";

export class UserModel implements User {
    @IsUUID()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    login: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsNumber()
    version: number;
  
    @IsNumber()
    createdAt: number;
  
    @IsNumber()
    updatedAt: number;
  
    constructor(login: string, password: string) {
      this.id = uuidv4();
      this.login = login;
      this.password = password;
      this.version = 1;
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
    }
}