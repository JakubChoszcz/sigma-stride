import { GeneratorFormData } from "./definitions";
import { trainingMileage } from "./constants/trainingMileage";
import { trainingSessionsProportions } from "./constants/trainingSessionsProportions";
import { phase } from "./definitions";
type TrainingSessionType =
  | "easy"
  | "long"
  | "interval"
  | "repetition"
  | "threshold"
  | "marathon"
  | "rest";

type SessionProportions = {
  [key in phase]: {
    [key in TrainingSessionType]?: number | number[];
  };
};

function vo2maxCalculator(D: number, t: number): number {
  // Convert time to minutes for the formula
  const timeInMinutes = t / 60;

  // Calculate velocity in meters per minute
  const velocity = D / timeInMinutes;

  // Calculate percent VO2max based on time
  const percentVO2max =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * timeInMinutes) +
    0.2989558 * Math.exp(-0.1932605 * timeInMinutes);

  // Calculate VO2 in ml/kg/min using Jack Daniels' formula
  const VO2 =
    (-4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity) /
    percentVO2max;

  // Round to 1 decimal place
  return Math.round(VO2 * 10) / 10;
}

function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":");
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

function calculatePaces(vo2max: number) {
  // Calculate VDOT velocity in meters per minute for each intensity
  const getVelocity = (percentVO2max: number) => {
    // Using Jack Daniels' formula, solved for velocity
    // VO2 = (-4.6 + 0.182258v + 0.000104v^2) / percentVO2max
    // Simplified quadratic equation: 0.000104v^2 + 0.182258v - (VO2 * percentVO2max + 4.6) = 0
    const a = 0.000104;
    const b = 0.182258;
    const c = -(vo2max * percentVO2max + 4.6);

    // Quadratic formula: (-b + sqrt(b^2 - 4ac)) / (2a)
    const velocity = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return velocity;
  };

  // Convert velocity (m/min) to pace (min/km)
  const velocityToPace = (velocity: number) => {
    const minutesPerKm = 1000 / velocity;
    const minutes = Math.floor(minutesPerKm);
    const seconds = Math.round((minutesPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate paces for each training intensity using min, max and middle of ranges
  return {
    easy: velocityToPace(getVelocity(0.665)), // 66.5% VO2max
    marathon: velocityToPace(getVelocity(0.75)), // 75% VO2max
    threshold: velocityToPace(getVelocity(0.88)), // 88% VO2max
    interval: velocityToPace(getVelocity(0.95)), // 95% VO2max
    repetition: velocityToPace(getVelocity(1.05)), // 105% VO2max
    long: velocityToPace(getVelocity(0.665)), // 110% VO2max
  };
}

function calculateWeekMileage(week: number, baseMileage: number): number {
  let mileage = baseMileage;

  // Zwiększ o 2 km co tydzień, chyba że jest to 4. tydzień
  for (let i = 1; i <= week; i++) {
    // Co 4. tydzień cofamy o 2 km
    if (i % 4 === 0) {
      mileage -= 2;
    } else {
      mileage += 2;
    }
  }

  return mileage;
}

function getPhase(
  week: number,
  duration: number
): "build" | "maintenance" | "peaking" {
  if (week < duration / 2) {
    return "build";
  } else if (week < duration * 0.75) {
    return "maintenance";
  }
  return "peaking";
}

const trainingSessions = {
  5000: {
    beginner: ["rest", "easy", "rest", "threshold", "rest", "easy", "long"],
    intermediate: [
      "rest",
      "easy",
      "interval",
      "easy",
      "rest",
      "threshold",
      "long",
    ],
    advanced: [
      "rest",
      "repetition",
      "easy",
      "interval",
      "easy",
      "threshold",
      "long",
    ],
  },
  10000: {
    beginner: ["rest", "easy", "rest", "threshold", "rest", "easy", "long"],
    intermediate: [
      "rest",
      "easy",
      "interval",
      "easy",
      "rest",
      "threshold",
      "long",
    ],
    advanced: [
      "rest",
      "repetition",
      "easy",
      "interval",
      "easy",
      "threshold",
      "long",
    ],
  },
  21097: {
    beginner: ["rest", "easy", "rest", "threshold", "rest", "easy", "long"],
    intermediate: [
      "rest",
      "easy",
      "marathon",
      "easy",
      "rest",
      "threshold",
      "long",
    ],
    advanced: [
      "rest",
      "interval",
      "easy",
      "marathon",
      "easy",
      "threshold",
      "long",
    ],
  },
  42195: {
    beginner: ["rest", "easy", "rest", "threshold", "rest", "easy", "long"],
    intermediate: [
      "rest",
      "easy",
      "marathon",
      "easy",
      "rest",
      "threshold",
      "long",
    ],
    advanced: [
      "rest",
      "interval",
      "easy",
      "marathon",
      "easy",
      "threshold",
      "long",
    ],
  },
};

export const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function generateTrainingPlan(data: GeneratorFormData) {
  const trainingPlan = [];
  const {
    "pb-time": pbTime,
    "pb-distance": pbDistance,
    "plan-duration": planDuration,
    "training-level": trainingLevel,
    "target-distance": targetDistance,
  } = data;

  const vo2max = vo2maxCalculator(Number(pbDistance), timeToSeconds(pbTime));
  const paces = calculatePaces(vo2max);

  const trainingSessionsProportion = trainingSessionsProportions[
    trainingLevel
  ] as SessionProportions;

  for (let i = 0; i < Number(planDuration); i++) {
    const week = [];
    const phase: phase = getPhase(i, Number(planDuration));
    const baseMileage = trainingMileage[trainingLevel];
    const weekMileage = calculateWeekMileage(i, baseMileage);

    for (let j = 0; j < 7; j++) {
      let trainingSession = trainingSessions[targetDistance][trainingLevel][
        j
      ] as TrainingSessionType;

      if (trainingSession === "rest") {
        week.push({
          type: trainingSession,
          distance: "",
        });
        continue;
      }

      if (phase === "build") {
        if (trainingSession === "interval" || trainingSession === "threshold") {
          trainingSession = "repetition";
        }
      }

      const proportion = trainingSessionsProportion[phase][trainingSession];

      if (
        trainingSession === "easy" ||
        trainingSession === "long" ||
        trainingSession === "marathon"
      ) {
        week.push({
          type: trainingSession,
          distance: `${Math.floor(
            (weekMileage * (proportion as number)) / 100
          )}km ${paces[trainingSession]} min/km`,
        });
      } else if (trainingSession === "interval") {
        week.push({
          type: trainingSession,
          distance: calculateInterval(
            proportion as number[],
            weekMileage,
            paces.easy,
            paces.interval
          ),
        });
      } else if (trainingSession === "repetition") {
        week.push({
          type: trainingSession,
          distance: calculateRepetition(
            proportion as number[],
            weekMileage,
            paces.easy,
            paces.repetition
          ),
        });
      } else if (trainingSession === "threshold") {
        week.push({
          type: trainingSession,
          distance: calculateThreshold(
            proportion as number[],
            weekMileage,
            paces.easy,
            paces.threshold
          ),
        });
      }
    }

    trainingPlan.push(week);
  }

  return trainingPlan;
}

function calculateRepetition(
  proportion: number[],
  weekMileage: number,
  easyPace: string,
  repetitionPace: string
) {
  let result = "";

  for (let i = 0; i < proportion.length; i++) {
    if (i === 1) {
      result += ` + 10x${
        Math.floor((proportion[i] * weekMileage) / 100) * 100
      }m ${repetitionPace} min/km + `;
    } else {
      result += `${Math.floor(
        (proportion[i] * weekMileage) / 100
      )}km ${easyPace} min/km`;
    }
  }

  return result.trim();
}

function calculateInterval(
  proportion: number[],
  weekMileage: number,
  easyPace: string,
  intervalPace: string
) {
  let result = "";

  for (let i = 0; i < proportion.length; i++) {
    if (i === 1) {
      result += ` + 6x${
        Math.floor((proportion[i] * weekMileage) / 100) * 100
      }m ${intervalPace} min/km + `;
    } else {
      result += `${Math.floor(
        (proportion[i] * weekMileage) / 100
      )}km ${easyPace} min/km`;
    }
  }

  return result.trim();
}

function calculateThreshold(
  proportion: number[],
  weekMileage: number,
  easyPace: string,
  thresholdPace: string
) {
  let result = "";

  for (let i = 0; i < proportion.length; i++) {
    if (i === 1) {
      result += ` + 4x${
        Math.floor((proportion[i] * weekMileage) / 100) * 100
      }m ${thresholdPace} min/km + `;
    } else {
      result += `${Math.floor(
        (proportion[i] * weekMileage) / 100
      )}km ${easyPace} min/km`;
    }
  }

  return result.trim();
}

export function sum(a: number, b: number) {
  return a + b;
}
