import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSuscriptionDto, UpdateSuscriptionDto } from './dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SuscriptionsService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('Suscription service');

    async onModuleInit() {
        await this.$connect();
    }

    create(createSuscriptionDto: CreateSuscriptionDto){
        return this.suscription.create({
            data: createSuscriptionDto,
        });
    }

    async findAll(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
    
        const totalPages = await this.suscription.count();
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.suscription.findMany({
            skip: (page - 1) * limit,
            take: limit,
          }),
          meta: {
            total: totalPages,
            page: page,
            lastPage: lastPage,
          },
        };
    }

    async findOne(id: string) {
        const suscription = await this.suscription.findFirst({
          where: { id}
        });
    
        if (!suscription) {
          throw new RpcException({
            message: `Suscription with id #${id} not found`,
            status: HttpStatus.BAD_REQUEST,
          });
        }
    
        return suscription;
    }

    async update(id: string, updateSuscriptionDto: UpdateSuscriptionDto) {
        const { id: __, ...data } = updateSuscriptionDto;
    
        await this.findOne(id);
    
        return this.suscription.update({
          where: { id },
          data: data,
        });
      }
      
}
