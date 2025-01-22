import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common";

export class StorePaginationDto extends PaginationDto{

    @IsOptional()
    @IsString()
    id?: string;

}