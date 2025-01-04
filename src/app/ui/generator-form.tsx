"use client";
import { useForm } from "react-hook-form";
import { GeneratorFormData } from "../lib/definitions";
import { generateTrainingPlan } from "../lib/utils";

export default function GeneratorForm({ setTrainingPlan }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: GeneratorFormData) => {
    setTrainingPlan(generateTrainingPlan(data));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Provide your details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="pb-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Personal Best Time:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              {...register("pb-time", { required: true, value: "00:00:00" })}
              id="pb-time"
              type="time"
              step="1"
              placeholder="PB Time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <br />

          <label
            htmlFor="pb-distance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Distance of Personal Best:
          </label>
          <select
            {...register("pb-distance", { required: true, value: "10000" })}
            id="pb-distance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="5000">5000m</option>
            <option value="10000">10 000m</option>
            <option value="21097">half marathon</option>
            <option value="42195">marathon</option>
          </select>

          <br />

          <label
            htmlFor="distance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Target Distance:
          </label>
          <select
            {...register("target-distance", { required: true })}
            id="target-distance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="5000">5000m</option>
            <option value="10000">10000m</option>
            <option value="21097">half marathon</option>
            <option value="42195">marathon</option>
          </select>

          <br />

          <label
            htmlFor="plan-duration"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Training Plan Duration (in Weeks):
          </label>
          <select
            {...register("plan-duration", { required: true })}
            id="plan-duration"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="10">10 weeks</option>
            <option value="14">14 weeks</option>
            <option value="18">18 weeks</option>
            <option value="22">22 weeks</option>
          </select>

          <br />

          <label
            htmlFor="training-level"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Training Level:
          </label>
          <select
            {...register("training-level", { required: true })}
            id="training-level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <br />

          <button
            type="submit"
            className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Generate Plan
          </button>
        </form>
      </div>
    </section>
  );
}
