import React from "react";

const HomePage = () => {
  return (
    <div>
      <head>
        <title>My E-Commerce Site</title>
        <meta name="description" content="Welcome to My E-Commerce Site" />
      </head>

      <main className="bg-white">
        <div className="hero bg-gray-200 py-20 ">
          <div className="container mx-auto px-6 md:px-12 xl:px-0">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-2">
              Welcome to Our Store!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Check out our exclusive collection of products.
            </p>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a href="/metamaskconnection">Shop Now</a>
              </button>
            </div>
          </div>
        </div>

        <section className="flex flex-wrap items-center justify-center md:justify-between my-12 container mx-auto px-6">
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl text-gray-800 font-bold mb-3">
              The Perfect Fit for Every Run
            </h2>
            <p className="text-gray-600 mb-5">
              Discover the comfort and style of our latest Nike sneakers
              designed for the modern athlete. Our innovative cushioning
              technology provides superior support for all-day wear.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2 p-6">
            <img
              src="./Assests/Nike_Shoe.jpg"
              alt="Nike Shoe"
              className="w-full rounded shadow-lg"
            />
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-6 md:px-12 xl:px-0 text-center">
            <p>© 2024 Venu Sirisanagandla Site. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
