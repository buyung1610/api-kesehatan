const fs = require("fs");
const path = require("path");
const Article = require("../modules/articles/articles.model");
const User = require("../modules/auth/user.model");
const bcrypt = require("bcrypt");

async function seedArticles() {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  await User.deleteMany({ username: { $in: ["beni", "edo"] } });

  const hashedPasswordBeni = await bcrypt.hash("passwordBeni2", 10);
  const hashedPasswordEdo = await bcrypt.hash("passwordEdo2", 10);

  const users = await User.insertMany([
    {
      name: "Beni",
      username: "beni",
      password: hashedPasswordBeni,
    },
    {
      name: "Edo",
      username: "edo",
      password: hashedPasswordEdo,
    },
  ]);

  const blogs = [
    // Artikel Kesehatan
    {
      userId: users[0]._id,
      image: "minum-air-putih.jpg",
      title: "Pentingnya Minum Air Putih yang Cukup Setiap Hari",
      date: "2022-09-12",
      category: "Gaya Hidup Sehat",
      description: `Air putih memiliki peran penting dalam menjaga keseimbangan cairan tubuh dan mendukung fungsi organ vital seperti ginjal, jantung, dan otak. Tubuh manusia sebagian besar terdiri dari air, sehingga kebutuhan cairan harus terpenuhi agar sistem tubuh dapat bekerja dengan optimal. Kekurangan cairan dapat menyebabkan dehidrasi yang ditandai dengan pusing, kelelahan, kulit kering, dan menurunnya konsentrasi.
        \nSelain menjaga fungsi organ, air putih juga membantu proses metabolisme dan pembuangan racun dari dalam tubuh. Ginjal memerlukan cukup cairan untuk menyaring limbah dan mengeluarkannya melalui urin. Hidrasi yang baik juga berperan dalam menjaga suhu tubuh tetap stabil, terutama saat beraktivitas fisik atau berada di lingkungan yang panas.
        \nKebiasaan minum air putih yang cukup setiap hari dapat meningkatkan energi, menjaga kesehatan kulit, serta membantu mengontrol nafsu makan. Disarankan untuk mengonsumsi minimal delapan gelas air per hari, namun kebutuhan ini dapat berbeda tergantung aktivitas, kondisi kesehatan, dan cuaca. Membiasakan diri membawa botol minum dapat menjadi langkah sederhana untuk menjaga hidrasi sepanjang hari.`,
    },
    {
      userId: users[0]._id,
      image: "manfaat-olahraga-pagi.jpg",
      title: "Manfaat Olahraga Ringan di Pagi Hari",
      date: "2022-10-14",
      category: "Kebugaran",
      description: `Olahraga ringan di pagi hari merupakan kebiasaan sehat yang dapat memberikan banyak manfaat bagi tubuh. Aktivitas seperti berjalan kaki, peregangan, atau bersepeda santai membantu melancarkan peredaran darah dan meningkatkan suplai oksigen ke seluruh tubuh. Hal ini membuat tubuh terasa lebih segar dan siap menjalani aktivitas harian.
        \nSelain manfaat fisik, olahraga pagi juga berdampak positif pada kesehatan mental. Aktivitas fisik merangsang pelepasan hormon endorfin yang dapat meningkatkan suasana hati dan mengurangi stres. Dengan rutin berolahraga di pagi hari, seseorang dapat merasa lebih rileks, percaya diri, dan fokus dalam menjalani pekerjaan atau belajar.
        \nMelakukan olahraga ringan selama 15–30 menit setiap pagi juga membantu menjaga berat badan ideal dan meningkatkan kualitas tidur. Kebiasaan ini dapat menjadi bagian dari gaya hidup sehat yang mudah diterapkan. Konsistensi adalah kunci untuk merasakan manfaat jangka panjang dari aktivitas fisik yang`,
    },
    {
      userId: users[0]._id,
      image: "menjaga-kesehatan-mata.jpg",
      title: "Tips Menjaga Kesehatan Mata di Era Digital",
      date: "2022-10-06",
      category: "Kesehatan Mata",
      description: `Di era digital, penggunaan perangkat elektronik seperti smartphone, komputer, dan tablet menjadi bagian dari kehidupan sehari-hari. Paparan layar yang terlalu lama dapat menyebabkan ketegangan mata digital, yang ditandai dengan mata kering, penglihatan kabur, dan sakit kepala. Kondisi ini terjadi karena mata terus-menerus fokus pada jarak dekat tanpa istirahat yang cukup.
        \nSalah satu cara efektif untuk menjaga kesehatan mata adalah dengan menerapkan aturan 20-20-20. Setiap 20 menit menatap layar, alihkan pandangan ke objek sejauh 20 kaki selama 20 detik untuk memberi waktu istirahat bagi otot mata. Selain itu, penting untuk mengatur kecerahan layar sesuai pencahayaan ruangan dan menjaga jarak pandang yang ideal.
        \nKonsumsi makanan yang kaya vitamin A dan antioksidan, seperti wortel, bayam, dan ikan, juga dapat membantu menjaga kesehatan mata. Mengurangi penggunaan gadget sebelum tidur dapat mencegah kelelahan mata dan membantu meningkatkan kualitas tidur. Dengan kebiasaan yang tepat, kesehatan mata dapat tetap terjaga meskipun sering menggunakan perangkat digital.`,
    },
    {
      userId: users[0]._id,
      image: "pola-tidur-sehat.jpg",
      title: "Pola Tidur Sehat untuk Produktivitas Maksimal",
      date: "2022-11-17",
      category: "Kesehatan Mental",
      description: `Tidur yang berkualitas merupakan kebutuhan dasar yang penting bagi kesehatan tubuh dan keseimbangan mental. Saat tidur, tubuh melakukan proses pemulihan, memperbaiki sel yang rusak, serta memperkuat sistem imun. Kurang tidur dapat menyebabkan kelelahan, penurunan konsentrasi, dan gangguan suasana hati.
        \nKebiasaan tidur yang tidak teratur juga dapat meningkatkan risiko penyakit kronis seperti hipertensi, diabetes, dan obesitas. Oleh karena itu, penting untuk memiliki jadwal tidur yang konsisten setiap hari. Menciptakan lingkungan tidur yang nyaman, gelap, dan tenang dapat membantu tubuh lebih mudah beristirahat.
        \nMenghindari penggunaan gadget sebelum tidur juga sangat disarankan karena cahaya biru dapat mengganggu produksi hormon melatonin. Orang dewasa dianjurkan tidur selama 7–9 jam setiap malam untuk menjaga kesehatan dan produktivitas. Dengan tidur yang cukup, tubuh akan lebih siap menghadapi aktivitas keesokan harinya.`,
    },
    {
      userId: users[0]._id,
      image: "pentingnya-sarapan-seimbang.jpg",
      title: "Pentingnya Sarapan Seimbang Setiap Pagi",
      date: "2022-10-16",
      category: "Nutrisi",
      description: `Sarapan merupakan sumber energi pertama bagi tubuh setelah berpuasa semalaman. Mengonsumsi sarapan yang sehat dan seimbang dapat membantu menjaga kadar gula darah tetap stabil serta meningkatkan konsentrasi. Tanpa sarapan, tubuh cenderung merasa lemas dan sulit fokus saat beraktivitas.
        \nMenu sarapan yang baik sebaiknya mengandung karbohidrat kompleks, protein, serat, dan lemak sehat. Contohnya adalah oatmeal dengan buah, roti gandum dengan telur, atau yogurt dengan granola. Kombinasi nutrisi ini membantu memberikan energi yang tahan lama dan mendukung fungsi otak.
        \nMembiasakan sarapan setiap pagi juga dapat membantu mengontrol nafsu makan sepanjang hari. Orang yang rutin sarapan cenderung memiliki pola makan yang lebih sehat dan risiko obesitas yang lebih rendah. Dengan memilih menu yang tepat, sarapan dapat menjadi langkah awal menuju gaya hidup sehat.`,
    },
    {
      userId: users[1]._id,
      image: "mengelola-stres.jpg",
      title: "Cara Mengelola Stres dengan Teknik Pernapasan",
      date: "2022-10-01",
      category: "Kesehatan Mental",
      description: `Stres merupakan respons alami tubuh terhadap tekanan atau tantangan dalam kehidupan sehari-hari. Namun, stres yang berkepanjangan dapat berdampak buruk bagi kesehatan fisik dan mental, seperti gangguan tidur, menurunnya sistem imun, dan meningkatnya risiko penyakit jantung. Oleh karena itu, penting untuk mengelola stres dengan cara yang sehat.
        \nSalah satu metode yang efektif dan mudah dilakukan adalah teknik pernapasan dalam. Teknik ini membantu menenangkan sistem saraf, menurunkan detak jantung, dan mengurangi ketegangan otot. Pernapasan yang teratur juga membantu meningkatkan suplai oksigen ke otak sehingga pikiran menjadi lebih jernih.
        \nMetode pernapasan 4-7-8 dapat dicoba sebagai latihan sederhana untuk meredakan stres. Tarik napas selama 4 detik, tahan selama 7 detik, lalu hembuskan perlahan selama 8 detik. Dengan latihan rutin, teknik ini dapat membantu meningkatkan ketenangan dan kualitas hidup secara keseluruhan.`,
    },
    {
      userId: users[1]._id,
      image: "bahaya-duduk-terlalu-lama.jpg",
      title: "Bahaya Duduk Terlalu Lama bagi Kesehatan",
      date: "2022-10-04",
      category: "Gaya Hidup Sehat",
      description: `Gaya hidup modern membuat banyak orang menghabiskan waktu berjam-jam dalam posisi duduk, terutama saat bekerja di depan komputer. Duduk terlalu lama dapat memperlambat metabolisme tubuh dan menyebabkan penumpukan lemak. Kondisi ini meningkatkan risiko obesitas dan gangguan kesehatan lainnya.
        \nSelain itu, duduk dalam waktu lama dapat menyebabkan nyeri punggung, leher, dan bahu akibat postur tubuh yang kurang baik. Sirkulasi darah juga dapat terganggu, yang berpotensi meningkatkan risiko penyakit jantung dan pembekuan darah. Dampak ini sering kali tidak disadari hingga menimbulkan keluhan serius.
        \nUntuk mengurangi risiko tersebut, disarankan untuk berdiri dan melakukan peregangan setiap 30–60 menit. Menggunakan meja kerja yang dapat diatur ketinggiannya dan rutin berjalan kaki juga dapat membantu. Perubahan kecil dalam rutinitas harian dapat memberikan manfaat besar bagi kesehatan jangka panjang.`,
    },
    {
      userId: users[1]._id,
      image: "manfaat-konsumsi-buah-dan-sayur.jpg",
      title: "Manfaat Konsumsi Buah dan Sayur Setiap Hari",
      date: "2022-09-20",
      category: "Nutrisi",
      description: `Buah dan sayur merupakan sumber nutrisi penting yang kaya akan vitamin, mineral, serat, dan antioksidan. Nutrisi ini berperan dalam menjaga sistem kekebalan tubuh dan membantu tubuh melawan infeksi. Konsumsi buah dan sayur secara rutin juga dapat meningkatkan energi dan menjaga kesehatan kulit.
        \nSerat dalam sayuran hijau membantu melancarkan sistem pencernaan dan menjaga keseimbangan bakteri baik dalam usus. Antioksidan dalam buah-buahan seperti jeruk dan apel membantu melawan radikal bebas yang dapat merusak sel tubuh. Kombinasi nutrisi ini berperan penting dalam mencegah berbagai penyakit kronis.
        \nDisarankan untuk mengonsumsi setidaknya lima porsi buah dan sayur setiap hari. Variasikan jenis dan warna buah serta sayuran untuk mendapatkan manfaat nutrisi yang beragam. Dengan kebiasaan ini, tubuh akan lebih sehat dan terlindungi dari berbagai penyakit.`,
    },
    {
      userId: users[1]._id,
      image: "menjaga-kesehatan-jantung.jpg",
      title: "Pentingnya Menjaga Kesehatan Jantung Sejak Dini",
      date: "2022-10-25",
      category: "Penyakit & Pencegahan",
      description: `Jantung merupakan organ vital yang berfungsi memompa darah dan oksigen ke seluruh tubuh. Menjaga kesehatan jantung sejak dini sangat penting untuk mencegah penyakit kardiovaskular di masa depan. Gaya hidup tidak sehat seperti merokok, kurang olahraga, dan konsumsi makanan tinggi lemak dapat meningkatkan risiko gangguan jantung.
        \nPola makan sehat yang kaya serat, rendah lemak jenuh, dan rendah garam dapat membantu menjaga kesehatan jantung. Selain itu, aktivitas fisik yang teratur dapat memperkuat otot jantung dan meningkatkan sirkulasi darah. Mengelola stres juga penting karena stres berlebih dapat memengaruhi tekanan darah.
        \nPemeriksaan kesehatan secara berkala dapat membantu mendeteksi risiko penyakit jantung lebih awal. Dengan menerapkan gaya hidup sehat dan kebiasaan yang baik, kesehatan jantung dapat terjaga hingga usia lanjut. Pencegahan sejak dini adalah langkah terbaik untuk hidup yang lebih sehat.`,
    },
    {
      userId: users[1]._id,
      image: "menjaga-sistem-imun.jpg",
      title: "Cara Menjaga Sistem Imun Agar Tetap Kuat",
      date: "2022-10-27",
      category: "Imunitas",
      description: `Sistem imun berfungsi melindungi tubuh dari serangan bakteri, virus, dan patogen lainnya. Sistem kekebalan yang kuat membantu tubuh melawan infeksi dan mempercepat proses pemulihan saat sakit. Oleh karena itu, menjaga sistem imun merupakan bagian penting dari gaya hidup sehat.
        \nKonsumsi makanan bergizi yang kaya vitamin C, vitamin D, zinc, dan protein sangat penting untuk meningkatkan daya tahan tubuh. Tidur yang cukup dan olahraga teratur juga berperan dalam memperkuat sistem imun. Selain itu, menjaga kebersihan diri seperti mencuci tangan secara rutin dapat mencegah penyebaran penyakit.
        \nMengelola stres dan menjaga kesehatan mental juga berpengaruh terhadap sistem kekebalan tubuh. Stres berkepanjangan dapat menurunkan respons imun dan membuat tubuh lebih rentan terhadap penyakit. Dengan menerapkan pola hidup sehat secara konsisten, tubuh akan lebih siap melawan berbagai ancaman kesehatan.`,
    },
  ];

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return console.error("Gagal membaca folder:", err);
    }

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Gagal menghapus file ${file}:`, err);
        } else {
          console.log(`File ${file} berhasil dihapus`);
        }
      });
    });
  });

  const result = await Article.deleteMany({});
  console.log(`Semua artikel berhasil dihapus. Total: ${result.deletedCount}`);

  for (const b of blogs) {
    const defaultPath = path.join(__dirname, "../default_images", b.image);

    const formattedName = `${Date.now()}-${b.image}`;
    const uploadPath = path.join(uploadDir, formattedName);

    fs.copyFileSync(defaultPath, uploadPath);

    await Article.create({
      ...b,
      image: formattedName,
    });
  }

  console.log("Seeder artikel default berhasil dijalankan");
}

module.exports = seedArticles;
