// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint id;
        address payable seller;
        address payable owner;
        string title;
        string description;
        string imageHash; 
        uint price;
        bool sold;
    }

    Product[] public products;
    uint public productCount;

    event ProductListed(uint productId, address indexed seller, address indexed owner, string title, string imageHash, uint price);
    event ProductSold(uint productId, address indexed oldOwner, address indexed newOwner, uint price);
    event PaymentSent(address indexed from, address indexed to, uint256 amount);

    constructor() {
        productCount = 0;
    }

//This listAllProducts() is used to upload product to the blockchain by providing the product details
    function listAllProducts(string memory _title, string memory _description, string memory _imageHash, uint _price) external {
        require(_price > 0, "Price must be greater than zero");
        
        products.push(Product({
            id: productCount,
            seller: payable(msg.sender),
            owner: payable(msg.sender), // Owner set as the seller initially
            title: _title,
            description: _description,
            imageHash: _imageHash,
            price: _price,
            sold: false
        }));
        
        emit ProductListed(productCount, msg.sender, msg.sender, _title, _imageHash, _price);
        productCount++;
    }

//This buyProduct() is used to buy the product
    function buyProduct(uint _id) external payable {
        require(_id < productCount, "Product ID does not exist");
        Product storage product = products[_id];
        require(msg.value == product.price, "Please submit the asking price in order to complete the purchase");
        require(!product.sold, "This product has already been sold");
        require(msg.sender != product.owner, "Owner cannot buy their own product");

        address payable prevOwner = product.owner; // Track previous owner for event
        product.owner = payable(msg.sender); // Update owner to the new buyer
        product.sold = true;

        prevOwner.transfer(msg.value); // Transfer funds to the previous owner

        emit PaymentSent(msg.sender, prevOwner, msg.value);
        emit ProductSold(_id, prevOwner, msg.sender, product.price);
    }

//This getProductById() is used to a particular product details by id
    function getProductById(uint _id) external view returns (Product memory) {
        require(_id < productCount, "Product ID does not exist");
        return products[_id];
    }

//This getAllProducts() is used to retrieve all product details
    function getAllProducts() external view returns (Product[] memory) {
        return products;
    }

    
}
