const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const contactValidation = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').notEmpty().withMessage('Message is required').trim().escape()
];

router.post('/', contactValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, email, subject, message } = req.body;

    // Simulate email sending (for demo)
    console.log('Contact form submission:', { name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

module.exports = router;