import { MidwayConfig } from '@midwayjs/core';
import UserEntity from '../entity/user.entity';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659277842694_7500',
  koa: {
    port: 7001,
  },
  jwt: {
    expiresIn: '2d',
  },
  typeorm: {
    dataSource: {
      default: {
        type: "sqlite",
        database: join(__dirname, '../../demo.sqlite'),
        // dropSchema: true,
        entities: [UserEntity],
        synchronize: true,  // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
      }
    }
  }
} as MidwayConfig;
