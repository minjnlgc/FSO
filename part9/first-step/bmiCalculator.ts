interface bmiInputs {
  height: number;
  mass: number;
}

interface bmiOutputs {
  height: number;
  mass: number;
  bmi: String;
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

export const calculateBim = (height: number, mass: number): bmiOutputs => {
  if (height === 0) throw new Error("Can't divide by 0!");
  const bmi = mass / Math.pow(height / 100, 2);

  let bmiDescrption: string;

  if (bmi < 16) {
    bmiDescrption = "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    bmiDescrption = "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    bmiDescrption = "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    bmiDescrption = "Normal (healthy weight)";
  } else if (bmi < 29.9) {
    bmiDescrption = "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    bmiDescrption = "Obese (Class I)";
  } else if (bmi < 39.9) {
    bmiDescrption = "Obese (Class II)";
  } else {
    bmiDescrption = "Obese (Class III)";
  }

  return {
    height,
    mass,
    bmi: bmiDescrption,
  };
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
