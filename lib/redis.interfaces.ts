import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as Redis from 'ioredis';

export type Redis = Redis.Redis;
export type RedisCluster = Redis.Cluster;

export interface RedisModuleOptions {
  config: Redis.RedisOptions & { url?: string, isCluster?: boolean, nodes?: { host: string, port: number }[] };
}

export interface RedisModuleOptionsFactory {
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RedisModuleOptionsFactory>;
  useExisting?: Type<RedisModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
}
