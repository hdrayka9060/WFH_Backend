import {Router} from 'express';
import {SystemController} from '../controllers/systemController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { AddUserZodSchema, CreateOrganisationZodSchema, DeleteOrganisationZodSchema, EditOrganisationZodSchema, EditUseZodSchema, OrganisationDataZodSchema, RemoveUserZodSchema } from '../middlewares/zod/zodSchemas/systemZodSchemas';

const router=Router();

router.post('/list',JwtMiddleware.jwtVerifySystemUser,SystemController.organisationList)
router.post('/data',ZodMiddleware.zodValidation(OrganisationDataZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.organisationData)
router.post('/create',ZodMiddleware.zodValidation(CreateOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.createOrganisation)
router.post('/edit',ZodMiddleware.zodValidation(EditOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editOrganisation)
router.post('/delete',ZodMiddleware.zodValidation(DeleteOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.deleteOrganisation)
router.post('/add-user',ZodMiddleware.zodValidation(AddUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.addUser)
router.post('/edit-user',ZodMiddleware.zodValidation(EditUseZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editUser)
router.post('/remove-user',ZodMiddleware.zodValidation(RemoveUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.removeUser)

// router.post('/list',JwtMiddleware.jwtVerifySystemUser,SystemController.organisationList)
// router.post('/data',JwtMiddleware.jwtVerifySystemUser,SystemController.organisationData)
// router.post('/create',JwtMiddleware.jwtVerifySystemUser,SystemController.createOrganisation)
// router.post('/edit',JwtMiddleware.jwtVerifySystemUser,SystemController.editOrganisation)
// router.post('/delete',JwtMiddleware.jwtVerifySystemUser,SystemController.deleteOrganisation)
// router.post('/add-user',JwtMiddleware.jwtVerifySystemUser,SystemController.addUser)
// router.post('/edit-user',JwtMiddleware.jwtVerifySystemUser,SystemController.editUser)
// router.post('/remove-user',JwtMiddleware.jwtVerifySystemUser,SystemController.removeUser)

export default router;


// router.post('/list',JwtMiddleware.jwtVerifySystemUser,SystemController.organisationList)
// router.post('/data',ZodMiddleware.zodValidation(OrganisationDataZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.organisationData)
// router.post('/create',ZodMiddleware.zodValidation(CreateOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.createOrganisation)
// router.post('/edit',ZodMiddleware.zodValidation(EditOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editOrganisation)
// router.post('/delete',ZodMiddleware.zodValidation(DeleteOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.deleteOrganisation)
// router.post('/add-user',ZodMiddleware.zodValidation(AddUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.addUser)
// router.post('/edit-user',ZodMiddleware.zodValidation(EditUseZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editUser)
// router.post('/remove-user',ZodMiddleware.zodValidation(RemoveUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.removeUser)
