interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((exercise) => exercise > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 1.1 ? 2 : 1;
  const ratingDescription = success
    ? "good"
    : average >= target * 1.1
    ? "not too bad but could be better"
    : "bad";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 2) {
    throw new Error("Not enough arguments");
  }

  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
  }
  return args.slice(0).map((arg) => Number(arg));
};

export const exerciseCalculator = (
  dailyExercises: string[],
  target: string
): Result | null => {
  try {
    const [targetParsed, ...dailyExercisesParsed] = parseArguments([
      target,
      ...dailyExercises,
    ]);
    return calculateExercises(dailyExercisesParsed, targetParsed);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new Error("Something bad happened, message: " + e.message);
  }
};

export {};
