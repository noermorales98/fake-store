import Image from "next/image";
import Link from "next/link";

export default function CardProducts({ image, title, category, price, id }) {
  const titulo = title.split(" ").slice(0, 4).join(" ");
  return (
    <div className="!z-5 m-auto relative flex flex-col rounded-[20px] max-w-[300px] bg-white border-gray-100 border-2 bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px]">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="relative w-full">
          <Image
            src={image}
            width={300}
            height={600}
            className="mb-3 h-64 object-contain w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt={title}
          />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700"> {titulo} </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                {category}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between md:items-center lg:justify-between ">
            <div className="flex">
              <p className="!mb-0 text-sm font-bold text-brand-500">
                {price} <span>USD</span>
              </p>
            </div>
            <Link href={`/products/${id}`}>
              <button
                className="linear rounded-[20px] bg-blue-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
              >
                Ver producto
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
