import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateStoreClientDto, CreateStoreDto, CreateStoreInvoiceDto, CreateStoreTraderDto, UpdateStoreClientDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateStoreTraderDto } from './dto/update-store-trader.dto';
import { UpdateStoreInvoiceDto } from './dto/update-store-invoice.dto';

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
    
        const store = await this.store.delete({
          where: { id },
        });
    
        return store;
    }

    // ========================================
    //=============StoreTrader=================
    // ========================================

    async createStoreTrader(createStoreTraderDto : CreateStoreTraderDto){
      return this.storeTrader.create({
        data: createStoreTraderDto,
       });
    }

    async findAllStoreTrader(paginationDto : PaginationDto){
      const { page, limit } = paginationDto;
    
        const totalPages = await this.storeTrader.count();
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.storeTrader.findMany({
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

    async findOneStoreTrader(id : string){
      const storeTrader = await this.storeTrader.findFirst({
        where: { id}
      });
  
      if (!storeTrader) {
        throw new RpcException({
          message: `StoreTrader with id #${id} not found`,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  
      return storeTrader;
    }

    async deleteStoreTrader(id : string){
      await this.findOne(id);
    
        const storeTrader = await this.storeTrader.delete({
          where: { id },
        });
    
        return storeTrader;
    }

    async updateStoreTrader(id: string, updateStoreTraderDto : UpdateStoreTraderDto){
      const { id: __, ...data } = updateStoreTraderDto;
    
        return this.storeTrader.update({
          where: { id },
          data: data,
        });
    }

    // ========================================
    //=============StoreClient=================
    // ========================================

    async createStoreClient(createStoreClientDto : CreateStoreClientDto){
      return this.storeClient.create({
        data: createStoreClientDto,
      });
    }

    async findAllStoreClient(paginationDto: PaginationDto){
      const { page, limit } = paginationDto;
    
      const totalPages = await this.storeClient.count();
      const lastPage = Math.ceil(totalPages / limit);
    
      return {
        data: await this.storeClient.findMany({
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

    async findOneStoreClient(id: string){
      const storeClient = await this.storeClient.findFirst({
        where: { id}
      });
  
      if (!storeClient) {
        throw new RpcException({
          message: `StoreClient with id #${id} not found`,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  
      return storeClient;
    }

    async deleteStoreClient(id: string){
      await this.findOne(id);
    
        const storeClient = await this.storeClient.delete({
          where: { id },
        });
    
        return storeClient;
    }

    async updateStoreClient(id: string, updateStoreClientDto : UpdateStoreClientDto){
      const { id: __, ...data} = updateStoreClientDto;
      
      return this.storeClient.update({
        where: {id},
        data: data
      });
    }
    // ========================================
    //=============StoreInvoice=================
    // ========================================

    async createStoreInvoice(createStoreInvoiceDto : CreateStoreInvoiceDto){
      return this.storeInvoice.create({
        data: createStoreInvoiceDto,
      });
    }

    async findAllStoreInvoice(paginationDto: PaginationDto){
      const { page, limit } = paginationDto;
    
      const totalPages = await this.storeInvoice.count();
      const lastPage = Math.ceil(totalPages / limit);
    
      return {
        data: await this.storeInvoice.findMany({
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

    async findOneStoreInvoice(id: string){
      const storeInvoice = await this.storeInvoice.findFirst({
        where: { id}
      });
  
      if (!storeInvoice) {
        throw new RpcException({
          message: `StoreInvoice with id #${id} not found`,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  
      return storeInvoice;
    }

    async deleteStoreInvoice(id: string){
      await this.findOne(id);
    
        const storeInvoice = await this.storeInvoice.delete({
          where: { id },
        });
    
        return storeInvoice;
    }

    async updateStoreInvoice(id: string, updateStoreInvoiceDto: UpdateStoreInvoiceDto){
      const { id: __, ...data } = updateStoreInvoiceDto;
        return this.storeInvoice.update({
          where: { id },
          data: data,
        });
    }
}
