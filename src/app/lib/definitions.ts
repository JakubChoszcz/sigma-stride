export type GeneratorFormData = {
  "pb-time": string;
  "pb-distance": distance;
  "target-distance": distance;
  "plan-duration": planDuration;
  "training-level": trainingLevel;
};

export type TrainingPaces = {
  easy: string;
  marathon: string;
  threshold: string;
  interval: string;
  repetition: string;
};

export type planDuration = "10" | "14" | "18" | "22";

export type distance = "5000" | "10000" | "21097" | "42195";

export type trainingLevel = "beginner" | "intermediate" | "advanced";

export type phase = "build" | "maintenance" | "peaking";

export type TrainingDay = {
  type: string;
  distance: string;
};
