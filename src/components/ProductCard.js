//This is a ProductCard component to display the contents of the product
import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/Static";

const ProductCard = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const price = item.price;
  const id = item.id;

  //buyItem() is used to buy a particular product using its id
  const buyItem = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("Please install MetaMask to perform the transaction.");
      return;
    }
    setIsLoading(true);

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

      //Converting the _hex price to ethers price
      const new_price = ethers.utils.parseUnits(price.toString(), "ether");

      //Using buyProdct() from the smart contract to buy a particular product by providing product id and price
      const transaction = await contract.buyProduct(id, { value: new_price });
      await transaction.wait();
      alert("Product bought successfully!")
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsLoading(false);
      //Alerting if there is any error in buying the product
      alert("Error in Buying!");
    }
  };

  return (
    <div key={item.id} className="relative">
      <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Displaying image from pinata using its gateway by sending its imageHash */}
        <img
          src={`https://gateway.pinata.cloud/ipfs/${item.imageHash}`}
          alt={item.title}
          className="w-full h-56 object-cover object-center"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          {/* <p className="text-gray-600 mb-4">{item.description}</p> */}
          <p className="text-gray-800 font-bold">Price: (ETH) {item.price}</p>
          <div className="flex justify-between mt-4">
            {/* Displaying availability status of the product */}
            <div
              className={`font-bold py-2 px-4 rounded ${
                item.sold === true
                  ? "bg-red-500 hover:bg-red-700 text-white"
                  : "bg-green-500 hover:bg-green-700 text-white"
              }`}
            >
              {item.sold === true ? "Sold" : "Available"}
            </div>
            {/* Displaying buying status of the product */}

            {!item.sold && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => buyItem(item.id)}
              >
                {isLoading ? "Processing..." : "Buy"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
