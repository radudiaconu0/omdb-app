# OMDB Search Appplication

## Setup

### Prerequisites

You will need the following tools:

- Node.js >= 18
- NPM/Yarn
- Your preferred text editor or IDE (e.g., Visual Studio Code)
- nodemon installed 
```bash
npm install -g nodemon
```

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the required dependencies:


```bash
npm install
```

3. Create a .env file in the root of the backend directory, and add the following:
```bash
OMDB_API_KEY=your_omdb_api_key
PORT=your_port_number
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Replace your_omdb_api_key, your_port_number, your_upstash_redis_rest_url, and your_upstash_redis_rest_token with your actual values.
Upstash Redis is used for caching the search results. You can get a free Redis instance from [Upstash](https://console.upstash.com/).
4. Start the backend server:

```bash
npm run start
``` 

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the required dependencies:

```bash
npm install
```
or

```bash
yarn install
```

3. Create a .env file in the root of the frontend directory, and add the following:
```bash
VITE_API_URL=your_backend_url
```

Replace your_backend_url with your actual backend url.

4. Start the frontend server:

```bash
npm run dev
```

or

```bash
yarn dev
```

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Enter a search term in the search box and results will be shown while you type
3. Click on a result to view the details of the movie
4. If you click on serch button the results will be displayed in the page paginated
5. You can also use the pagination buttons to navigate through the pages
6. You can filter the results by type and year
7. You can view details of a movie by clicking on the movie title or the view details button




