const express = require('express');
const app = express();
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: '172.29.18.112',
  user: 'AccessNodeServerBackDeWish',
  password: 'AccessNodeServerBackDeWish',
  database: 'BDDtest'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('public'));
app.use(express.json());


app.get('/login', (req, res) => {
  res.send('<h1>Bienvenue sur la page de login  </h1>');
});

app.get('/info', (req, res) => {
  res.json({ cle1: 'valeur1', cle2: 'valeur2' });

});
app.get('/user', (req, res) => {
  connection.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.post('/register', (req, res) => {

  connection.query(
    'INSERT INTO User (login, password) VALUES (?,?)',
    [req.body.inputValue, req.body.inputValue2],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID utilisateur :', results.insertId);
      res.json({ message: 'Inscription réussie !', userId: results.insertId });
    }
  )
});





app.get('/Vote', (req, res) => {
  connection.query('SELECT * FROM Vote', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des votes :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});
app.post('/Vote', (req, res) => {
  const inputElecteur = req.body.inputElecteur;
  if (inputElecteur === null) {
    res.status(400).json({ message: 'Erreur : identifiant d\'electeur manquant' });
    return;
  }
  connection.query(
    'INSERT INTO Vote (id_user , id_electeur) VALUES (?,?)',
    [req.body.inputValue, req.body.inputElecteur],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID vote :', results.insertId);
      res.json({ message: 'Vote enregistré !', id_user: results.insertId });
    }
  )
});



app.get('/VoteCount', (req, res) => {
  connection.query('SELECT User.login, COUNT(Vote.id_user) AS voteCount FROM User, Vote WHERE User.id = Vote.id_user GROUP BY User.id ORDER BY voteCount DESC;',
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération du nombre de votes :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      res.json(results);
    })
})

app.post('/connexion', (req, res) => {
  console.log(req.body);
  //on récupère le login et le password
  const { login, password } = req.body;
  connection.query('SELECT * FROM User WHERE login = ? AND password = ?', [login, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification des identifiants :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Identifiants invalides' });
      return;
    }
    // Identifiants valides 
    //renvoi les informations du user
    res.json({ message: 'Connexion réussie !', user: results[0] });
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});


app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});