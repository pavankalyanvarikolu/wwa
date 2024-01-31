const { SignupController, LoginController, ForgotController, LogoutController } = require("../../controllers/authController");
const User = require("../../model/User");
let request, response;

jest.mock("../../model/User");

beforeEach(() => {
    request = {
        body: {
            firstname: "firstname",
            lastname: "lastname",
            email: "email",
            password: "password",
            cpassword: "password"

        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})



describe('Signup Rountes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await SignupController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords is short than 6 character", async () => {
        request.body.password = "short";
        result = await SignupController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await SignupController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User already Exist", async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: 1,
            email: 'email',
            password: 'password',
        }));
        result = await SignupController(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Login Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await LoginController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await LoginController(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 400 if password does not match", async () => {
        User.findOne.mockImplementationOnce(() => ({ password: 'not match' }));
        result = await LoginController(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Forgot Password Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await ForgotController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await ForgotController(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await SignupController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('Logout Routes', () => {

    it("Should return status 500 if User was not logged in", async () => {
        const jwtoken = "Not a valid Token";
        result = await LogoutController(request, response);
        expect(response.status).toHaveBeenCalledWith(500);
    });

});

