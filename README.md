# Image Processing API

This is a Node.js application that provides image processing functionality through a RESTful API. It allows users to resize images through HTTP requests.

## Requirements

- Node.js 
- npm 
## Getting Started

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server
4. The server will be listening on `http://localhost:3000`

## Endpoints

- `GET /fullimages/filename`: Returns the full image with the specified filename.
- `GET /api/resize/?filename&width=100&height=100`: Returns a resized image with the specified dimensions. If only one dimension is provided, the other will be scaled proportionally.

## Examples

- To retrieve the full image named `a.jpg`, send a GET request to `http://127.0.0.1:3000/fullimages/a.jpg`
- To retrieve a resized version of the same image with a height 200px and width of 200px, send a GET request to `http://127.0.0.1:3000/api/resize?image=a&height=200&width=200`

## Testing

To run the unit tests, use the following command:
```
npm run test
```
