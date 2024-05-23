import {z} from 'zod';
import { DateOfBirthZodSchema, FirstNameZodSchema, LastNameZodSchema, OrganiationUserEmailZodSchema, OrganisationDisplayNameZodSchema, OrganisationMaxWfhZodSchema, OrganisationNewDisplayNameZodSchema, OrganisationNewMaxWfh, OrganisationNewUniqueNameZodSchema, OrganisationUniqueNameZodSchema, OrganisationUserOldEmailZodSchema, OrganisationNewAdminZodSchema,LimitZodSchema,PageZodSchema } from './zodSchemas';

export const OrganisationListZodSchema=z.object({})
                                        .merge(PageZodSchema)
                                        .merge(LimitZodSchema)

export const OrganisationDataZodSchema=z.object({})
                                        .merge(OrganisationUniqueNameZodSchema)
                                        .merge(PageZodSchema)
                                        .merge(LimitZodSchema)

export const OrganisationUsersZodSchema=z.object({})
                                         .merge(OrganisationUniqueNameZodSchema)

export const CreateOrganisationZodSchema=z.object({})
                                          .merge(OrganisationUniqueNameZodSchema)
                                          .merge(OrganisationDisplayNameZodSchema)
                                          .merge(OrganisationMaxWfhZodSchema)

export const EditOrganisationZodSchema=z.object({})
                                        .merge(OrganisationUniqueNameZodSchema)
                                        .merge(OrganisationNewUniqueNameZodSchema)
                                        .merge(OrganisationNewDisplayNameZodSchema)
                                        .merge(OrganisationNewMaxWfh)
                                        .merge(OrganisationNewAdminZodSchema)

export const DeleteOrganisationZodSchema=z.object({})
                                          .merge(OrganisationUniqueNameZodSchema)

export const AddUserZodSchema=z.object({})
                               .merge(OrganisationUniqueNameZodSchema)
                               .merge(OrganiationUserEmailZodSchema)
                               .merge(FirstNameZodSchema)
                               .merge(LastNameZodSchema)
                               .merge(DateOfBirthZodSchema)

export const EditUseZodSchema=z.object({})
                               .merge(OrganisationUserOldEmailZodSchema)
                               .merge(OrganisationUniqueNameZodSchema)
                               .merge(OrganiationUserEmailZodSchema)
                               .merge(FirstNameZodSchema)
                               .merge(LastNameZodSchema)
                               .merge(DateOfBirthZodSchema)

export const RemoveUserZodSchema=z.object({})
                                  .merge(OrganisationUniqueNameZodSchema)
                                  .merge(OrganiationUserEmailZodSchema)
