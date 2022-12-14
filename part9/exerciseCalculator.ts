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
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
  }
  return args.slice(2).map((arg) => Number(arg));
};

try {
  const [target, ...dailyExercises] = parseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export {};
