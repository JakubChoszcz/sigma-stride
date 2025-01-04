import { daysOfTheWeek } from "../lib/utils";

export default function GeneratorResult({ trainingPlan }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Plan Smarter with SigmaStride
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Discover how our powerful tools and personalized features help
            runners of all levels achieve their goals. From beginners to
            seasoned athletes, SigmaStride offers a complete suite of resources
            to make every run count.
          </p>
        </div>
        <ul className="grid gap-2 grid-cols-7 mb-5">
          {daysOfTheWeek.map(day => (
            <li
              key={day}
              className="shadow-sm dark:border-gray-700 py-2 px-3 lg:py-3 lg:px-5"
            >
              <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">
                {day}
              </h3>
            </li>
          ))}
        </ul>
        <ul className="grid gap-2 grid-cols-7">
          {trainingPlan.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <li
                key={`${weekIndex}-${dayIndex}`}
                className="rounded-lg shadow-sm bg-gray-800 bg-opacity-50 py-2 px-2 text-sm flex justify-center items-center"
              >
                <p className="text-gray-500 dark:text-gray-400">
                  {trainingPlan[weekIndex][dayIndex].distance}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
