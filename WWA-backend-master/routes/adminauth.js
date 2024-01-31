// routes/adminauth.js
const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const { AdminSignupController, AdminLoginController, AdminLogoutController, AdminForgotController } = require('../controllers/adminAuthController');
const { AdminBookTicketController, AdminBookingsController, AdminEditTicketController, AdminDeleteBookingController } = require('../controllers/adminBookingController');
require('../db/conn');
const adminMail = process.env.ADMIN_MAIL;


// ADmin Signup route
/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Register a new admin user.
 *     description: Register a new admin user with the provided details.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Admin's first name.
 *               lastname:
 *                 type: string
 *                 description: Admin's last name.
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *               cpassword:
 *                 type: string
 *                 description: Confirm password.
 *     responses:
 *       201:
 *         description: Admin user registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       400:
 *         description: User with the provided email already exists.
 *         content:
 *           application/json:
 *             example:
 *               message: User already exists
 *       422:
 *         description: Incomplete or invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               message: please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/signup', AdminSignupController);

// Admin Login route
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login.
 *     description: Authenticate and log in an admin user.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *     responses:
 *       200:
 *         description: Admin login successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Login Succesful
 *       400:
 *         description: Invalid credentials or admin email not recognized.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid Credentials
 *       422:
 *         description: Incomplete or invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/login', AdminLoginController);

//admin/forgotpassword route
/**
 * @swagger
 * /admin/forgotpassword:
 *   post:
 *     summary: Admin forgot password.
 *     description: Reset the password for an admin user.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: New password.
 *               cpassword:
 *                 type: string
 *                 description: Confirm password.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password changed successfully
 *       400:
 *         description: Admin not found or invalid email.
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Not Found
 *       422:
 *         description: Incomplete or invalid request body or passwords do not match.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/forgotpassword', AdminForgotController);

//admin/logout route
/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Admin logout.
 *     description: Logout the admin user and clear the authentication token.
 *     tags:
 *       - Admin Authentication
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Logout successful
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/logout', AdminLogoutController);




//admin/authentication route
/**
 * @swagger
 * /admin/authenticate:
 *   post:
 *     summary: Authenticate admin.
 *     description: Secure route to verify admin authentication.
 *     tags:
 *       - Admin Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Secure route accessed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Secure route accessed successfully!
 *               email: admin@example.com
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 */
router.post('/admin/authenticate', Authenticate, (req, res) => {
    const email = req.email;
    if (email != adminMail) {
        return res.status(401).json({ message: 'Unautherized' });
    }
    res.json({ message: 'Secure route accessed successfully!', email: email });
});




//admin/bookticket Route
/**
 * @swagger
 * /admin/bookticket:
 *   post:
 *     summary: Book tickets for admin.
 *     description: Route to book tickets by admin.
 *     tags:
 *       - Admin Booking
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userDetails:
 *               name: John Doe
 *               email: john@example.com
 *               address: 123 Main St
 *               contact: 1234567890
 *               date: 2023-12-31
 *               adult: 2
 *               children: 1
 *             selectedAdventures:
 *               adventure1: true
 *               adventure2: false
 *     responses:
 *       201:
 *         description: Booking successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking successfully
 *               bookingnumber: WWA10001
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/bookticket', AdminBookTicketController);

//admin/mybookings Route
/**
 * @swagger
 * /admin/mybookings:
 *   post:
 *     summary: Get bookings for admin.
 *     description: Route to retrieve bookings for admin.
 *     tags:
 *       - Admin Booking
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: admin@example.com
 *     responses:
 *       200:
 *         description: Bookings found.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Found
 *               bookings:
 *                 - booking1
 *                 - booking2
 *       400:
 *         description: Unauthorized or No bookings found.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized or No Bookings yet
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: No booking for this Email
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/admin/mybookings", AdminBookingsController);

//admin/editbooking Route
/**
 * @swagger
 * /admin/editticket:
 *   post:
 *     summary: Edit a booking for admin.
 *     description: Route to edit a booking for admin.
 *     tags:
 *       - Admin Booking
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             user:
 *               name: John Doe
 *               email: john@example.com
 *               address: 123 Main St
 *               contact: +1234567890
 *               date: '2023-01-01'
 *               adult: 2
 *               children: 1
 *             booking:
 *               bookingnumber: WWA10001
 *     responses:
 *       200:
 *         description: Booking update successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Update Successful
 *       400:
 *         description: Validation error or Invalid booking details.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields or Select at least one Visitor
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/admin/editticket", AdminEditTicketController);

// Admin Delete Booking
/**
 * @swagger
 * /admin/deletebooking:
 *   post:
 *     summary: Delete a booking for admin.
 *     description: Route to delete a booking for admin.
 *     tags:
 *       - Admin Booking
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             booking:
 *               bookingnumber: WWA10001
 *               park: Adventure Park
 *               adventure: Roller Coaster
 *     responses:
 *       200:
 *         description: Booking deletion successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Delete Successful
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/deletebooking', AdminDeleteBookingController);



module.exports = router;
