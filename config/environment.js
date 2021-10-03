const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'rahilsingh045@gmail.com',
            pass: 'abhisheksingh'
        }
    },
    google_client_id: '342161031593-10t6b1ss64r4c0v9f7g5v9e596ec4p3q.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: 'nUV7faDzC0n1gvvWVpuvKgZm', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_client_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_client_callbackURL: process.env.CODEIAL_GOOGLE_CLIENT_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);