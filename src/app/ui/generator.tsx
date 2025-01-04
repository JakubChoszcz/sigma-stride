"use client";
import GeneratorForm from "./generator-form";
import GeneratorResult from "./generator-result";
import { useState } from "react";
import { TrainingDay } from "../lib/definitions";

export default function Generator() {
  const [trainingPlan, setTrainingPlan] = useState<TrainingDay[][]>([]);

  return (
    <div className="bg-white dark:bg-gray-900">
      {trainingPlan.length ? (
        <GeneratorResult trainingPlan={trainingPlan} />
      ) : (
        <GeneratorForm setTrainingPlan={setTrainingPlan} />
      )}
    </div>
  );
}
