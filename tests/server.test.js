const request = require('supertest');
const app = require('../server');

describe('VedaBeam Server', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'vedabeam-pitch-onepager');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('GET /api/status', () => {
    it('should return API status', async () => {
      const response = await request(app).get('/api/status');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('api', 'VedaBeam Pitch One-Pager API');
      expect(response.body).toHaveProperty('status', 'operational');
    });
  });

  describe('POST /api/waitlist', () => {
    it('should accept valid email', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: 'invalid-email' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });

    it('should reject empty email', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: '' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject missing email', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject email that is too short', async () => {
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: 'a@b' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject email that is too long', async () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: longEmail })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('Rate Limiting', () => {
    it('should limit requests to waitlist endpoint', async () => {
      const validEmail = 'test@example.com';
      
      // Make 5 requests (should all succeed)
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/waitlist')
          .send({ email: `test${i}@example.com` })
          .expect(200);
      }

      // 6th request should be rate limited
      const response = await request(app)
        .post('/api/waitlist')
        .send({ email: 'test6@example.com' })
        .expect(429);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Too many signup attempts');
    });
  });

  describe('Request ID Tracking', () => {
    it('should include X-Request-ID header', async () => {
      const response = await request(app).get('/health');
      expect(response.headers).toHaveProperty('x-request-id');
      expect(response.headers['x-request-id']).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent API endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
