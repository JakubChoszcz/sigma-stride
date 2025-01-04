"use client";
import GeneratorForm from "./generator-form";
import GeneratorResult from "./generator-result";
import { useState } from "react";

export default function Generator() {
  const [trainingPlan, setTrainingPlan] = useState();

  return (
    <div className="bg-white dark:bg-gray-900">
      {trainingPlan ? (
        <GeneratorResult trainingPlan={trainingPlan} />
      ) : (
        <GeneratorForm setTrainingPlan={setTrainingPlan} />
      )}
    </div>
  );
}
