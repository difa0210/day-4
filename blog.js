// Switch case menerima parameter berupa ekspresi yang nanti akan kita evaluasi berdasarkan kondisi yang diinginkan.
// Undefined merupakan tipe data dimana variable yang dideklarasikan belum ada nilai sama sekali atau variable tersebut bernilai undefined (tanpa tanda kutip).
// Null merupakan tipe data dimana nilainya hanya null yang dalam artian "tidak ada".
// Boolean merupakan tipe data dimana nilainya hanya berupa true atau false. Tipe ini sangat berguna ketika kita ingin melakukan seleksi kondisi.
// true merupakan nilai spesial (bukan string maupun number) yang berguna untuk kasus seperti pengecekan tombol fitur aktif atau tidak. 
// String merupakan tipe data primitif yang digunakan untuk menyimpan barisan karakter yang bisa terdiri dari angka, huruf, dan simbol.
// Data primitif merupakan tipe data sederhana yang tidak mempunyai method atau properti dan nilainya tidak dapat diubah setelah dibuat.
// JavaScript merupakan bahasa pemrograman yang dinamis. Artinya, variable dalam JavaScript tidak secara langsung dikaitkan dengan tipe data tertentu, dan variabel apa pun dapat ditetapkan (dan ditetapkan kembali) dengan tipe yang berbeda.
// Keyword `const` dapat digunakan untuk mendeklarasikan sebuah variable yang bersifat konstan, sehingga nilainya yang sudah disimpan tidak bisa diperbarui.
// Karena anonymous function kita perlukan nanti, maka kita perlu menyimpan fungsi tersebut ke dalam sebuah variable. Ini dapat kita disebut sebagai function expression.
// Arrow function merupakan alternatif ringkas (shorthand) dari function expression sebelumnya. Ia tidak memerlukan memerlukan keyword function, melainkan menggunakan simbol => setelah tanda kurung, seperti () =>.
// Mari kita pelajari konsep yang menjelaskan bagaimana variabel melacak hal-hal seperti menambahkan atau mengurangi nilai. Nama konsep tersebut adalah self-assigning variable.
// Penugasan diri (self-assignment) adalah ketika kita menetapkan sebuah variable ke nilainya sendiri.
// Operator increment, ++, ditempatkan setelah nama variable, menambahkan nilainya sebesar 1.
// Hoisting merupakan mekanisme JavaScript dimana seluruh deklarasi variabel dan fungsi dipindahkan ke bagian atas ruang lingkupnya. Hal ini berarti bahwa di mana pun variabel dan fungsi dideklarasikan, mereka dipindahkan ke paling atas cakupannya.
// Variabel yang dideklarasikan dengan keyword let dan const diangkat ke atas blok, namun tidak diinisialisasi.
// Artinya blok kode mengetahui variabel, tetapi tidak dapat digunakan sampai telah dideklarasikan.
// Scope adalah istilah yang digunakan untuk memaksudkan visibilitas variabel. Di JavaScript ada dua jenis scope yaitu global scope, local atau function scope dan block scope.



//  Ketika onSubmit di klik maka addBlog akan dijalankan.
//  1. Kemudian di dalam function addBlog() yang berfungsi sebagai blok kode untuk membungkus suatu proses agar penulisan kode yang sama tidak      //     ditulis secara berulang, dan bisa digunakan berkali-kali dengan menambah atau mengubah argumennya.
//  2. Lalu buat .preventDefault() yang berguna untuk mencegah halaman browser melakukan reload.
//  3. Kemudian buat variabel untuk mengambil inputan nilai dari elemen html menggunakan id.
//  4. Lalu createObjectURL untuk membuat URL pada objek (image) agar bisa ditampilkan.
//     Data yang didapat di encode yang bisa dilihat dari index di console.
//  5. Lalu buat object untuk menampung beberapa data yang menyimpan nilai(property & Key).
//  6. Kemudian buat sebuah array let blogs yang berfungsi hanya untuk menampung seluruh data blog yang di push.
//  7. Kemudian buat method push untuk memasukkan data yang ada di dalam object blog ke blogs.
//  8. Lalu buat looping(pengulangan) untuk menampung pengulangan data dari blogs[i].
//  9. Kemudian buat function untuk merubah content di blog html menggunakan innerHTML yang berfungsi membuat elemen html baru.
// 10. Lalu isi inner html dengan string kosong agar ketika memposting blog baru maka blog yang lama akan hilang.
// 11. Kemudian isi title, content, image, author, PostAt di dalam innerHTML dari data blogs[i] dan blog.html.
// 12. Untuk PostAt blog content, berisikan newDate() yang dipecahkan/diubah formatnya menggunakan function getFullTime.
// 13. Untuk PostAt jarak waktu postBlog dan waktu sekarang, berisikan newDate() yang diubah formatnya menggunakan function getDistanceTime.
// 14. Terakhir buat setInterval() untuk mengatur jarak eksekusi code renderBlog().



let blogs = []


function addBlog(event) {

    event.preventDefault()

    let title = document.getElementById("input-blog-title").value
    let content = document.getElementById("input-blog-content").value
    let image = document.getElementById("input-blog-image").files

        image = URL.createObjectURL(image[0])
   
    let blog = {
        title: title,
        content: content,
        image: image,
        author: "Hafidzuddin Difa",
        postAt: new Date()
    }
    
    blogs.push(blog)

    console.log(blogs);

    //hanya untuk melihat index blogs di console.
    for (let i = 0; i < blogs.length; i++) {
        console.log(blogs[i]);
    }

    renderBlog()
}


function renderBlog() {
    let contentContainer = document.getElementById("contents")

    contentContainer.innerHTML = ""

    for (let i = 0; i < blogs.length; i++) {

    contentContainer.innerHTML += 
        `<div class="blog-list-item">
            <div class="blog-image">
                <img src=${blogs[i].image} alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Post Blog</button>
                </div>
                <h1>
                    <a href=""blog-detail.html" target="_blank">
                    ${blogs[i].title}
                    </a>
                </h1>
                <div class="detail-blog-content">
                    ${getFullTime(blogs[i].postAt)} | ${blogs[i].author}
                </div>
                <p>
                    "${blogs[i].content}"
                </p>
                <div style="text-align: right;">
                    <span >${getDistanceTime(blogs[i].postAt)}</span>
                </div>
            </div>
        </div>`
    }
}

// Count post blog time untuk menampilkan waktu saat kita memposting blog.
let month = ["January","February","March","April","May","June","July","August","September","October","November","Desember"]

function getFullTime(time) {
    console.log(time);

    function addZero(i) {
        if (i < 10) {i = "0" + i}

        return i;
    }

    let date = time.getDate()
    console.log(date);

    let monthIndex = time.getMonth()
    console.log(month[monthIndex]);

    let year = time.getFullYear()
    console.log(year);

    let hours = addZero(time.getHours())
    console.log(hours);

    let minutes = addZero(time.getMinutes())
    console.log(minutes);

    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
    return fullTime
}

// Untuk mengatur jarak waktu sekarang dan waktu post blog.
function getDistanceTime(time) {

    let timePost = time
    let timeNow = new Date()

    let distance = timeNow - timePost

    let miliSecond = 1000 // 1 Second = 1000 milisecond.
    let secondInHours = 3600 // 1 Hours = 3600 second.
    let hoursInDay = 23 // 1 Day = 23 Hours because if you write 24, 24 = 00.
    let minutes = 60
    let second = 60

    let distanceDay = Math.floor (distance / (miliSecond * secondInHours * hoursInDay)) // menampilkan hari.
    let distanceHours = Math.floor (distance / (miliSecond * minutes * second)) // menampilkan jam.
    let distanceMinutes = Math.floor (distance / (miliSecond * minutes)) // menampilkan menit.
    let distanceSeconds = Math.floor (distance / miliSecond) // menampilkan detik.

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
//Untuk mengatur jarak eksekusi code yang sudah ditentukan
setInterval(() => {
    renderBlog()
}, 5000)