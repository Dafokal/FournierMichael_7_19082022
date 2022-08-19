const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFsDpv+piLrkU7ZPNzky5tRS3nnXTPE8oe8uNEeIqaL/Y9rZOgMUWhMs0v91xtOfnra/8ym2t5N1fGqZS2bFXCvfj2ByqIXNMf/uNxlfgsa/joEBCIXo8sltDxjPTzFaMcvYKBKY88EtWFO6T6Hehmm+OaS+7/5NzEAyvkkH7JA3AgMBAAE=');
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('403: Unauthorized request')
    });
  }
};