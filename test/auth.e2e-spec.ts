import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Register User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: `testuser@example.com`,
        password: 'password123',
      });

    expect([201, 400]).toContain(response.status);
  });

  it('Login User', async () => {
    const email = `testuser@example.com`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Login User',
        email,
        password: 'password123',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: 'password123',
      });

    expect(response.status).toBe(201);
    
    const token = 
        response.body.accessToken
        
    expect(token).toBeDefined();

    accessToken = token;
  });

  it('Access Profile with Token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });

  it('Access Profile without Token', async () => {
    const response = await request(app.getHttpServer()).get('/auth/profile');

    expect(response.status).toBe(401);
  });
});