"use client";

import CardProducts from "@/components/cardProducts";
import { getProducts } from "@/services/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {

  const router = useRouter();
  const { details } = params;
  const [error, setError] = useState(false);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProductsData(res);
      })
      .catch((err) => console.log(err));
  }, [details]);

  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(details.toLowerCase())
  );

  //wait 5 seconds, if there are no results, redirect to error page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filteredProducts.length === 0) {
        setError(true);
      }
    }, 7000);
    return () => clearTimeout(timer);
  }, [filteredProducts]);

  if(error){
    router.push('/error')
  }
  

  return (
    <section className="">
      {filteredProducts.length === 0 ? (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <div className="flex max-w-7xl m-auto">
            <h1 className="text-3xl font-semibold text-gray-800 py-6">
              Resultados de la búsqueda: {details}
            </h1>
          </div>
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
        </div>
      )}
    </section>
  );
}
