const express = require('express');
const nftController = require("../Controllers/nftController");

const router = express.Router();

router.get("/", nftController.getAllNfts)

router.post("/", nftController.createNFT)

router.get("/:id", nftController.getNFT)

module.exports = router;