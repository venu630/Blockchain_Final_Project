//This page is used to create
import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Static";

const UploadProduct = () => {
  //Setting all the product details to the state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const fileInputRef = useRef(null);

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //uploadImageToPinata() used to upload the image to pinata
  const uploadImageToPinata = async (file) => {
    const formData = new FormData();
    //Appending the file to the formData object
    formData.append("file", file);
    try {
      //POST Requesting pinata to upload the image
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "3b75b9eda38258602cd9",
            pinata_secret_api_key:
              "a64a4976d75545722b6dc4bc57555c66bc1bd1d2fc963caf9eb607589170e257",
          },
        }
      );
      return response.data.IpfsHash;
    } catch (error) {
      //Displaying error if the image is not uploaded to pinata
      console.error("Error uploading image to Pinata: ", error);
      return null;
    }
  };

  //handleSubmit() is used to run the upload product functionality
  const handleSubmit = async (event) => {
    //Preventing the page from reloading
    event.preventDefault();

    //Checking for Metamask connection and displaying error if not connected
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not detected.");
      return;
    }

    setIsLoading(true);
    const ipfsHash = await uploadImageToPinata(image);
    if (!ipfsHash) {
      setIsLoading(false);
      return;
    }

    try {
      //Getting provider information from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Getting the contract object to get all function from the smart contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      //Using listAllProducts() defined in smart contracts used for uploading product to the blockchain
      const transaction = await contract.listAllProducts(
        title,
        description,
        ipfsHash,
        ethers.utils.parseUnits(price, "ether")
      );
      await transaction.wait();
      //Setting all the input fields to empty
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUploadStatus(true);
    } catch (error) {
      //Consoling if there is any error occured in uploading product
      console.error("Error processing in uploading: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {uploadStatus && (
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span class="block sm:inline">Product uploaded successfully!</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-green-600"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-6 md:px-12 xl:px-0 pb-10">
          <div className="max-w-md mx-auto mt-10 bg-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Upload New Product</h2>
            {/* Form to fill the product details */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ex: 0.00000001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  ref={fileInputRef}
                  onChange={onImageChange}
                />
              </div>
              <div className="text-center">
                {/* Button to trigger the upload product functionality */}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadProduct;
