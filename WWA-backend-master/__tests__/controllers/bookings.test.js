const { BookTicketController, MyBookingController } = require("../../controllers/bookingController");
const User = require("../../model/User");
const Booking = require("../../model/Booking");

let request, response;

jest.mock("../../model/Booking");

beforeEach(() => {
    request = {
        body: {
            email: "email",
            userDetails: {
                name: "firstname",
                email: "email",
                address: "address",
                contact: 1234567890,
                date: "2020-02-02",
                adult: 1,
                children: 1
            },
            selectedAdventures: {
                Thrillville: [],
            }

        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})


describe('Ticket Booking Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.userDetails.email = undefined;
        result = await BookTicketController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if number of visitors is Zero", async () => {
        request.body.userDetails.adult = 0;
        request.body.userDetails.children = 0;
        result = await BookTicketController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('View Bookings Routes', () => {

    it("Should return status 422 if User is not looged in ", async () => {
        request.body.email = undefined;
        result = await MyBookingController(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });
    
    it("Should return status 400 if No Booking Found", async () => {
        Booking.find.mockImplementationOnce(() => ([]));
        result = await MyBookingController(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    })

});