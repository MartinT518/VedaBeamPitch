const request = require('supertest');
const app = require('./server');

async function testServer() {
  console.log('🧪 Testing VedaBeam Server...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await request(app).get('/health');
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response: ${JSON.stringify(healthResponse.body, null, 2)}\n`);

    // Test API status endpoint
    console.log('2. Testing API status endpoint...');
    const statusResponse = await request(app).get('/api/status');
    console.log(`   Status: ${statusResponse.status}`);
    console.log(`   Response: ${JSON.stringify(statusResponse.body, null, 2)}\n`);

    // Test waitlist endpoint with valid email
    console.log('3. Testing waitlist endpoint with valid email...');
    const waitlistResponse = await request(app)
      .post('/api/waitlist')
      .send({ email: 'test@example.com' });
    console.log(`   Status: ${waitlistResponse.status}`);
    console.log(`   Response: ${JSON.stringify(waitlistResponse.body, null, 2)}\n`);

    // Test waitlist endpoint with invalid email
    console.log('4. Testing waitlist endpoint with invalid email...');
    const invalidResponse = await request(app)
      .post('/api/waitlist')
      .send({ email: 'invalid-email' });
    console.log(`   Status: ${invalidResponse.status}`);
    console.log(`   Response: ${JSON.stringify(invalidResponse.body, null, 2)}\n`);

    // Test rate limiting
    console.log('5. Testing rate limiting...');
    for (let i = 0; i < 6; i++) {
      const rateLimitResponse = await request(app)
        .post('/api/waitlist')
        .send({ email: `test${i}@example.com` });
      console.log(`   Request ${i + 1}: Status ${rateLimitResponse.status}`);
      if (rateLimitResponse.status === 429) {
        console.log(`   Rate limited: ${JSON.stringify(rateLimitResponse.body, null, 2)}`);
        break;
      }
    }

    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testServer();
