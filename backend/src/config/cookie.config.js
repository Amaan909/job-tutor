const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: ONE_DAY_MS,
};

module.exports = { cookieOptions, ONE_DAY_MS };
