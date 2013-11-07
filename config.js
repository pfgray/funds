var config = {}

config.couch = {};
config.web = {};

config.couch.port = 5984;
config.couch.host = '192.168.1.150';

config.web.port = process.env.WEB_PORT || 1337;
config.web.secure_port = process.env.SECURE_WEB_PORT || 1338;

module.exports = config;