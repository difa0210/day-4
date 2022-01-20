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

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");

const app = express();
const PORT = 5500;

const db = require("./connection/db");
const upload = require("./middlewares/fileUpload");

app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));
app.use("/upload", express.static(__dirname + "/upload"));

app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(
  session({
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, //Menyimpan data selama 2 jam
      secure: false,
      httpOnly: true,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
);

// let isLogin = true;

function getFullTime(time) {
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

  let monthIndex = time.getMonth();

  let year = time.getFullYear();

  let hours = addZero(time.getHours());

  let minutes = addZero(time.getMinutes());

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
  const query = `SELECT * FROM tb_skills`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      let data = result.rows;
      response.render("index", {isLogin: request.session.isLogin, user: request.session.user, skillCard: data });
    });
  });
});

app.get("/blog", (request, response) => {
  const query = `SELECT tb_blogs.id, tb_blogs.title, tb_blogs.content, tb_blogs.image, tb_user.name AS author, tb_blogs.author_id, tb_blogs."postAt"
    FROM tb_blogs LEFT JOIN tb_user ON tb_blogs.author_id = tb_user.id`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      let rows = result.rows;
      const data = rows.map((blog) => ({
        ...blog,
        isLogin: blog.author_id === request.session?.user?.id ? request.session.isLogin : false,
        postAt: getFullTime(blog.postAt),
        postAtDistance: getDistanceTime(blog.postAt),
      }));
     

      response.render("blog", {
        isLogin: request.session.isLogin,
        user: request.session.user,
        blogs: data,
      });
    });
  });
});

app.post("/blog", upload.single("inputImage"), (request, response) => {
  let data = request.body;
  const authorId = request.session.user.id;
 
  const image = request.file.filename;

  const query = `INSERT INTO tb_blogs(title, content, image, author_id)
  VALUES ('${data.inputTitle}', '${data.inputContent}', '${image}', '${authorId}')`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      response.redirect("/blog");
    });
  });
});

app.get("/blog-detail/:id", (request, response) => {
  const id = request.params.id;

  const query = `SELECT tb_blogs.id, tb_blogs.title, tb_blogs.content, tb_blogs.image, tb_user.name AS author, tb_blogs.author_id, tb_blogs."postAt"
  FROM tb_blogs LEFT JOIN tb_user ON tb_blogs.author_id = tb_user.id WHERE tb_blogs.id = ${id}`;
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      response.render("blog-detail", {
        blog: {
          ...result.rows[0],
          postAt: getFullTime(result.rows[0].postAt),
        },
      });
    });
  });
});

app.get("/edit-blog/:id", (request, response) => {
  const id = request.params.id;
  console.log({ id });
  const query = `SELECT * FROM tb_blogs WHERE id = ${id}`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      response.render("edit-blog", {
        blog: result.rows[0],
      });
    });
  });
});

app.post("/edit-blog/:id", upload.single("inputImage"), (request, response) => {
  let data = request.body;
  let blogId = request.params.id;
  const image = request.file?.filename;
  
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(
      `UPDATE tb_blogs
    SET "title"=$2, "content"=$3, "image"=$4, "postAt"=$5
    WHERE id =$1`,
      [blogId, data.inputTitle, data.inputContent, image, new Date()],
      (errs, result) => {
        if (errs) throw errs;

        response.redirect("/blog");
      }
    );
  });
});

app.get("/delete-blog/:id", (request, response) => {
  if (!request.session.isLogin) {
    request.flash("danger", "Please login!");
    return response.redirect("/login");
  }
  const query = `DELETE FROM tb_blogs WHERE id = ${request.params.id}`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      response.redirect("/blog");
    });
  });
});

app.get("/register", (request, response) => {
  response.render("register");
});

app.post("/register", function (request, response) {
  const { inputName, inputEmail, inputPassword } = request.body;
  const hashedPassword = bcrypt.hashSync(inputPassword, 10);
  const query = `INSERT INTO tb_user(name, email, password) VALUES ('${inputName}', '${inputEmail}', '${hashedPassword}')`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      response.redirect("/login");
    });
  });
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.post("/login", (request, response) => {
  const { inputEmail, inputPassword } = request.body;

  let query = `SELECT * FROM tb_user WHERE email='${inputEmail}'`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (errs, result) => {
      if (errs) throw errs;

      if (result.rows.length == 0) {
        request.flash("danger", "Email yang anda masukkan salah!");

        return response.redirect("/login");
      }
      const isMatch = bcrypt.compareSync(
        inputPassword,
        result.rows[0].password
      );

      if (isMatch) {
        request.session.isLogin = true;
        request.session.user = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
        };
        request.flash("success", "Login Success");
        response.redirect("/blog");
      } else {
        request.flash("danger", "Password yang anda masukkan salah!");
        response.redirect("/login");
      }
    });
  });
});

app.get("/logout", function (request, response) {
  request.session.destroy();
  response.redirect("/blog");
});

app.get("/add-blog", (request, response) => {
  if (!request.session.isLogin) {
    request.flash("danger", "Please Login!");
    response.redirect("/login");
  }

  response.render("add-blog", {
    user: request.session.user,
    isLogin: request.session.isLogin,
  });
});

app.get("/contact", (request, response) => {
  response.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server starting on ${PORT}`);
});
