import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateStoreClientDto, CreateStoreDto, CreateStoreTraderDto, UpdateStoreClientDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UpdateStoreTraderDto } from './dto/update-store-trader.dto';
import { StorePaginationDto } from './dto/store-pagination.dto';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StoresService extends PrismaClient implements OnModuleInit{
    private readonly logger = new Logger('Store service');
    constructor(
      @Inject(NATS_SERVICE) private readonly client : ClientProxy,
  ){
      super();
  }
    async onModuleInit() {
        await this.$connect();
    }

    async create(createStoreDto : CreateStoreDto){
        const {traderId, ...rest} = createStoreDto;
        const store = await this.store.create({
            data: rest,
        });

        const storeTrader = await this.storeTrader.create({
          data: {
            traderId: traderId,
            storeId: store.id
          }
        });

        return {
          Store: store,
          StoreTrader: storeTrader
        }
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

    async getStoresByTraderId(storePaginationDto: StorePaginationDto){
      const { page, limit } = storePaginationDto;
    
        const totalPages = await this.storeTrader.count({
          where: {
            traderId: storePaginationDto.id
          }
        });

        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.storeTrader.findMany({
            where: {
              traderId: storePaginationDto.id
            },
            include: {
              Store: true,
            },
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

    // ========================================
    //=============StoreClient=================
    // ========================================

    async createStoreClient(createStoreClientDto : CreateStoreClientDto){
      const storeClient = await this.storeClient.findFirst({
        where: {
          storeId: createStoreClientDto.storeId,
          clientId: createStoreClientDto.clientId
        }
      });
      if (!storeClient){
        return this.storeClient.create({
          data: createStoreClientDto,
        });
      }

      return {
        message: "He is already register like client"
      }
      
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

    async updateStoreClient(updateStoreClientDto : UpdateStoreClientDto){
      const { id, ...data} = updateStoreClientDto;
      
      return this.storeClient.update({
        where: {id},
        data: data
      });
    }

    async getClientsByStoreId( storePaginationDto : StorePaginationDto ){
      const { page, limit } = storePaginationDto;
    
        const totalPages = await this.storeClient.count({
          where: {
            storeId: storePaginationDto.id
          }
        });

        const lastPage = Math.ceil(totalPages / limit);
        const storeClients = await this.storeClient.findMany({
          where: {
            storeId: storePaginationDto.id
          },
          include: {
            Store: true
          },
          skip: (page - 1) * limit,
          take: limit,
        });

        const clients = await Promise.all(
          storeClients.map(async (storeClient) => {
              const response = await firstValueFrom(
                  this.client.send('auth.find.one.client', {
                      id: storeClient.clientId,
                  }),
              );
              return response; // Devuelve el resultado para que esté en el array final
          })
      );

        return {
          clients,
          meta: {
            total: totalPages,
            page: page,
            lastPage: lastPage,
          },  
        }
        
    }
    // ========================================
    //=============StoreInvoice=================
    // ========================================


    async validateStores(ids: string[]) {
      ids = Array.from(new Set(ids));
  
      const stores = await this.store.findMany({
        where: {
          id: {
            in: ids
          }
        }
      });
  
      if ( stores.length !== ids.length ) {
        throw new RpcException({
          message: 'Some stores were not found',
          status: HttpStatus.BAD_REQUEST,
        });
      }
      return stores;
    }
}
