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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
