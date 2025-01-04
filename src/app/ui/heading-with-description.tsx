export default function HeadingWithDescription() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Empowering runners worldwide to achieve their goals
          </h2>
          <p className="mb-4">
            Enable runners, coaches, and enthusiasts to collaborate seamlessly
            and train smarter. Adapt to your progress and unlock your potential
            with data-driven insights and personalized plans.
          </p>
          <a
            href="/generator"
            className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
          >
            Learn more
            <svg
              className="ml-1 w-6 h-6"
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
        </div>
        <div className="mt-4 font-light text-gray-500 sm:text-lg lg:mt-0 dark:text-gray-400">
          <p className="mb-4">
            Track your training journey on a unified platform that connects all
            aspects of your running experience. Analyze performance metrics,
            integrate with popular fitness trackers, and access tailored
            recommendations to improve every run.
          </p>
          <p>
            Achieve your running goals faster without the guesswork. With
            SigmaStride, eliminate inefficiencies, optimize your workouts, and
            stay on track with a complete record of your progress and
            achievements.
          </p>
        </div>
      </div>
    </section>
  );
}
