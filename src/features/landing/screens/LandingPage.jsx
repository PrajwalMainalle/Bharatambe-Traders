import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPaintBrush, FaBook, FaPenNib, FaBriefcase } from "react-icons/fa";
import newArrival from "../../../assets/newArrival.webp";
import bestSeller from "../../../assets/bestSellers.webp";
import stationaryItems from "../../../assets/stationaryItems.png";
import sportsItems from "../../../assets/sportsItems.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Everything a Creator Needs — In One Place
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover premium stationery, art supplies, and sports essentials
            trusted by creators across India.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Start Exploring
          </button>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          New Arrivals & Best Sellers
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* New Arrivals */}
          <div className="relative w-full md:w-1/2 group">
            <img
              src={newArrival}
              alt="New Arrivals"
              loading="lazy"
              className="rounded-xl shadow-lg w-full h-90 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xl font-semibold">
                New Arrivals
              </span>
            </div>
          </div>

          {/* Best Sellers */}
          <div className="relative w-full md:w-1/2 group">
            <img
              src={bestSeller}
              alt="Best Sellers"
              loading="lazy"
              className="rounded-xl shadow-lg w-full h-90 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xl font-semibold">
                Best Sellers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISUAL SHOWCASE ================= */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our World of Creativity
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Stationery Items */}
          <div className="relative w-full md:w-1/2 group">
            <img
              src={stationaryItems}
              alt="Stationery Items"
              loading="lazy"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xl font-semibold">
                Stationery Items
              </span>
            </div>
          </div>

          {/* Sports Items */}
          <div className="relative w-full md:w-1/2 group">
            <img
              src={sportsItems}
              alt="Sports Items"
              loading="lazy"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xl font-semibold">
                Sports Items
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROMISE ================= */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Promise to Every Creator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">
                🇮🇳 India’s Largest Creative Store
              </h3>
              <p className="text-gray-600">
                Over 11,000+ curated products to fuel imagination and
                creativity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">
                🎨 Handpicked for Quality
              </h3>
              <p className="text-gray-600">
                Every product is selected to inspire and perform consistently.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">
                ❤️ Loved by 1L+ Happy Creators
              </h3>
              <p className="text-gray-600">
                Trusted daily by artists, students, and professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO IS THIS FOR ================= */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for Everyone Who Creates
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <FaPaintBrush className="text-4xl mx-auto mb-3 text-blue-600" />
            <p className="font-medium">Artists & Illustrators</p>
          </div>
          <div>
            <FaPenNib className="text-4xl mx-auto mb-3 text-blue-600" />
            <p className="font-medium">Writers & Journal Lovers</p>
          </div>
          <div>
            <FaBook className="text-4xl mx-auto mb-3 text-blue-600" />
            <p className="font-medium">Students & Educators</p>
          </div>
          <div>
            <FaBriefcase className="text-4xl mx-auto mb-3 text-blue-600" />
            <p className="font-medium">Professionals</p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of creators discovering quality tools every day.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-white text-2xl font-bold mb-3">
            Bharatambe Traders
          </h3>
          <p className="mb-4">
            Your one-stop store for quality stationery & sports essentials.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Bharatambe Traders. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
