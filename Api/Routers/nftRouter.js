const express = require('express');
const nftController = require("../Controllers/nftController");

const router = express.Router();

router.get("/", nftController.getAllNfts)

router.post("/", nftController.createNft)

router.get("/:id", nftController.getNft)

module.exports = router;