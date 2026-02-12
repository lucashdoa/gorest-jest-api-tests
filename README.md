# API Exercise - Blog Post Automation

This project automates a sequence of API calls to the GoRest API.

## Overview

The test suite performs the following operations:
1. Create a new user
2. Create a blog post
3. Verify the post contents
4. Update the blog post
5. Delete the blog post and confirm deletion

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A GoRest API token

## Getting Your API Token

Navigate to [https://gorest.co.in/](https://gorest.co.in/), authenticate and follow steps provided in the website in order to get a token

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or rename the .env.example file):

```bash
cp .env.example .env
```

Open the `.env` file and replace `your_token_here` with your actual GoRest API token:

```
GOREST_API_TOKEN="your_actual_token_here"
```

## Running the Tests

### Run all tests

```bash
npm test
```

## Technologies Used

- **Jest** - Testing framework
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
