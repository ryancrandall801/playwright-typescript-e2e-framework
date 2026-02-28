import { test, expect } from '@playwright/test';

test.describe('@api JSONPlaceholder Users API', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('GET /users returns 200 and an array of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);

    expect(users[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      }),
    );
  });

  test('GET /users/1 returns a user with expected fields', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    expect(response.ok()).toBeTruthy();

    const user = await response.json();
    expect(user).toMatchObject({
      id: 1,
      username: expect.any(String),
      email: expect.any(String),
    });
  });
});
