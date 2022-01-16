// Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser.

// Node Package Manager (NPM) adalah sebuah tools yang otomatis terinstal jika anda menginstal Node JS. Manfaat dari NPM ini adalah untuk menginstal modul/library – library yang dimiliki Node JS dan juga untuk menjalankan script pada command line.

// Express JS adalah salah satu framework dari NodeJS yang digunakan untuk membangun aplikasi dari sisi back end secara efektif dan optimal.
// Express.js untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server.

// Routing adalah metode yang digunakan website (server) untuk merespons permintaan dari browser (client).

// Cara kerja routing di Express.js adalah dengan sebuah metode bernama app. Metode tersebut akan merespons setiap permintaan berbentuk HTTP. Misalnya GET, POST, PUT, dan DELETE. ( app.get('/', (req, res) => res.send('Hello World!')); )

// Express Handlebars biasa disebut juga HBS, adalah package node js yang memudahkan setiap web developer untuk mengirim data dari backend (server) ke frontend (client). Cara kerja dari HBS adalah Seluruh logika (function) yang ingin ditampilkan di halaman web dibungkus dalam sebuah object json. Kemudian HBS tinggal memanggil data tersebut dengan kurung kurawal seperti ini {{ }} dimana didalamnya berisi key json yang berisi function yang sudah dibuat sebelumnya diserver.

// Method POST data yang dikirim tidak terbatas. Sedangkan method GET tidak boleh lebih dari 2047 karakter.

// Buat variable untuk menampung express yang sudah di install.
// Buat variable untuk menampung variable express(), express function dan variable untuk PORT.
// Buat variable untuk memuat file connection yang nantinya akan menghubungkan ke postgresSQL
// Buat routing express menggunakan app. method yang berfungsi untuk merespon setiap permintaan berbentuk http.
// Lalu buat get() yang berfungsi untuk menampilkan data pada URLnya, kemudian akan ditampung oleh action.
// Di dalam parameter get()/post() isi ("name file URL", function("yang berisi 2 param untuk meminta dan merespon")).
//
// Listen berfungsi untuk menjalankan routing yang didalamnya terdapat 2 param yang berisi port dan function() untuk memberikan aksi.

// Untuk menggunakan modul "express" di dalam node.modules
const express = require("express");

// Method app, untuk merespon setiap permintaan berbentuk HTTP, seperti GET, POST, PUT, & Delete
const app = express();
const PORT = 4500;
// Untuk mengoneksikan ke postgressql database
const db = require("./connection/db");

app.set("view engine", "hbs"); // Set template engine (hbs)

// Static Files adalah file yang dapat diunduh oleh client dari server, contohnya gambar, file CSS, dan file JavaScript.
app.use("/public", express.static(__dirname + "/public")); // set public folder/path untuk menampilkan gambar & css

//urlencode, agar code dari params dikonversi menjadi string dan terbaca didalam console
app.use(express.urlencoded({ extended: false }));

let isLogin = true;

// Format waktu
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

// method GET akan menampilkan data/nilai pada URL, kemudian akan ditampung oleh action.
app.get("/", function (request, response) {
  response.render("index");
});

app.get("/blog", function (request, response) {
  // Koneksi ke database
  db.connect(function (err, client, done) {
    // Jika error maka tampilkan error
    if (err) throw err;
    // Query untuk mendapatkan data dari database table tb_blogs
    client.query(
      "SELECT * FROM tb_blogs ORDER BY id ASC",
      function (errs, result) {
        if (errs) throw errs;

        let rows = result.rows;

        // Fungsi map ini digunakan untuk mengolah setiap element di array/object dan kemudian menghasilkan array/object baru
        const data = rows.map((blog) => ({
          ...blog,
          isLogin,
          postAt: getFullTime(blog.postAt),
          postAtDistance: getDistanceTime(blog.postAt),
        }));
        // Merender halaman blog dengan melempar data blogs
        response.render("blog", { isLogin, blogs: data });
      }
    );
  });
});

app.get("/blog-detail/:id", function (request, response) {
  let blogId = request.params.id;

  db.connect(function (err, client, done) {
    if (err) throw err;
      // Query untuk mendapatkan data dari database table tb_blogs berdasarkan idnya
    client.query(
      `SELECT * FROM tb_blogs WHERE id = $1`,
      [blogId],
      function (errs, result) {
        if (errs) throw errs;

        // Render, untuk menjalankan
        response.render("blog-detail", { blog: result.rows[0] });
      }
    );
  });
});
// routing halaman add blog
app.get("/add-blog", function (request, response) {
  response.render("add-blog");
});

// Method POST akan mengirimkan data atau nilai langsung ke action untuk ditampung, tanpa menampilkan pada URL.
app.post("/blog", function (request, response) {
  let data = request.body;

  db.connect(function (err, client, done) {
    if (err) throw err;

    // Query untuk memasukkan data baru ke database table tb_blogs
    client.query(
      `INSERT INTO tb_blogs(title, content, author, image) VALUES ($1, $2, $3, $4)`,
      [data.inputTitle, data.inputContent, "Difa Hafidzuddin", data.inputImage],
      function (errs, result) {

        if (errs) throw errs;

        // Render, untuk menampilkan
        response.redirect("/blog");
      }
    );
  });
});

app.get("/edit-blog/:id", function (request, response) {
  let blogId = request.params.id;

  db.connect(function (err, client, done) {
    if (err) throw err;
    // Query untuk mendapatkan data dari database table tb_blogs berdasarkan idnya
    client.query(
      `SELECT * FROM tb_blogs WHERE id = $1`,
      [blogId],
      function (errs, result) {
        if (errs) throw errs;

        response.render("edit-blog", {
          // result hasil dari query, rows jadi hanya menampilkan rows dari database
          blog: result.rows[0],
        });
      }
    );
  });
});

app.post("/edit-blog/:id", function (request, response) {
  // Mengubah isi dari blog berdasarkan indexnya, lalu setelah di klik submit, maka akan ke halaman blog.
  let blogId = request.params.id;
  let { inputTitle, inputContent, inputImage } = request.body;

  db.connect(function (err, client, done) {
    if (err) throw err;

    // Query untuk merubah data berdasarkan idnya di database table tb_blogs
    client.query(
      `UPDATE tb_blogs SET title=$2, content=$3, image=$4 WHERE id = $1`,
      [blogId, inputTitle, inputContent, inputImage],
      function (errs, result) {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/delete-blog/:id", function (request, response) {
  let blogId = request.params.id;

  db.connect(function (err, client, done) {
    if (err) throw err;

    // Query untuk menghapus data berdasarkan idnya di database table tb_blogs
    client.query(
      `DELETE FROM tb_blogs  WHERE id = $1`,
      [blogId],
      function (errs, result) {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/contact", function (request, response) {
  response.render("contact");
});

// Listen untuk menjalankan routing
app.listen(PORT, function () {
  console.log(`Server starting on ${PORT}`);
});
