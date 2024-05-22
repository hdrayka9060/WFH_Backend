import {z} from 'zod';
import { DateOfBirthZodSchema, FirstNameZodSchema, LastNameZodSchema, OrganiationUserEmailZodSchema, OrganisationDisplayNameZodSchema, OrganisationMaxWfhZodSchema, OrganisationNewDisplayNameZodSchema, OrganisationNewMaxWfh, OrganisationNewUniqueNameZodSchema, OrganisationUniqueNameZodSchema, OrganisationUserOldEmailZodSchema, TokenZodSchema } from './zodSchemas';

export const OrganisationDataZodSchema=z.object({})
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
