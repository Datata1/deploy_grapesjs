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
    const pageLinks = htmlFiles.map(file => `<li><a class="page-button" href="/my_webpages/${file}">${file}</a></li>`).join('');

    // Generiere eine einfache HTML-Seite mit Links zu den Webseiten
    const overviewHTML = `
		<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>My Webpages Built with GrapesJS</title>
	  <style>
		body {
		  font-family: 'Arial', sans-serif;
		  margin: 0;
		  padding: 0;
		  background-color: #f4f4f4;
		  color: #333;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  height: 100vh;
		}

		h1 {
		  color: #0066cc;
		  font-size: 36px;
		  margin-top: 0;
		}

		.pages-box {
		  background-color: #fff;
		  border: 1px solid #ddd;
		  padding: 20px;
		  border-radius: 8px;
		  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		  margin-bottom: 20px;
		  width: 80%;
		  max-width: 600px;
		  display: flex;
		  flex-wrap: wrap;
		  gap: 10px; /* Abstand zwischen den Links */
		  justify-content: center; /* Änderung hier: Zentrieren der Buttons */
		}

		ul {
		  list-style-type: none;
		  padding: 0;
		  margin: 0;
		  display: flex;
		  flex-wrap: wrap;
		  gap: 10px; /* Abstand zwischen den Links */
		  justify-content: center; /* Änderung hier: Zentrieren der Buttons */
		}

		li {
		  margin-bottom: 10px;
		}

		.page-button {
		  display: inline-block;
		  padding: 10px 20px;
		  width: 250px; /* Feste Breite für alle Buttons */
		  font-size: 16px;
		  background-color: #0066cc;
		  color: #fff;
		  text-decoration: none;
		  border-radius: 5px;
		  transition: background-color 0.3s ease-in-out;
		  text-align: center; /* Zentrieren des Textes */
		}

		.page-button:hover {
		  background-color: #004080;
		}

		.button {
		  display: inline-block;
		  padding: 15px 30px;
		  font-size: 18px;
		  background-color: #0066cc;
		  color: #fff;
		  text-decoration: none;
		  border-radius: 5px;
		  transition: background-color 0.3s ease-in-out;
		}

		.button:hover {
		  background-color: #004080;
		}
	  </style>
	</head>
	<body>
	  <h1>My Webpages</h1>
	  <div class="pages-box">
		<ul>${pageLinks}</ul>
	  </div>
	  <a href="/admin" class="button">GrapesJS - Low-Code Webpage Builder</a>
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
