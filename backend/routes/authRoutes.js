// Routes for authentication
const express = require('express');
const { body } = require('express-validator');

const passport = require('passport');
const { registerUser, loginUser, getMe, generateToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

// Get logged-in user
router.get('/me', authMiddleware, getMe);

// Google OAuth - start flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth - callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/google/failure' }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const redirectUrl = `${clientUrl}/oauth-callback?token=${encodeURIComponent(token)}`;
    return res.redirect(redirectUrl);
  }
);

// OAuth failure handler
router.get('/google/failure', (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  return res.redirect(`${clientUrl}/login?error=oauth_failed`);
});

module.exports = router;
