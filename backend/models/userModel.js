import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config()

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() { return !this.googleId && !this.githubId; }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // debateCount: {
  //   type: Number,
  //   default: 0,
  // },
  // debateCountAi: {
  //   type: Number,
  //   default: 0,
  // },
  // debateCountFriend: {
  //   type: Number,
  //   default: 0,
  // },
  // debateHeadings: {
  //   type: [String],
  //   default: [],
  // },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  analytics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analytics'
  }
});


userSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_NO))
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User", userSchema);



export default User;
