const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16) {
    return "Underweight (Severe thinness) ";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness) ";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness) ";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

// const parseArguments = (args: Array<string>): Array<number> => {
//   if (args.length < 4) throw new Error("not enough arguments");

//   for (let i = 2; i < args.length; i++) {
//     if (isNaN(Number(args[i]))) {
//       throw new Error("some values are not numbers");
//     }
//   }

//   return args.slice(2).map((arg) => Number(arg));
// };

// const [height, weight] = parseArguments(process.argv);
// console.log(height, weight);
// console.log(calculateBmi(height, weight));

export default calculateBmi;
