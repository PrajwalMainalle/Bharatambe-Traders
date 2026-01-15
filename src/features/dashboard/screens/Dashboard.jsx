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
    "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
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
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
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
                  `/products?categoryType=${encodeURIComponent(item.name)}`
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
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
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
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
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
                    `/products?categoryType=${encodeURIComponent(product.name)}`
                  )
                }
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
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
            <div className="aspect-w-16 aspect-h-9">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-block mb-4">
                    <FaCirclePlay
                      className="w-16 h-16 text-white"
                      fill="white"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Store Virtual Tour
                  </h3>
                  <p className="text-white/90">See our products in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Bharatambe Traders</h3>
              <p className="text-gray-400">
                Your one-stop shop for all stationery and sports needs. Quality
                products at affordable prices.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
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
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Stationery Street</li>
                <li>City, State 12345</li>
                <li>Email: info@stationerypro.com</li>
                <li>Phone: (123) 456-7890</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-700 p-3 rounded-full hover:bg-pink-600 transition"
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
