import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateStockDto } from "./create-stock.dto";

export class CreateProductDto{
    @IsString()
    name: string

    @IsString()
    brand: string

    @IsString()
    description: string

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    code: string;

    @IsNumber()
    @IsPositive()
    discount: number;

    @IsOptional()
    @IsBoolean()
    available: boolean;

    @IsString()
    catalogId: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateStockDto)
    stocks: CreateStockDto[]


}