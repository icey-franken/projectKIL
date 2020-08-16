module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    db: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    iamConfig: {
        iamAccessId: process.env.IAM_ACCESS_ID,
        iamSecret: process.env.IAM_SECRET
    },
    awsConfig: {
        awsAccessId: process.env.AWS_ACCESS_ID,
        awsSecret: process.env.AWS_SECRET,
        awsRegion: process.env.AWS_REGION,
        awsBucket: process.env.AWS_BUCKET
    }
};
