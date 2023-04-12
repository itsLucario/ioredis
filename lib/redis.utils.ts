import { RedisModuleOptions } from './redis.interfaces';
import * as Redis from 'ioredis';
import {
  REDIS_MODULE_CONNECTION,
  REDIS_MODULE_CONNECTION_TOKEN,
  REDIS_MODULE_OPTIONS_TOKEN
} from './redis.constants';

export function getRedisOptionsToken(connection?: string): string {
  return `${ connection || REDIS_MODULE_CONNECTION }_${ REDIS_MODULE_OPTIONS_TOKEN }`;
}

export function getRedisConnectionToken(connection?: string): string {
  return `${ connection || REDIS_MODULE_CONNECTION }_${ REDIS_MODULE_CONNECTION_TOKEN }`;
}

export function createRedisConnection(options: RedisModuleOptions) {
  const { config } = options;
  if (config.url) {
    return new Redis(config.url, config);
  } else if (config.isCluster) {
    const hosts = config.host.split(',');
    const nodes = hosts.map((host) => {
      return { host: host.trim(), port: config.port }
    })
    return new Redis.Cluster(nodes, {
      enableReadyCheck: true,
      scaleReads: "all", //"slave",
      redisOptions: {
        password: config.password,
        enableOfflineQueue: true,
      }
    });
  } else {
    return new Redis(config);
  }
}
