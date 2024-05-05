//This page is used to list all products
import ProductCard from "../components/ProductCard"; //Importing ProductCard component
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/Static";

const ListAllProducts = () => {
  const [items, setItems] = useState([]);

  //This hook is used to update the products list
  useEffect(() => {
    //fetchItems is used to connect and get all products
    const fetchItems = async () => {
      //Getting provider information from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //Getting the contract object to get all function from the smart contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      //Using getAllProducts() defined in smart contracts for retrieving all products 
      const items = await contract.getAllProducts();
      const itemsFormatted = items.map((item) => ({
        id: item.id.toNumber(),
        title: item.title,
        imageHash: item.imageHash,
        price: ethers.utils.formatEther(item.price),
        sold: item.sold,
        description: item.description,
      }));
      setItems(itemsFormatted);
    };

    //Calling the fetchItems() 
    fetchItems();
  }, [items]);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 md:px-12 xl:px-0 flex justify-between items-center">
          <div className="pl-4">
            <a href="/" className="text-xl font-bold">
              Nike Shoes
            </a>
          </div>
          <div><a target="_blank" rel="noreferrer" href="https://sepolia.etherscan.io/address/0x9A177A0FAEEFC532B00Fcd09625f76610C8cD067">Transaction Id: 0x9A....D067 </a></div>
          <div className="pr-4">
            {/* This button is used to go to the Selling Products page */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href="listallproducts/upload">Sell Products</a>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-6 md:px-12 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 my-12 p-8">
            {/* Displaying all products */}
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 md:px-12 xl:px-0 text-center">
          <p>© 2024 Venu Sirisanagandla Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ListAllProducts;
