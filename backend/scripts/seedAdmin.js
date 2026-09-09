const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be added to the .env file"
      );
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log(`Admin account already exists: ${email}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    console.log("Admin account created successfully");
    console.log(`Admin ID: ${admin._id}`);
    console.log(`Admin email: ${admin.email}`);

    process.exit(0);
  } catch (error) {
    console.error(`Admin creation failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();