interface bmiInputs {
  height: number;
  mass: number;
}

const parseBmiArguments = (args: string[]): bmiInputs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not number...");
  }
};

const calculateBim = (height: number, mass: number): string => {
  if (height === 0) throw new Error("Can't divide by 0!");
  const bmi = mass / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    return "Obese (Class I)";
  } else if (bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const { height, mass } = parseBmiArguments(process.argv);
  console.log(calculateBim(height, mass));
} catch (error: unknown) {
  let errorMessage = "Something had happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
