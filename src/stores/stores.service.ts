import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StoresService extends PrismaClient implements OnModuleInit{
    private readonly logger = new Logger('Store service');
    async onModuleInit() {
        await this.$connect();
    }

    create(createStoreDto : CreateStoreDto){
        return this.store.create({
            data: createStoreDto,
        });
    }

    async findAll(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
    
        const totalPages = await this.store.count();
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.store.findMany({
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
        const catalog = await this.store.findFirst({
          where: { id}
        });
    
        if (!catalog) {
          throw new RpcException({
            message: `Store with id #${id} not found`,
            status: HttpStatus.BAD_REQUEST,
          });
        }
    
        return catalog;
    }
    async update(id: string, updateStoreDto: UpdateStoreDto) {
        const { id: __, ...data } = updateStoreDto;
        this.logger.log('In catalog service');
    
        // await this.findOne(id);
        console.log(id);
        console.log(data);
    
        return this.store.update({
          where: { id },
          data: data,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
    
        const catalog = await this.store.delete({
          where: { id },
        });
    
        return catalog;
    }

}
