exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://MongoUser01:MongoUser01@ds029665.mlab.com:29665/nodecourse' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;