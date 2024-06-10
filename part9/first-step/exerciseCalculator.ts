export interface exerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
  rating: number;
  ratingDescription: string;
}

export interface exerciseInput {
  dailyHoursArr: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): exerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const isInputTypeValid = args.slice(2).reduce((acc, e) => {
    if (isNaN(Number(e))) {
      return false;
    }
    return acc;
  }, true);

  if (isInputTypeValid) {
    const dailyHoursArr = args.slice(3).reduce((acc: number[], e) => {
      acc.push(Number(e));
      return acc;
    }, []);

    return {
      dailyHoursArr: dailyHoursArr,
      target: Number(args[2]),
    };
  } else {
    throw new Error("Provided values are not number...");
  }
};

export const calculateExercises = (dailyHoursArr: number[], target: number): exerciseInfo => {
  const periodLength: number = dailyHoursArr.length;
  const trainingDays: number = dailyHoursArr.reduce((acc, h) => {
    if (h !== 0) {
      acc += 1;
    }
    return acc;
  }, 0);

  const totalHour: number = dailyHoursArr.reduce((acc, h) => {
    return (acc += h);
  }, 0);

  const average: number = totalHour / periodLength;

  let rating: number, ratingDescription: string;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Well done! You've met your target!";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "hmmmm...";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: average >= target,
    target: target,
    average: average,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

try {
  const { dailyHoursArr, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHoursArr, target));
} catch (error: unknown) {
  let errorMessage = "Something had happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
