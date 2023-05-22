import { Redis, RedisConfigNodejs } from '@upstash/redis'
import { config } from '../config/config';

const configuration: RedisConfigNodejs = {
  url: config.UPSTASH_REDIS_REST_URL,
  token: config.UPSTASH_REDIS_REST_TOKEN
}

const redis = new Redis(configuration)

export default redis;