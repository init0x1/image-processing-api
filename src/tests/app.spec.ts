import supertest from 'supertest'
import app from '../app'
import imageProcessing from '../utils/imageprocessing'
// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test / endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('test /fullimages/r.jpg endpoint', async () => {
    const response = await request.get('/fullimages/r.jpg')
    expect(response.status).toBe(200)
  })
})
describe('Test Api ', () => {
  it('test / endpoint with valid query', async () => {
    const response = await request
      .get('/api/resize/')
      .query({ height: 40, width: 50, image: 'r' })
    expect(response.status).toBe(200)
  })
  it('test / endpoint with unvaild', async () => {
    const response = await request
      .get('/api/resize/')
      .query({ height: -1, width: 0, image: 'something' })
    expect(response.status).toBe(400)
  })
  it('test Functionality  with vaild', async () => {
    const result = await imageProcessing('r', 99, 99)

    expect(result).toBe(true)
  })
  it('test Functionality  with vaild', async () => {
    const result = await imageProcessing('r', 0, 0)

    expect(result).toBe(false)
  })
})