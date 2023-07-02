const NFT = require("../Model/nftModel");

const getAllNfts = async (req, res, next) => {
    const nfts = await NFT.find();

    return res.status(200).json({
        status: "success",
        results: nfts.length,
        data: {
            nfts
        }
    });
};


const getNFT = async (req, res, next) => {
    const nft = await NFT.findById(req.params.id);

    return res.status(200).send({
        status: "success",
        data: {
            nft
        }
    });
};


const createNFT = async (req, res, next) => {
    console.log(req.body);
    const newNFT = await NFT.create(req.body);


    return res.status(201).send({
        status: "success",
        data: {
            nft: newNFT
        }
    })
}


module.exports = {
    getAllNfts,
    getNFT,
    createNFT
}

