import {Router} from 'express';
import {SystemController} from '../controllers/systemController';

const router=Router();

router.post('/list',SystemController.organisationList)
router.post('/data',SystemController.organisationData)
router.post('/create',SystemController.createOrganisation)
router.post('/edit',SystemController.editOrganisation)
router.post('/delete',SystemController.deleteOrganisation)
router.post('/add-user',SystemController.addUser)
router.post('/remove-user',SystemController.removeUser)

export default router;