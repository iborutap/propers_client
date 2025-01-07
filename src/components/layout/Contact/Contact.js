import React from 'react';
import './Contact.css'; // Tambahkan file CSS untuk styling

const Contact = () => {
  return (
    <div className='background'>

      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-section">
          {/* Profil Anda */}
          <div className="profile">
            <img
              src="https://instagram.fcgk27-1.fna.fbcdn.net/v/t51.2885-19/464199543_1190481065391299_3544479662565634211_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fcgk27-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2AHPgR6H0qn3wmhTqnr5PRqM5uOJ9IoC2gZcMQA93JV7Q8Kz4jN-WA903zpSjycllac&_nc_ohc=0EWCQ-DqzBQQ7kNvgHPIdYV&_nc_gid=ec3ef66a231e4e208218b2c1a3ed9c44&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYClEBK8vUgChaSNAn7cay35CCnzVHZVaY43Yo7XS1Gs4g&oe=678086D9&_nc_sid=7a9f4b" // Ganti dengan URL gambar Anda
              alt="My Profile"
              className="profile-image"
            />
            <h2>Hamzah</h2>
            <p>@hoamzhh</p>
            <a
              href="https://www.instagram.com/hoamzhh/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Follow
            </a>
          </div>

          {/* Profil Teman */}
          <div className="profile">
            <img
              src="https://instagram.fcgk27-1.fna.fbcdn.net/v/t51.2885-19/462265309_562522032841836_7539723680421710724_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fcgk27-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2AGhAt5xzzLcTioopaGH3y5HQK08BIUZolMrL9gjURuOf5jTIpetTdmY82V2OSCgj-M&_nc_ohc=QtLnpbNW_H4Q7kNvgH7b4UZ&_nc_gid=a3779ee7c5b44293b3cfe626d5cb9844&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYBdsajpvkHSChZyMNn3n68cyh2-Yj8sRKn-3yI2lHiUlQ&oe=67806872&_nc_sid=7a9f4b" // Ganti dengan URL gambar teman Anda
              alt="Friend Profile"
              className="profile-image"
            />
            <h2>Fahmi Pathurrobbi Akmal</h2>
            <p>@iborutap</p>
            <a
              href="https://www.instagram.com/fahmiakm/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Follow
            </a>
          </div>
          <div className="profile">
            <img
              src="https://instagram.fcgk27-2.fna.fbcdn.net/v/t51.2885-19/352236330_777531000538792_7654576850202472154_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fcgk27-2.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AE5ZxhQQSIJwxBMjEhzd2ojuwvld0kEzgDCzEZ2RaCatOJw2bh40xRf8Yd8cZ_mVpo&_nc_ohc=l0XA5koqdywQ7kNvgHZLZs4&_nc_gid=6095ce8d49844e4ba84623ec904378f7&edm=AIhb9MIBAAAA&ccb=7-5&oh=00_AYCpJM0KhYC6CPiH738bepARTqzdt-5862aaXkKENSa21Q&oe=678084B1&_nc_sid=8aafe2" // Ganti dengan URL gambar teman Anda
              alt="Friend Profile"
              className="profile-image"
            />
            <h2>Nathan Ananta</h2>
            <p>@natenobb</p>
            <a
              href="https://www.instagram.com/natenobb/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Follow
            </a>
          </div>
          <div className="profile">
            <img
              src="https://scontent-itm1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-itm1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=AJlEiMstk8wQ7kNvgEiT7pH&_nc_gid=7d3e5e738fb840f7a0ade9d6d62aa98b&edm=AFfzLg8BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5&oh=00_AYA_fwwDihKAl0dJt_yTlzAZ0_eBYZ2cjSECn6evVe5K6g&oe=6780828F&_nc_sid=000456" // Ganti dengan URL gambar teman Anda
              alt="Friend Profile"
              className="profile-image"
            />
            <h2>Satriadi Hakim</h2>
            <p>@satriadihakim</p>
            <a
              href="https://www.instagram.com/satriadihakim/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Follow
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
