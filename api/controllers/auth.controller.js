// import User from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;

//   if (
//     !username ||
//     !email ||
//     !password ||
//     username === '' ||
//     email === '' ||
//     password === ''
//   ) {
//     next(errorHandler(400, 'All fields are required'));
//   }

//   const hashedPassword = bcryptjs.hashSync(password, 10);

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     res.json('Signup successful');
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password || email === '' || password === '') {
//     next(errorHandler(400, 'All fields are required'));
//   }

//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorHandler(404, 'User not found'));
//     }
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next(errorHandler(400, 'Invalid password'));
//     }
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

//     const { password: pass, ...rest } = validUser._doc;

//     res
//       .status(200)
//       .cookie('access_token', token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  console.log('Request body:', req.body); // ✅ Debug incoming request body

  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required')); // ✅ Return to stop execution
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'User with this email already exists'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // for HTTPS in production
        sameSite: 'Strict',
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
