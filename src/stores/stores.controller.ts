import { Controller } from '@nestjs/common';
import { StoresService } from './stores.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @MessagePattern('create_store')
  create(@Payload() createStoreDto : CreateStoreDto){
    return this.storesService.create(createStoreDto);
  }

  @MessagePattern('find_all_stores')
  findAll(@Payload() paginationDto : PaginationDto){
    return this.storesService.findAll(paginationDto);
  }

  @MessagePattern('find_one_store')
  findOne(@Payload('id') id: string ){
    return this.storesService.findOne(id);
  }

  @MessagePattern('update_store')
  update(@Payload() updateStoreDto : UpdateStoreDto){
    return this.storesService.update(updateStoreDto.id, updateStoreDto);
  }

}
