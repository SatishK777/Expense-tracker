// Passport configuration for Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const avatar = profile.photos?.[0]?.value;

        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });

        if (!user) {
          // Create a secure random password for OAuth users (never used for login)
          const randomPassword = crypto.randomBytes(32).toString('hex');
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(randomPassword, salt);

          user = await User.create({
            name: profile.displayName || 'Google User',
            email,
            password: hashedPassword,
            googleId: profile.id,
            avatar,
          });
        } else if (!user.googleId) {
          // Link existing email account to Google
          user.googleId = profile.id;
          user.avatar = avatar || user.avatar;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
