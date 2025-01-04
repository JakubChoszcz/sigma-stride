export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
          <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
            <a
              href="#"
              className="inline-flex items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span className="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600">
                New
              </span>{" "}
              <span className="text-sm font-medium">
                Flowbite is out! See what's new
              </span>
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
              We invest in the world’s potential
            </h1>
            <p className="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where innovation can unlock
              long-term value and drive economic growth.
            </p>
          </div>
          <div className="col-span-6">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/search-mockup.png"
              className="dark:hidden"
              alt="mockup"
            />
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/search-mockup-dark.png"
              className="hidden dark:block"
              alt="mockup dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
