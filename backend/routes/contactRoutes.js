import {Router} from "express"
import { get_contact, create_contact, update_contact, delete_contact } from "../controllers/contactController.js"

const router = Router()

router.get('/contacts', get_contact)

router.post('/contacts', create_contact)

router.put('/contacts/:id', update_contact)

router.delete('/contacts/:id', delete_contact)

export default router