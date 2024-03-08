import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";
import { UserDocument, UserModel } from "../interfaces/modelInterface";

const userSchema = new Schema<UserDocument, UserModel>({
  //user schema for a chat application
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret)
      {
        delete ret.password;
        delete ret.__v;
      }
    },
    toObject: {
      transform: function (_doc, ret)
      {
        delete ret.password;
        delete ret.__v;
      }
    }
  });

userSchema.index({ username: 1, email: 1 });

userSchema.pre("save", async function (next)
{
  //hash the password
  //if the password is not modified, do not hash the password
  if (!this.isModified("password")) return next();

  //hash the password
  this.password = await bcrypt.hash(this.password as string, 12) as any;

  next();
})

userSchema.methods.validatePassword = async function (password: string)
{
  return await bcrypt.compare(password, this.password)
}

//define a static method to check if the user exists
userSchema.statics.userExists = async function (username: string): Promise<UserDocument | null>
{
  const user = await this.findOne({ username });
  return user
}

export default model<UserDocument, UserModel>("User", userSchema);