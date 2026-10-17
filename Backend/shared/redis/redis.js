import Redis from 'ioredis';

const redis = new Redis( process.env.REDIS_HOST)


redis.on('connect', () => {
  console.log('Connected to Redis');
});

export default redis;

