"use client";
import CardProducts from "@/components/cardProducts";
import { getProductsByCategory } from "@/services/products";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { details } = params;
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    getProductsByCategory(details)
      .then((res) => {
        setProductsData(res);
      })
      .catch((err) => console.log(err));
  }, [details]);

  return (
    <section className="">
      {productsData.length === 0 ? (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <div className="flex max-w-7xl m-auto">
            <h1 className="text-3xl font-semibold text-gray-800 py-6">
              Resultados de la categoría: {decodeURIComponent(details)}
            </h1>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl m-auto pb-20">
          {productsData.map((product) => (
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
        </div>
      )}
    </section>
  );
}
