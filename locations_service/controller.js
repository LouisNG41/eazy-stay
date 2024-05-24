// controller.js
const con = require("../config/connection");
const axios = require("axios");

const getReservations = (req,res) => {
  query = "SELECT * FROM Location;";

  con.query(query, (err, result) => {
    const query = "SELECT * FROM Location";
    con.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).send("Internal server error.");
      }
      res.status(200).send(result);
    });
  });
}

const getPropertyAvailability = (req, res) => {
  const { id, dateDeb, dateFin} = req.query;

  if (!id) {
    return res.status(400).json({ message: "L'id de la propriété est requis." });
  }

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
      // Si résultat alors property pas dispo
      res.status(200).send({ available: false });
    } else {
      // Sinon dispo
      res.status(200).send({ available: true });
    }
  });
};

// Fonction pour valider les dates
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const createReservation = (req, res) => {
  const { idUser, idProperty, dateDeb, dateFin } = req.query;

  if (!idUser || !idProperty || !dateDeb || !dateFin) {
    return res.status(400).json({ message: "Toutes les données sont nécessaires pour créer une réservation." });
  }

  // Valider les dates
  if (!isValidDate(dateDeb) || !isValidDate(dateFin)) {
    return res.status(400).json({ message: "Les dates fournies sont invalides." });
  }

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

const createReservationPropertyWithCritera = async (req, res) => {
  const { type, location, minBudget, maxBudget, idUser, dateDeb, dateFin } = req.query;

  if (!idUser || !dateDeb || !dateFin) {
    return res.status(400).json({ message: "id de l'utilisateur, date de début et date de fin sont nécessaires pour réserver une propriété." });
  }

  try {
    // Appel au service de propriétés pour obtenir les propriétés selon les critères
    const propertiesResponse = await axios.get('http://localhost:8001/properties-filter', {
      params: { type, location, minBudget, maxBudget }
    });

    const properties = propertiesResponse.data;

    if (properties.length === 0) {
      return res.status(404).json({ message: "Aucune propriété disponible ne correspond aux critères de recherche." });
    }

    // Récupérer la première propriété de la liste
    const property = properties[0];
    const idProperty = property.idProperty;

    // On vérifie si le bien est dispo
    try {
      const dispoResponse = await axios.get('http://localhost:8002/checkAvailability', {
        params: { id : idProperty, dateDeb, dateFin }
      });
      isAvailable = dispoResponse.data.available;
    } catch (error) {
      console.error("Erreur lors de la vérification de la disponibilité:", error.stack);
      return res.status(500).json({ message: "Erreur lors de la vérification de la disponibilité." });
    }
    console.log("Disponibilité de la propriété:", isAvailable);

    if (isAvailable) {
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
    } else {
      return res.status(404).json({ message: "La propriété n'est pas disponible pour les dates indiquées." });
    }

  } catch (error) {
    console.error("Erreur lors de la réservation de la propriété:", error.stack);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

module.exports = {
  getReservations,
  getPropertyAvailability,
  createReservation,
  createReservationPropertyWithCritera
  };