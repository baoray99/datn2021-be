const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode;
    // doan decode se lay ra thong tin user, vd trong doan lay token token.sign lay thuoc tinh name
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed!',
    });
  }
};
module.exports = authenticate;
