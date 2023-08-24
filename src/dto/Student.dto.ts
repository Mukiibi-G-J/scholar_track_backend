import {IsEmail, Length} from "class-validator";

export class StudentInput {
  @IsEmail()
  email: string;



  @Length(6, 24)
  password: string;


}
export interface StudentPayload {
  _id: string;
  email: string;
  verified: boolean;
  is_student: boolean;
}

export class StudentLoginInput {
  @IsEmail()
  email: string;
  @Length(6, 12)
  password: string;
}
