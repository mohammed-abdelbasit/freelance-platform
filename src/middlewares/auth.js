const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.header('token')
    if (!token) {
      res.status(403).send('Access denied.')
      return
    }

    const decoded = await jwt.verify(token, 'SECRET')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Invalid token')
  }
};
