import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/'
import path from 'path'


//Creatring Router instance

const router: Router = express.Router()


// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router
