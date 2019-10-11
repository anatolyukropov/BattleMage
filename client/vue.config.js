module.exports = {
    devServer: {
        // public: 'http://10.98.16.111:8080/',
        public: process.env.NODE_ENV === "development" ?  "http://10.98.16.42:8080" : "http://10.98.16.111:8080",
        host: '0.0.0.0',
    }
}