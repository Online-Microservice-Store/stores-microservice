import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateSuscriptionDto } from "src/suscriptions/dto";

export class UpdateSuscriptionDto extends PartialType(CreateSuscriptionDto){
    @IsString()
    id: string;
}