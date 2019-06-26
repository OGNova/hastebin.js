class ClientError extends require('./InternalError') {
  constructor(status, message) {
    super(status, message);
    console.log(status, message);
  }
}

module.exports = ClientError;