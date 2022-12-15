const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 2) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 2) {
    throw new Error("Too many arguments");
  }

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return [Number(args[0]), Number(args[1])];
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const bmiCalculator = (
  height: string,
  weight: string
): string | null => {
  try {
    const [heightNum, weightNum] = parseArguments([height, weight]);
    return calculateBmi(heightNum, weightNum);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new Error("Something bad happened, message: " + e.message);
  }
};
