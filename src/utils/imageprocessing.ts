import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const currentDirectory = __dirname
const fullimagesDirectory = path.join(currentDirectory, '..', '..', 'fullimages')
const resizedImagesDirectory = path.join(currentDirectory, '..', '..', 'resizedimages')

//create resizedImagesDir if not created
const createResizedDir = (): void => {
  fs.mkdir(resizedImagesDirectory, (err) => {
    if (err) {
      console.error(`Error creating directory for resized images: ${err.message}`)
    }
  })
}

// check the resized images dir if not found it will created it
const checkDir = (): void => {
  if (!fs.existsSync(resizedImagesDirectory)) {
    createResizedDir()
  }
}

//check if the image was resized or not
const checkImg = (image: string, height: number, width: number): boolean => {
  try {
    const resizedImage: string = path.join(
      resizedImagesDirectory,
      `${image}_${height}_${width}.jpg`
    )
    return fs.existsSync(resizedImage)
  } catch (error) {
    console.error(`Error checking image: ${error}`)
    return false
  }
}

const imageProcessingApi = async (image: string, height: number, width: number): Promise<void> => {
  const resizedImage: string = path.join(resizedImagesDirectory, `${image}_${height}_${width}.jpg`)
  const noneresizedImage: string = path.join(fullimagesDirectory, `${image}.jpg`)
  try {
    await sharp(noneresizedImage).resize({ height: height, width: width }).toFile(resizedImage)
  } catch (error) {
    console.error(`Error while resizing image: ${error}`)
    throw new Error('Error resizing image')
  }
}

const imageProcessing = async (image: string, height: number, width: number): Promise<boolean> => {
  try {
    await checkDir()
    if (!(await checkImg(image, height, width))) {
      await imageProcessingApi(image, height, width)
    }
    return true
  } catch (error) {
    console.error(`Error processing image: ${error}`)
    return false
  }
}

export default imageProcessing
