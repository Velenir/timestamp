'use strict';

const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

function timestamp(time) {
  const date = time ? new Date(+time * 1000 || time) : new Date();

  return isNaN(date) ? {unix: null, natural: null} : {
    unix: date.valueOf()/1000,
    natural: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };
}


module.exports.getDate = (event, context, callback) => {
  const datestr = event.pathParameters && decodeURIComponent(event.pathParameters.datestr);

  const date = timestamp(datestr);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(date)
  };

  callback(null, response);
};
