import React, { useState, useEffect } from "react";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaCirclePlay,
} from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaRegCircle,
  FaCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  // Sample data for catalog items
  const images = [
    "https://afrotouch.design/cdn/shop/articles/AfroTouch_Design_-_Blog_Posts_3.png?v=1597906525",
    "https://images.financialexpressdigital.com/2023/11/Untitled-design-77.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3xsXiAom582q4dw0cQg_tTJUntKyPo3xJA&s",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdlk1Y-54kF--6CeMCxFVR3s9xHu0g9B_Ww&s",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const catalogItems = [
    {
      id: 1,
      name: "Pens",
      color: "bg-blue-100",
      image:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Notebooks",
      color: "bg-green-100",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Art Supplies",
      color: "bg-purple-100",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Office Items",
      color: "bg-yellow-100",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    },
  ];

  // Sample trending products
  const trendingProducts = [
    {
      id: 1,
      name: "Premium Fountain Pen",
      discription: "High-quality fountain pen with smooth ink flow",
      image:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Leather Journal",
      discription: "Handcrafted leather-bound journal for your thoughts",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Watercolor Set",
      discription: "Complete set of professional watercolor paints",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Desk Organizer",
      discription: "Stylish organizer to keep your workspace tidy",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      {/* Hero Section - Image Slider */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {/* Images container */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <FaCircleChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <FaCircleChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="text-white hover:text-blue-200 transition-colors"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex ? (
                  <FaCircle className="w-3 h-3" />
                ) : (
                  <FaRegCircle className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {catalogItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `/products?categoryType=${encodeURIComponent(item.name)}`,
                )
              }
              className={`${item.color} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2">Explore our collection</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/allCategories")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            View All Catalog
          </button>
        </div>
      </section>

      {/* Two-Image Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-1/2">
            <div
              onClick={() => {
                navigate("/products");
              }}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop"
                alt="New Arrivals"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
                <p className="text-white/90">Fresh stock just landed</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div
              onClick={() => {
                navigate("/nearbyStores");
              }}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
                alt="Best Sellers"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Best Sellers</h3>
                <p className="text-white/90">Shop customer favorites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Trending Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  navigate(
                    `/products?categoryType=${encodeURIComponent(product.name)}`,
                  )
                }
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-600 text-sm">
                      {product.discription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Store Tour & Demos
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/Zy-c7s01yCY?si=82xzsv3cJEZmUlKz"
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Bharatambe Traders</h3>
              <p className="text-gray-400">
                Your one-stop shop for all stationery and sports needs. Quality
                products at affordable prices.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/allCategories"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/nearbyStores"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>MB Patil COlony Near Bus Stand</li>
                <li>Gorta-Muchalum Road, BasavaKalyan</li>
                <li>
                  Email:{" "}
                  <a href="mailto:bharatambe20@gmail.com">
                    bharatambe20@gmail.com
                  </a>
                </li>

                <li>
                  Phone: <a href="tel:6361037157">6361037157</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/bharatambetraders/"
                  className="bg-gray-700 p-3 rounded-full hover:bg-pink-600 transition"
                  target="_blank"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-full hover:bg-red-600 transition"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-400 mt-6">
                &copy; {new Date().getFullYear()} Bharatambe Traders. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
