import { Controller } from '@nestjs/common';
import { StoresService } from './stores.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStoreClientDto, CreateStoreDto, CreateStoreTraderDto, UpdateStoreClientDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { UpdateStoreTraderDto } from './dto/update-store-trader.dto';
import { StorePaginationDto } from './dto/store-pagination.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  // STORES
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

  @MessagePattern('validate_stores')
  validateStores( @Payload() ids: string[] ) {
    return this.storesService.validateStores(ids);
  }
  // Aqui van a ir todas las relaciones muchos a muchos de que asocia a la clase store
  // ========================================
  //=============StoreTrader=================
  // ========================================
  @MessagePattern('create_store_trader')
  createStoreTrader(@Payload() createStoreTraderDto : CreateStoreTraderDto){
    return this.storesService.createStoreTrader(createStoreTraderDto);
  }

  @MessagePattern('find_all_store_trader')
  findAllStoreTrader(@Payload() paginationDto : PaginationDto){
    return this.storesService.findAllStoreTrader(paginationDto);
  }

  @MessagePattern('find_one_store_trader')
  findOneStoreTrader(@Payload('id') id : string){
    return this.storesService.findOneStoreTrader(id)
  }

  @MessagePattern('delete_store_trader')
  deleteStoreTrader(@Payload('id') id: string ){
    return this.storesService.deleteStoreTrader(id);
  }

  @MessagePattern('update_store_trader')
  updateStoreTrader(@Payload() updateStoreTraderDto : UpdateStoreTraderDto){
    return this.storesService.updateStoreTrader( updateStoreTraderDto.id, updateStoreTraderDto);
  }

  // Find Stores by traderId

  @MessagePattern('get_stores_by_tarderId')
  getStoresByTraderId(@Payload() storePaginationDto : StorePaginationDto){
    return this.storesService.getStoresByTraderId(storePaginationDto);
  }
  // ========================================
  //=============StoreClient=================
  // ========================================

  @MessagePattern('create_store_client')
  createStoreClient(@Payload() createStoreClientDto : CreateStoreClientDto){
    return this.storesService.createStoreClient(createStoreClientDto);
  }

  @MessagePattern('find_all_store_client')
  findAllStoreClient(@Payload() paginationDto : PaginationDto){
    return this.storesService.findAllStoreClient(paginationDto);
  }

  @MessagePattern('find_one_store_client')
  findOneStoreClient(@Payload('id') id : string ){
    return this.storesService.findOneStoreClient(id);
  }

  @MessagePattern('update_store_client')
  updateStoreClient(@Payload() updateStoreClientDto : UpdateStoreClientDto){
    return this.storesService.updateStoreClient(updateStoreClientDto);
  }

  @MessagePattern('get_StoreClient_By_StoreId')
  getClientsByStoreId(@Payload() storePaginationDto : StorePaginationDto ){
    return this.storesService.getClientsByStoreId(storePaginationDto)
  }
}
