import { OrganisationDao } from '../dao/organisationDao';
import { UserDao } from '../dao/userDao';
import { RequestsDao } from '../dao/requestsDao';
import { AddUserService, CreateOrganisation, EditUserService, OrganisationList, OrganisationData } from '../typings/system.types';
import { EditOrganisation } from '../typings/orgnisationTypings';

export class SystemServices {

    public static async getOrganisationList(): Promise<OrganisationList[]> {
        try {
            const res = await OrganisationDao.getOrganisations();
            let result = [];
            for (let i = 0; i < res.length; i++) {
                result.push({'id':i+1, 'orgUniqName': res[i]['orgUniqName'], 'orgDisplayName': res[i]['orgDisplayName'], 'orgAdmin': res[i]['orgAdmin'], 'maxWfh': res[i]['maxWfh'] });
            }
            return result;
        } catch (e) { return []; }
    }

    public static async getOrganisationData(orgUniqName: string): Promise<OrganisationData[]> {
        try {
            const res = await UserDao.getUserByOrgUniqName(orgUniqName);
            let result = [];
            for (let i = 0; i < res.length; i++) {
                result.push({ 'id':i+1,'firstName': res[i]['firstName'], 'lastName': res[i]['lastName'], 'userEmail': res[i]['userEmail'], 'dateOfJoining': res[i]['dateOfJoining'], 'dateOfBirth': res[i]['dateOfBirth'], 'wfh': res[i]['wfh'] });
            }
            return result;

        } catch (e) { return []; }
    }

    public static async createOrganisationService(obj: CreateOrganisation): Promise<boolean> {
        try {
            const org = await OrganisationDao.getOrganisationByOrgUniqName(obj.orgUniqName);
            if (org) return false;
            const res = await OrganisationDao.addOrganisation(obj);
            if (!res) { return false; }
            return true;
        } catch (e) { return false; }
    }

    public static async editOrganisationService(obj: EditOrganisation): Promise<boolean> {
        try {
            const org = await OrganisationDao.getOrganisationByOrgUniqName(obj.orgUniqName);
            if (typeof org !== 'boolean' && org['orgUniqName'] !== obj.oldOrgUniqName) return false;

            const res = await OrganisationDao.editOrganisationbyOrgUniqName(obj);
            if (!res) return false;

            const res2 = await RequestsDao.updateOrgUniqname(obj.oldOrgUniqName, obj.orgUniqName);
            const res3 = await UserDao.updateOrgUniqname(obj.oldOrgUniqName, obj.orgUniqName);

            return true;
        } catch (e) { console.log("err", e); return false; }
    }

    public static async deleteOrganisationService(orgUniqName: string): Promise<boolean> {
        try {
            const res = await OrganisationDao.deleteOrganisationByOrgUniqNameAndSystemUser(orgUniqName);
            if (!res) { return false; }
            return true;
        } catch (e) { console.log("err", e); return false; }
    }

    public static async addUserService(obj: AddUserService): Promise<boolean> {
        try {
            const user = await UserDao.getUserByOrgUniqNameAndUserEmail(obj.orgUniqName, obj.userEmail);
            if (user) return false;

            const res = await UserDao.addUser(obj);
            if (!res) { return false; }

            return true;
        } catch (e) { return false; }
    }

    public static async editUserService(obj: EditUserService): Promise<boolean> {
        try {
            const user = await UserDao.getUserByOrgUniqNameAndUserEmail(obj.orgUniqName, obj.userOldEmail);
            if ( user && user['userEmail'] !== obj.userOldEmail) return false;

            if (obj.userOldEmail != obj.userEmail) {
                const org = await OrganisationDao.getOrganisationByOrgUniqName(obj.orgUniqName);
                if (typeof org === 'boolean') return false;
                if (org['orgAdmin'] === obj.userOldEmail) {
                    const change = OrganisationDao.editOrganisationAdminbyOrgUniqName(obj.orgUniqName, obj.userEmail);
                    if (!change) return false;
                }
            }
            const res = await UserDao.editUser(obj);
            if (!res) { return false; }
            return true;
        } catch (e) { return false; }
    }

    public static async removeUserService(userEmail: string, orgUniqName: string): Promise<boolean> {
        try {
            const res = await UserDao.deleteUser(userEmail, orgUniqName);
            if (!res) { return false; }
            return true;
        } catch (e) { return false; }
    }
}
