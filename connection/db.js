// import postgres pool(menyatukan/menggabungkan)
const {Pool} = require("pg")

// Setup connection pool
const dbPool = new Pool({
    host:"ec2-54-172-219-6.compute-1.amazonaws.com",
    database: "d4oepls358bh43",
    port: 5432,
    user: "delqqgubllbvfx",
    password: "b1d3c0a0a9ec45d843cce1f9d3c47b00087da229d9892cd69c37a6d89adb38e6",
});

// export module
module.exports = dbPool

// untuk dipakai di server index.js