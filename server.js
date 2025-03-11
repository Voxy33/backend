const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Autorise React à accéder au serveur

const dataFile = "./data.json"; // Fichier où les emails/mots de passe seront stockés

// Route pour enregistrer les données
app.post("/save", (req, res) => {
    const newUser = req.body;

    // Lire le fichier data.json
    fs.readFile(dataFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur serveur" });
        }

        const users = data ? JSON.parse(data).users : [];
        users.push(newUser);

        fs.writeFile(dataFile, JSON.stringify({ users }, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
            }
            res.json({ message: "Utilisateur enregistré !" });
        });
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en ligne sur http://localhost:${PORT}`));
