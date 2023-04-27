import express, { Request, request, Response, Router } from 'express'
import path from 'path'
import imageProcessing from '../../utils/imageprocessing'

const imageProcessingRouter: Router = Router()

const currentDirectory = __dirname
const resizedImagesDirectory = path.join(currentDirectory, '..', '..', '..', 'resizedimages')

imageProcessingRouter.get('/', async (request: Request, response: Response): Promise<void> => {
  const images: string[] = ['a', 'c', 'g', 'j', 'r']

  const imageName: string = request.query.image as string
  const height: number = parseInt(request.query.height as string)
  const width: number = parseInt(request.query.width as string)

  //validate image name
  if (!images.includes(imageName)) {
    response.status(400).json({ Message: 'Sorry image name is not valid' })
    return
  }

  //validate height
  if (isNaN(height) || height <= 0) {
    response.status(400).json({ Message: 'Sorry height is not valid' })
    return
  }

  //validate width
  if (isNaN(width) || width <= 0) {
    response.status(400).json({ Message: 'Sorry width is not valid' })
    return
  }
  try {
    if (await imageProcessing(imageName, height, width)) {
      const resizedImage: string = path.join(
        resizedImagesDirectory,
        `${imageName}_${height}_${width}.jpg`
      )
      response.sendFile(resizedImage)
    } else {
      response.sendStatus(500)
    }
  } catch (error) {
    response.sendStatus(500)
  }
})

export default imageProcessingRouter
