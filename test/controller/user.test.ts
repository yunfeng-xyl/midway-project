import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).post("/api/user/login").send({ username: "admin", password: "admin123" });

    console.log(result);

    // use expect by jest
    expect(result.status).toBe(200);
    // expect(result.message).toBe('登录成功');

    // close app
    await close(app);
  });

});