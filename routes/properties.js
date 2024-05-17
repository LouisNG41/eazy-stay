const express = require("express");
const router = express.Router();
const con = require("../config/connection");

router.get("/", (req, res) => {
  const query = "SELECT * from Logement;";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/add-property", (req, res) => {
  const property = req.body;
  const owner = property.owner.split(";");
  const ownerName = owner[0];
  const ownerAddress = owner[1];
  const propertyAddress = property.propertyAddress;
  const propertyType = property.propertyType;
  const city = property.city;
  const nbRooms = property.nbRooms;
  const surfaceArea = property.surfaceArea;
  const propertyCondition = property.propertyCondition;
  const purpose = property.purpose;
  const price = property.price;
  const availabilityDate = property.availabilityDate;
  const query = `INSERT INTO Logement (nom_proprietaire, adresse_proprietaire, adresse, ville, type, nb_piece, surface, etat, objectif_gestion, prix, date_dispo, dispo) VALUES ("${ownerName}", "${ownerAddress}", "${propertyAddress}", "${city}", "${propertyType}", ${nbRooms}, ${surfaceArea}, "${propertyCondition}", "${purpose}", ${price}, "${availabilityDate}", true);`;
  con.query(query, (err, result) => {
    if (err) throw err;
    console.log("Property registered succesfully");
  });
});

module.exports = router;
