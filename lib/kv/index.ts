import {
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";

abstract class KVBase {
  abstract get<T extends JSONValue>(key: string): Promise<null | T>;
  abstract set<T extends JSONValue>(
    key: string,
    value: T,
    ttl: number,
  ): Promise<void>;
  abstract delete(key: string): Promise<void>;
}

type JSONValue = string | number | boolean | null | JSONValue[] | {
  [key: string]: JSONValue;
};

export class RedisKV<
  M extends RedisModules,
  F extends RedisFunctions,
  S extends RedisScripts,
> extends KVBase {
  constructor(private client: RedisClientType) {
    super();
  }

  async get<T extends JSONValue>(key: string): Promise<null | T> {
    try {
      const result = await this.client.json.get(key) as T | null;
      return result;
    } catch (e) {
      //TODO: handle error
      return null;
    }
  }

  async set<T extends JSONValue>(
    key: string,
    value: T,
    ttl: number,
  ): Promise<void> {
    try {
      await this.client.json.set(key, "$", value);
      await this.client.expire(key, ttl);
    } catch (e) {
      //TODO: handle error
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (e) {
      //TODO: handle error
    }
  }
}
