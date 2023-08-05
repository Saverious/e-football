const{ transports, createLogger, format } = require('winston');

exports.logging = createLogger({
    transports:[
        new transports.Console({
            level:'info',
            format:format.simple()
        }),
        new transports.Console({
            level:'error',
            format:format.simple()
        })
    ]
});