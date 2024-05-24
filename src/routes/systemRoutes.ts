import {Router} from 'express';
import {SystemController} from '../controllers/systemController';
import { JwtMiddleware } from '../middlewares/jwt/jwtMiddleware';
import { ZodMiddleware } from '../middlewares/zod/zodMiddleware';
import { AddUserZodSchema, CreateOrganisationZodSchema, DeleteOrganisationZodSchema, EditOrganisationZodSchema, EditUseZodSchema, OrganisationDataZodSchema, RemoveUserZodSchema,OrganisationUsersZodSchema,OrganisationListZodSchema } from '../middlewares/zod/zodSchemas/systemZodSchemas';

const router=Router();

router.post('/list',ZodMiddleware.zodValidation(OrganisationListZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.getOrganisationList)
router.post('/data',ZodMiddleware.zodValidation(OrganisationDataZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.getOrganisationData)
router.post('/users',ZodMiddleware.zodValidation(OrganisationUsersZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.getOrganisationUsers)
router.post('/create',ZodMiddleware.zodValidation(CreateOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.createOrganisation)
router.put('/edit',ZodMiddleware.zodValidation(EditOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editOrganisation)
router.put('/delete',ZodMiddleware.zodValidation(DeleteOrganisationZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.deliveOrganisation)
router.post('/add-user',ZodMiddleware.zodValidation(AddUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.addUser)
router.put('/edit-user',ZodMiddleware.zodValidation(EditUseZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.editUser)
router.put('/remove-user',ZodMiddleware.zodValidation(RemoveUserZodSchema),JwtMiddleware.jwtVerifySystemUser,SystemController.removeUser)


export default router;