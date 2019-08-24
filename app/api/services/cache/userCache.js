const redis = require("redis");
const client = redis.createClient(6379);

const oneDay = 86400;

exports.check = key => {
  return new Promise((resolve, reject) => {
    client.get(`${key}`, (err, user) => {
      if (err) {
        resolve(null);
      } else {
        resolve(user);
      }
    });
  });
};

exports.set = (key, value) => {
  client.set(`${key}`, value, "EX", oneDay);
};
