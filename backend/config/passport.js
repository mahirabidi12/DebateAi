import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user doesn't exist, check if there's an account with the same email
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link account
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a new user
            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            await newUser.save();
            user = newUser;
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        const email = profile.emails && profile.emails[0].value;

        if (!user) {
          if (email) {
            user = await User.findOne({ email: email });
          }
          
          if (user) {
            // Link account
            user.githubId = profile.id;
            await user.save();
          } else {
            // Create new user
            const newUser = new User({
              githubId: profile.id,
              name: profile.displayName || profile.username,
              email: email, // Can be null if private
            });
            await newUser.save();
            user = newUser;
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
