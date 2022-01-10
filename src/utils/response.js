function errorRes(res, err, errMsg = 'failed operation', statusCode = 500) {
  console.error('ERROR:', err);
  return res.status(statusCode).json({ ok: false, error: errMsg });
}

function successRes(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ ok: true, data, message: 'success' });
}

function errData(res, errMsg = 'failed operation') {
  return (err, data) => {
    if (err) return errorRes(res, err, errMsg);
    return successRes(res, data);
  };
}

module.exports = { errorRes, successRes, errData };
