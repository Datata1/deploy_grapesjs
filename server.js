const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Statische Dateien im "grapesjs"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'grapesjs')));

// Route für die Standardseite
app.get('/', (req, res) => {
  // Lies den Inhalt des "my_webpages"-Ordners
  const webpagesFolder = path.join(__dirname, 'grapesjs/my_webpages');
  fs.readdir(webpagesFolder, (err, files) => {
    if (err) {
      console.error('Error reading my_webpages folder:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Filtere nur HTML-Dateien
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    // Generiere eine Liste von Links zu den HTML-Dateien
    const pageLinks = htmlFiles.map(file => `<li><a href="/my_webpages/${file}">${file}</a></li>`).join('');

    // Generiere eine einfache HTML-Seite mit Links zu den Webseiten
    const overviewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webpage Overview</title>
      </head>
      <body>
        <h1>Webpage Overview</h1>
        <ul>${pageLinks}</ul>
		<a href="/admin">Webpage builder</a>
      </body>
      </html>
    `;

    res.send(overviewHTML);
  });
});

// Route für die /admin-Seite
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'grapesjs/demo.html'));
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
