import messages = require("../utils/messages");
import mongoose, { type Model } from "mongoose";
import bcrypt from "bcryptjs";

interface AdminData {
  name: string;
  email: string;
  password: string;
  role: "admin";
  refreshTokenHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AdminMethods {
  comparePassword(password: string): Promise<boolean>;
}

type AdminModel = Model<AdminData, {}, AdminMethods>;

const adminSchema = new mongoose.Schema<AdminData, AdminModel, AdminMethods>(
  {
    name: {
      type: String,
      required: [true, messages.validation.adminNameRequired],
      trim: true,
    },

    email: {
      type: String,
      required: [true, messages.validation.adminEmailRequired],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, messages.validation.passwordRequired],
      minlength: [8, messages.validation.passwordTooShort],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Admin password එක database එකට save කිරීමට පෙර hash කිරීම
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

// Login password එක database password hash එක සමඟ compare කිරීම
adminSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model<AdminData, AdminModel>("Admin", adminSchema);

export = Admin;
