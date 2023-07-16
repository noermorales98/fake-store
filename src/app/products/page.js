"use client";
import CardProducts from "@/components/cardProducts";
import { getProducts } from "@/services/products";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { details } = params;
  const [productsData, setProductsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProductsData(res);
      })
      .catch((err) => console.log(err));
  }, [details]);

  const filteredProducts = productsData.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  const categories = [
    ...new Set(productsData.map((product) => product.category)),
  ];


  return (
    <section className="">
      <div className="flex justify-between max-w-7xl m-auto py-8">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 md:w-96 w-full"
          placeholder="Buscar productos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 md:w-24 w-full"
        >
          <option value="">Filtrar</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {!filteredProducts ? (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl m-auto pb-20">
          {filteredProducts.map((product) => (
            <CardProducts
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}
