const dbHandler = require('../db-setup');
const User = require("../../models/user");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {username, email, password, phoneNumber} = require("../dummy-data/user-dummy-data");


describe('user schema ', () => {

    it('should successfully create user', async () => {
        const data = {
            username, email, password, phoneNumber
        }
        const user1 = await User.create(data);
        expect(user1.username).toEqual(username);
    });

    it('error on missing email', async () => {
        const data = {
            username, password
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual(username)

        } catch (error) {
            expect(error["errors"]["email"]["kind"]).toEqual("required")
            expect(error["errors"]["email"]["path"]).toEqual("email")
        }
    });

    it('error on missing username', async () => {
        const data = {
            email, password
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual(username)

        } catch (error) {
            expect(error["errors"]["username"]["kind"]).toEqual("required")
            expect(error["errors"]["username"]["path"]).toEqual("username")
        }
    });

    it('error on missing password', async () => {
        const data = {
            username, email
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual(username)

        } catch (error) {
            expect(error["errors"]["password"]["kind"]).toEqual("required")
            expect(error["errors"]["password"]["path"]).toEqual("password")
        }
    });

    it('error on missing phone number', async () => {
        const data = {
            username, email, password
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual(username)
        } catch (error) {
            expect(error["errors"]["phoneNumber"]["kind"]).toEqual("required")
            expect(error["errors"]["phoneNumber"]["path"]).toEqual("phoneNumber")
        }
    });
});
