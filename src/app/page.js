"use client";
import CardCategories from "@/components/cardCategories";
import { useEffect, useState } from "react";
import img from "../assets/tiend.webp";
import accesories from "../assets/accesories.webp";
import joyas from "../assets/joyas.jpg";
import woman from "../assets/woman.jpg";
import man from "../assets/mens.jpg";
import CardProducts from "@/components/cardProducts";
import { getProductsLimit } from "@/services/products";
import Link from "next/link";
export default function Home() {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    getProductsLimit(8)
      .then((res) => setProductsData(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="flex flex-col items-center gap-10">
      <section className="flex flex-col items-center gap-8">
        <video src="/back.mp4" autoPlay loop muted />
        <h1 className="font-bold text-7xl mt-8">Fake Store</h1>
        <p className="text-xl text-gray-600">
          Bienvenidos a Fake Store, by Aldo & Noelí
        </p>
        <span className="relative inline-flex">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white transition ease-in-out duration-150 cursor-pointer ring-1 ring-slate-900/10 dark:ring-slate-200/20"
          >
            <Link href="/products">Ver productos</Link>
          </button>
          <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </span>
      </section>
      <section className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl">
          <CardCategories
            img={accesories}
            name={"Electrónica"}
            description={"Encuentra lo mejor en tecnología"}
            url={"electronics"}
          />
          <CardCategories
            img={joyas}
            name={"Joyas"}
            description={"Joyeria de calidad"}
            url={"jewelery"}
          />
          <CardCategories
            img={woman}
            name={"Ropa para mujeres"}
            description={"Los mejores precios en ropa para mujer"}
            url={"women's clothing"}
          />
          <CardCategories
            img={man}
            name={"Ropa para hombres"}
            description={"Encuentra tu talla ideal en ropa para hombre"}
            url={"men's clothing"}
          />
        </div>
      </section>
      <section className="flex flex-col gap-2 pt-20 pb-52">
        <h2 className="font-bold text-4xl text-center">Productos</h2>
        <p className="text-base text-gray-600 text-center pb-4">
          Encuentra los mejores productos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl">
          {productsData.map((product) => {
            return (
              <CardProducts
                key={product.id}
                image={product.image}
                title={product.title}
                category={product.category}
                price={product.price}
                id={product.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
