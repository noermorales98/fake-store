import Image from "next/image";
import Link from "next/link";

export default function CardCategories({ img, name, description, url }) {
  return (
    <div className="relative mx-auto w-full max-w-sm pt-6">
      <Link href={"/categories/" + url}>
        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
          <div className="rounded-lg">
            <div className="relative flex h-60 justify-center overflow-hidden rounded-lg">
              <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                <Image
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="">
              <div className="mt-4 grid grid-cols-1">
                <div className="flex items-center">
                  <div className="relative">
                    <h2
                      className="line-clamp-1 text-base font-medium text-gray-800 md:text-lg"
                      title="New York"
                    >
                      {name}
                    </h2>
                    <p
                      className="mt-2 line-clamp-1 text-sm text-gray-800"
                      title="New York, NY 10004, United States"
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
