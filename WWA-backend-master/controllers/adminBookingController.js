const Booking = require("../model/Booking");
const adminMail = process.env.ADMIN_MAIL;

//booking list function
const getBookingList = ({ bookings }) => {

    const bookingslist = bookings.flatMap(booking => {
        const adventures = Object.keys(booking.adventures).flatMap(parkName => {
            return booking.adventures[parkName].map(adventureName => ({
                address: booking.address,
                adult: booking.adult,
                children: booking.children,
                email: booking.email,
                name: booking.name,
                contact: booking.contact,
                date: booking.date,
                bookingnumber: booking.bookingnumber,
                park: parkName,
                adventure: adventureName,
            }));
        });

        return adventures;
    });

    return bookingslist;
}

async function AdminBookTicketController(req, res) {

    const { userDetails, selectedAdventures } = req.body;

    if (!userDetails.name || !userDetails.email || !userDetails.address || !userDetails.contact || !userDetails.date) {
        return res.status(422), res.json({ message: 'Please fill all fields' });
    }

    if (userDetails.adult === 0 && userDetails.children === 0) {
        return res.status(422), res.json({ message: 'Select atleast one Visitor' });
    }

    const totalbooking = await Booking.countDocuments({}, { hint: "_id_" });
    const bookingnumber = "WWA" + 10000 + totalbooking;
    const newBookingData = {
        ...userDetails,
        bookingnumber: bookingnumber,
        adventures: {
            ...selectedAdventures,
        },
    };

    try {

        const newBooking = new Booking(newBookingData);
        const response = await newBooking.save();

        res.status(201), res.json({ message: 'Booking successfully', bookingnumber: bookingnumber });

    } catch (error) {
        console.log(error);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

async function AdminBookingsController(req, res) {
    const { email } = req.body;

    if(!email) {
        return res.status(422), res.json({message: "No booking for this Email"});
    }

    if (email != adminMail) {
        return res.status(400), res.json({ message: 'Unautherized' });
    }

    try {
        const bookings = await Booking.find();

        if (bookings.length === 0) {
            return res.status(400), res.json({ message: 'No Bookings yet' });
        }

        const bookingslist = getBookingList({ bookings });
        res.status(200), res.json({ message: 'Booking Found', bookings: bookingslist });

    }
    catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

async function AdminEditTicketController(req, res) {
    const { user, booking } = req.body;

    if (!user.name || !user.email || !user.address || !user.contact) {
        return res.status(400), res.json({ message: 'Please fill all fields' });
    }

    if (user.adult === 0 && user.children === 0) {
        return res.status(400), res.json({ message: 'Select atleast one Visitor' });
    }
    try {
        const bookingpre = await Booking.findOne({ bookingnumber: booking.bookingnumber });
        bookingpre.name = user.name;
        bookingpre.email = user.email;
        bookingpre.contact = user.contact;
        bookingpre.address = user.address;
        bookingpre.date = user.date;
        bookingpre.adult = user.adult;
        bookingpre.children = user.children;
        await bookingpre.save();

        res.status(200), res.json({ message: "Booking Update Successful" });
    } catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

async function AdminDeleteBookingController(req, res) {
    const { booking } = req.body;

    try {
        const bookingpre = await Booking.findOne({ bookingnumber: booking.bookingnumber });
        bookingpre.adventures[booking.park] = bookingpre.adventures[booking.park].filter((a) => a !== booking.adventure);

        await bookingpre.save();

        res.status(200), res.json({ message: "Booking Delete Successful" });
    }
    catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }

}

module.exports = { AdminBookTicketController, AdminBookingsController, AdminEditTicketController, AdminDeleteBookingController }