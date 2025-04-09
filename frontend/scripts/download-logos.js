const https = require('https');
const fs = require('fs');
const path = require('path');

const logoUrls = {
  'mgen': 'https://upload.wikimedia.org/wikipedia/fr/thumb/9/9f/Logo_MGEN_2021.svg/1200px-Logo_MGEN_2021.svg.png',
  'harmonie': 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f8/Logo_Harmonie_Mutuelle.svg/1200px-Logo_Harmonie_Mutuelle.svg.png',
  'malakoff': 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/7f/Logo_Malakoff_Humanis.svg/1200px-Logo_Malakoff_Humanis.svg.png',
  'ag2r': 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/5c/Logo_AG2R_La_Mondiale.svg/1200px-Logo_AG2R_La_Mondiale.svg.png',
  'axa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/AXA_Logo.svg/1200px-AXA_Logo.svg.png',
  'swiss-life': 'https://upload.wikimedia.org/wikipedia/fr/thumb/9/9b/Logo_Swiss_Life.svg/1200px-Logo_Swiss_Life.svg.png',
  'allianz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Allianz_logo.svg/1200px-Allianz_logo.svg.png',
  'maaf': 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/7f/Logo_MAAF.svg/1200px-Logo_MAAF.svg.png',
  'gmf': 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/53/Logo_GMF.svg/1200px-Logo_GMF.svg.png',
  'macif': 'https://upload.wikimedia.org/wikipedia/fr/thumb/1/1a/Logo_MACIF.svg/1200px-Logo_MACIF.svg.png',
  'generali': 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/7f/Logo_Generali.svg/1200px-Logo_Generali.svg.png',
  'april': 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/3a/Logo_April.svg/1200px-Logo_April.svg.png',
  'lelynx': 'https://www.lelynx.fr/images/logo.png'
};

const downloadLogo = (name, url) => {
  const logoPath = path.join(__dirname, '..', 'public', 'logos', `${name}.png`);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const file = fs.createWriteStream(logoPath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${name} logo`);
      });
    } else {
      console.error(`Failed to download ${name} logo: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${name} logo:`, err.message);
  });
};

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Download all logos
Object.entries(logoUrls).forEach(([name, url]) => {
  downloadLogo(name, url);
}); 