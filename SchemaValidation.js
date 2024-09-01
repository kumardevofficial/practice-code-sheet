const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,  // Unique index
    minlength: [4, 'Username must be at least 4 characters long'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  // Unique index
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [100, 'Password cannot exceed 100 characters'],
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age cannot exceed 100'],
    required: [true, 'Age is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number'],
    required: [true, 'Phone number is required'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      match: [/^\d{5}(-\d{4})?$/, 'Please use a valid postal code'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'superadmin'],
    default: ['user'],
  }
});

// Add a custom validation to check if username starts with a letter
UserSchema.path('username').validate(function (value) {
  return /^[a-zA-Z]/.test(value);
}, 'Username must start with a letter');

// Virtual field for full name
UserSchema.virtual('fullName')
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function(v) {
    const parts = v.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  });

module.exports = mongoose.model('User', UserSchema);
