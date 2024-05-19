// controller.js
const con = require("../config/connection");

const getDispoForProperty = (req, res) => {

  const { id, dateDeb, dateFin} = req.query;
  let query = `SELECT 1 FROM location WHERE idProperty = ${id}`;

  if (dateDeb && dateFin) {
    query += `
      AND (
        (dateDeb <= "${dateDeb}" AND dateFin >= "${dateDeb}")
        OR
        (dateDeb <= "${dateFin}" AND dateFin >= "${dateFin}")
      )
    `;
  }
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    if (result.length > 0) {
      // Si résultat alors propery pas dispo
      res.status(200).send({ available: false });
    } else {
      // Sinon dispo
      res.status(200).send({ available: true });
    }
  });
};

const createReservation = (req, res) => {
  const { idUser, idProperty, dateDeb, dateFin } = req.query;

  // Insérer la réservation dans la base de données
  const query = `INSERT INTO location (idUser, idProperty, dateDeb, dateFin) VALUES ("${idUser}", "${idProperty}", "${dateDeb}", "${dateFin}")`;
  con.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de la réservation:", err.stack);
      return res.status(500).json({ message: "Erreur lors de la création de la réservation." });
    }
    console.log("Réservation ok");
    res.status(200).send("Réservation créée avec succès.");
  });
};

module.exports = {
  getDispoForProperty,
  createReservation
  };