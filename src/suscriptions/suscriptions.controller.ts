import { Controller } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSuscriptionDto, UpdateSuscriptionDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('suscriptions')
export class SuscriptionsController {
  constructor(private readonly suscriptionsService: SuscriptionsService) {}
  @MessagePattern('create_suscription')
  create(@Payload() createSuscriptionDto : CreateSuscriptionDto){
    return this.suscriptionsService.create(createSuscriptionDto);
  }

  @MessagePattern('find_all_suscriptions')
  findAll(@Payload() paginationDto : PaginationDto){
    return this.suscriptionsService.findAll(paginationDto);
  }

  @MessagePattern('find_one_suscription')
  findOne(@Payload('id') id : string){
    return this.suscriptionsService.findOne(id);
  }

  @MessagePattern('update_suscription')
  update(@Payload() updateSuscriptionDto : UpdateSuscriptionDto){
    return this.suscriptionsService.update(updateSuscriptionDto.id, updateSuscriptionDto);
  }
}
