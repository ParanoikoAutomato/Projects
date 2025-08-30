import mongoose from "mongoose";
import Category from "./models/category";
import User from "./models/user";
import { UserRole } from "./enums/UserRole";
import { hashPassword } from "./helpers/auth";

const mongoURI = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    seedDatabase();
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Check if the default category already exists
    const defaultCategory = await Category.findOne({
      name: "Default Category",
    });

    if (!defaultCategory) {
      // If it doesn't exist, create it
      const newDefaultCategory = new Category({
        name: "Default Category",
      });

      await newDefaultCategory.save();
    }

    // USER
    const firstAdmin = await User.findOne({
      username: "vasilis",
    });
    if (!firstAdmin) {
      const hashedPassword = await hashPassword(process.env.FIRST_ADMIN_PASS);
      const newFirstAdmin = new User({
        username: process.env.FIRST_ADMIN_USERNAME,
        firstName: "Valisis",
        lastName: "Papachristou",
        password: hashedPassword,
        role: UserRole.ADMIN,
        approved: true,
      });

      await newFirstAdmin.save();
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

export default connectDB;
