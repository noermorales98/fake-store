"use client";
import CardProducts from "@/components/cardProducts";
import { getProducts } from "@/services/products";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { details } = params;
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    getProducts()
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl m-auto py-20">
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
      )}
    </section>
  );
}
