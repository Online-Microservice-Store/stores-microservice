import { SuscriptionType } from "@prisma/client";
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SuscriptionTypeList } from "../enums/suscription-type.dto";

export class CreateSuscriptionDto{
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsEnum( SuscriptionTypeList, {
        message: "Valid types are: " + SuscriptionTypeList
    })
    type: SuscriptionType;

    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    features: string[]
}