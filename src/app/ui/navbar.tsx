import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900 antialiased fixed w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex justify-start items-center">
            <Link href="/" className="flex mr-6 xl:mr-8">
              <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="SigmaStride Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SigmaStride
              </span>
            </Link>

            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 space-x-6 font-medium lg:flex-row xl:space-x-8 lg:mt-0">
                <li>
                  <Link
                    href="/generator"
                    className="block text-white rounded text-primary-700 dark:text-primary-500"
                    aria-current="page"
                  >
                    Generator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
