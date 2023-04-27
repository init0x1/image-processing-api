import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/'
import imageProcessingRouter from './api/imageProcessingRouter'
import path from 'path'


//Creatring Router instance

const router: Router = express.Router()


// Welcome Message With / EndPoint

router.get('/', welcomeMessage)


router.use('/fullimages', express.static(path.join(__dirname, '..', '..','fullimages')));


router.use('/api/resize',imageProcessingRouter)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router
