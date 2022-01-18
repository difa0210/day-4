// Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser.

// Node Package Manager (NPM) adalah sebuah tools yang otomatis terinstal jika anda menginstal Node JS. Manfaat dari NPM ini adalah untuk menginstal modul/library – library yang dimiliki Node JS dan juga untuk menjalankan script pada command line.

// Express JS adalah salah satu framework dari NodeJS yang digunakan untuk membangun aplikasi dari sisi back end secara efektif dan optimal.
// Express.js untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server.

// Routing adalah metode yang digunakan website (server) untuk merespons permintaan dari browser (client).

// Cara kerja routing di Express.js adalah dengan sebuah metode bernama app. Metode tersebut akan merespons setiap permintaan berbentuk HTTP. Misalnya GET, POST, PUT, dan DELETE. ( app.get('/', (req, res) => res.send('Hello World!')); )

// Express Handlebars biasa disebut juga HBS, adalah package node js yang memudahkan setiap web developer untuk mengirim data dari backend (server) ke frontend (client). Cara kerja dari HBS adalah Seluruh logika (function) yang ingin ditampilkan di halaman web dibungkus dalam sebuah object json. Kemudian HBS tinggal memanggil data tersebut dengan kurung kurawal seperti ini {{ }} dimana didalamnya berisi key json yang berisi function yang sudah dibuat sebelumnya diserver.

// Method POST data yang dikirim tidak terbatas. Sedangkan method GET tidak boleh lebih dari 2047 karakter.

// `SELECT * FROM tb_blogs WHERE id = ${blogId}`,
// let data = { ...result.rows[0];
// response.render("blog-detail", { blog: data });

const express = require("express");

const app = express();
const PORT = 5000;

const db = require("./connection/db");

app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

let isLogin = true;

function getFullTime(time) {
  console.log(time);

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ];

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }

    return i;
  }

  let date = time.getDate();
  console.log(date);

  let monthIndex = time.getMonth();
  console.log(month[monthIndex]);

  let year = time.getFullYear();
  console.log(year);

  let hours = addZero(time.getHours());
  console.log(hours);

  let minutes = addZero(time.getMinutes());
  console.log(minutes);

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
  return fullTime;
}
function getDistanceTime(time) {
  let timePost = time;
  let timeNow = new Date();

  let distance = timeNow - timePost;

  let miliSecond = 1000; // 1 Second = 1000 milisecond.
  let secondInHours = 3600; // 1 Hours = 3600 second.
  let hoursInDay = 23; // 1 Day = 23 Hours because if you write 24, 24 = 00.
  let minutes = 60;
  let second = 60;

  let distanceDay = Math.floor(
    distance / (miliSecond * secondInHours * hoursInDay)
  ); // menampilkan hari.
  let distanceHours = Math.floor(distance / (miliSecond * minutes * second)); // menampilkan jam.
  let distanceMinutes = Math.floor(distance / (miliSecond * minutes)); // menampilkan menit.
  let distanceSeconds = Math.floor(distance / miliSecond); // menampilkan detik.

  if (distanceDay >= 1) {
    return `${distanceDay} day ago`;
  } else if (distanceHours >= 1) {
    return `${distanceHours} hours ago`;
  } else if (distanceMinutes >= 1) {
    return `${distanceMinutes} minutes ago`;
  } else {
    return `${distanceSeconds} seconds ago`;
  }
}

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/blog", (request, response) => {
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query("SELECT * FROM tb_blogs ORDER BY id ASC", (errs, result) => {
      if (errs) throw errs;

      let rows = result.rows;
      const data = rows.map((blog) => ({
        ...blog,
        isLogin,
        postAt: getFullTime(blog.postAt),
        postAtDistance: getDistanceTime(blog.postAt),
      }));

      response.render("blog", { isLogin, blogs: data });
    });
  });
});

app.get("/blog-detail/:id", (request, response) => {
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `SELECT * FROM tb_blogs WHERE id = ${request.params.id}`,

      (errs, result) => {
        if (errs) throw errs;

        response.render("blog-detail", {
          blog: {
            ...result.rows[0],
            postAt: getFullTime(result.rows[0].postAt),
          },
        });
      }
    );
  });
});

app.post("/blog", function (request, response) {
  let data = request.body;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `INSERT INTO tb_blogs(title, content, author, image) VALUES ($1, $2, $3, $4)`,
      [data.inputTitle, data.inputContent, "Difa Hafidzuddin", data.inputImage],
      (errs, result) => {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/edit-blog/:id", (request, response) => {
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `SELECT * FROM tb_blogs WHERE id = ${request.params.id}`,

      (errs, result) => {
        if (errs) throw errs;

        response.render("edit-blog", {
          blog: result.rows[0],
        });
      }
    );
  });
});

app.post("/edit-blog/:id", (request, response) => {
  let blogId = request.params.id;
  let data = request.body;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `UPDATE tb_blogs
      SET title=$2, content=$3, image=$4
      WHERE id = $1`,
      [blogId, data.inputTitle, data.inputContent, data.inputImage],
      (errs, result) => {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/delete-blog/:id", (request, response) => {
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `DELETE FROM tb_blogs
      WHERE id = ${request.params.id}`,
      (errs, result) => {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/add-blog", (request, response) => {
  response.render("add-blog");
});

app.get("/contact", (request, response) => {
  response.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server starting on ${PORT}`);
});
