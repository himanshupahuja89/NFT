import React, { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";

import { useAddress, useContract, useMetamask, useDisconnect, useSigner } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x428B7512281fC053B8ab39631b5C0023b441AC86");

    const address = useAddress();
    const connect = useMetamask();

    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBalance, setUserBalance] = useState();

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            //user balance 
            const balance = await signer?.getBalance();
            const userBalance = address ? ethers.utils.formatEther(balance?.toString()) : "";
            setUserBalance(userBalance)
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    //Contract function - Image Upload 
    const uploadImage = async (imageInfo) => {
        const { title, description, email, category, image } = imageInfo;
        try {
            //charge 
            const listingPrice = await contract.call("listingPrice");

            const createNFTs = await contract.call("upploadIPFS", [address, image, title, description, email, category], {
                value: listingPrice.toString(),
            });


            //API call
            const response = await axios({
                method: "POST",
                url: `/api/v1/NFTs`,
                data: {
                    title: title,
                    description: description,
                    category: category,
                    image: image,
                    address: address,
                    email: email
                },
            })

            console.log(response);
            console.log("contract call success", createNFTs);
            setLoading(false);
            window.location.reload()
        } catch (err) {
            console.log("contract call failure", err)
        }
    }
    //GET Contract Data 
    const getUploadedImages = async () => {
        //ALL images
        const images = await contract.call("getAllNFTs");

        //TOTAL UPLOAD
        const totalUpload = await contract.call("imagesCount");
        //Listing price 

        const listingPrice = await contract.call("listingPrice");

        const allImages = images.map((images, i) => ({
            owner: images.creator,
            title: images.title,
            description: images.description,
            email: images.email,
            category: images.category,
            fundraised: images.fundraised,
            image: images.image,
            imageId: images.id.toNumber(),
            createdAt: images.timestamp.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber()

        }));
        return allImages;
    }

    // GET IMAGE
    const singleImage = async (id) => {
        try {
            const data = await contract.call("getImage", [id]);
            const image = {
                title: data[0],
                description: data[1],
                email: data[2],
                category: data[3],
                fundraised: ethers.utils.formatEther(data[4]),
                creator: data[5],
                imageURL: data[6],
                createdAt: data[7].toNumber(),
                imageId: data[8].toNumber()

            }

            return image;

        } catch (err) {
            console.log(err)
        }
    }

    //DONATE
    const donateFund = async ({ amount, Id }) => {
        try {
            console.log(amount, Id);
            const transaction = await contract.call("donateToImage", [Id], {
                value: amount.toString()
            })
            console.log(transaction)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    //GET API DATA 
    const getALLNftsAPI = async () => {
        const response = await axios({
            method: "GET",
            url: "/api/v1/NFTs"
        })
        console.log(response)
    }

    //SINGLE NFTS API
    const getSingleNftsAPI = async (id) => {
        const response = await axios({
            method: "GET",
            url: `api/v1/NFTs/${id}`
        })
        console.log(response)
    }


    return (
        <StateContext.Provider value={{
            //CONTRACT
            address,
            contract,
            connect,
            disconnect,
            userBalance,
            setLoading,
            loading,
            //Function
            uploadImage,
            getUploadedImages,
            donateFund,
            singleImage,
            //API
            getALLNftsAPI,
            getSingleNftsAPI,

        }}
        >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);







