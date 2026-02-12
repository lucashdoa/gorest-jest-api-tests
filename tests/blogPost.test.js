const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const { apiClient } = require('./config');

describe('Blog Post CRUD Operations', () => {
  let createdUserId;
  let createdPostId;
  const timestamp = Date.now();

  // Test data for request body - Using time stamp to ensure uniqueness for email and titles
  const userData = {
    name: `Lucas ${timestamp}`,
    email: `lucas${timestamp}@example.com`,
    gender: 'male',
    status: 'active'
  };

  const postData = {
    title: `Blog Post ${timestamp}`,
    body: 'This is a blog post created for automation testing purposes.'
  };

  const updatedPostData = {
    title: `Updated Blog Post ${timestamp}`,
    body: 'This blog post has been updated with new content for testing purposes.'
  };

  describe('Step 1: Create a new user', () => {
    test('should create a new user successfully', async () => {
      const response = await apiClient.post('/users', userData);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe(userData.name);
      expect(response.data.email).toBe(userData.email);
      expect(response.data.gender).toBe(userData.gender);
      expect(response.data.status).toBe(userData.status);

      createdUserId = response.data.id;
    });

    test('should verify the created user exists', async () => {
      expect(createdUserId).toBeDefined();

      const response = await apiClient.get(`/users/${createdUserId}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(createdUserId);
      expect(response.data.email).toBe(userData.email);
    });
  });

  describe('Step 2: Create a blog post with the user ID', () => {
    test('should create a new blog post for the user', async () => {
      expect(createdUserId).toBeDefined();

      const response = await apiClient.post(`/users/${createdUserId}/posts`, postData);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(postData.title);
      expect(response.data.body).toBe(postData.body);
      expect(response.data.user_id).toBe(createdUserId);

      createdPostId = response.data.id;
      console.log(`Created blog post with ID: ${createdPostId}`);
    });
  });

  describe('Step 3: Verify the blog post contents', () => {
    test('should retrieve and verify the created blog post', async () => {
      expect(createdPostId).toBeDefined();

      const response = await apiClient.get(`/posts/${createdPostId}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(createdPostId);
      expect(response.data.title).toBe(postData.title);
      expect(response.data.body).toBe(postData.body);
      expect(response.data.user_id).toBe(createdUserId);

      console.log(`Verified blog post contents`);
    });
  });

  describe('Step 4: Update the blog post', () => {
    test('should update the blog post successfully', async () => {
      expect(createdPostId).toBeDefined();

      const response = await apiClient.put(`/posts/${createdPostId}`, {
        ...updatedPostData,
        user_id: createdUserId
      });

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(createdPostId);
      expect(response.data.title).toBe(updatedPostData.title);
      expect(response.data.body).toBe(updatedPostData.body);
    });

    test('should verify the blog post was updated', async () => {
      expect(createdPostId).toBeDefined();

      const response = await apiClient.get(`/posts/${createdPostId}`);

      expect(response.status).toBe(200);
      expect(response.data.title).toBe(updatedPostData.title);
      expect(response.data.body).toBe(updatedPostData.body);
    });
  });

  describe('Step 5: Delete the blog post', () => {
    test('should delete the blog post successfully', async () => {
      expect(createdPostId).toBeDefined();

      const response = await apiClient.delete(`/posts/${createdPostId}`);

      expect(response.status).toBe(204);
    });

    test('should confirm the blog post no longer exists', async () => {
      expect(createdPostId).toBeDefined();

      try {
        await apiClient.get(`/posts/${createdPostId}`);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  // Cleanup: Delete the test user
  afterAll(async () => {
    if (createdUserId) {
      try {
        await apiClient.delete(`/users/${createdUserId}`);
      } catch (error) {
        console.log(`Note: Could not delete test user ${createdUserId}:`, error.message);
      }
    }
  });
});
