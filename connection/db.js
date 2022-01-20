// import postgres pool(menyatukan/menggabungkan)
const {Pool} = require("pg")

// Setup connection pool
const dbPool = new Pool({
    database: "personal-web",
    port: 5432,
    user: "postgres",
    password: "difa0210",
});

// export module
module.exports = dbPool

// untuk dipakai di server index.js