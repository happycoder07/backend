
function generateRandomAddress() {
    const streets = ['123 Main St', '456 Elm St', '789 Oak Ave'];
    const cities = ['New York', 'Los Angeles', 'Chicago'];
    const states = ['NY', 'CA', 'IL'];
    const postalCodes = ['10001', '90001', '60601'];
    const countries = ['USA', 'Canada', 'UK'];

    const randomIndex = Math.floor(Math.random() * streets.length);

    return {
        street: streets[randomIndex],
        city: cities[randomIndex],
        state: states[randomIndex],
        postalCode: postalCodes[randomIndex],
        country: countries[randomIndex]
    };
}



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as per your project structure
const Address = require('../models/Address'); // Adjust the path as per your project structure

async function createInitialUser() {
    try {
        // Check if the initial user already exists
        const existingUser = await User.findOne({ email: 'test@ashish.com' });

        if (existingUser) {
            console.log('Initial user already exists');
            return;
        }

        // Generate random address
        const randomAddress = generateRandomAddress();

        // Create a new address instance
        const newAddress = new Address(randomAddress);

        // Save the address to get its _id
        await newAddress.save();

        // Create a new user with the generated address
        const newUser = new User({
            name: 'Admin',
            email: 'test@ashish.com',
            password: 'hello', // Remember to hash the password before saving in a real application
            contactNumber: '1234567890',
            profileImage: 'default.jpg',
            address: newAddress._id, // Assign the _id of the saved address
            role: 'admin'
            // Add other fields as necessary
        });

        // Hash password
        //const salt = await bcrypt.genSalt(10);
        const salt= bcrypt.genSaltSync(10) // Generate salt for hashing password
    console.log('   Generated salt:', salt);
        newUser.password = await bcrypt.hash(newUser.password, '$2a$10$XZVtvciIGYz1z/msoli2eu');

        // Save the new user
        await newUser.save();

        console.log('Initial user created successfully');
    } catch (error) {
        console.error('Error creating initial user:', error.message);
    } finally {
        mongoose.connection.close(); // Close the mongoose connection after creating the user
    }
}



// Replace '<db_username>', '<db_password>', '<db_name>' with your actual database credentials and name
const MONGODB_URI = 'mongodb+srv://faltukam567:TcgIdesd4bKG5RO5@mongocluster.8o9t1.mongodb.net/?retryWrites=true&w=majority&appName=mongocluster'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // Call the function to create initial user here
    createInitialUser();
});