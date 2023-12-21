interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const average =
    dailyHours.reduce((acc, curr) => acc + curr, 0) / dailyHours.length;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "great!"
      : rating === 2
      ? "not too bad but could be better"
      : "bad";

  return {
    periodLength: dailyHours.length,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

// const parseArguments = (args: Array<string>): Array<number> => {
//   if (args.length < 4) throw new Error("not enough arguments");

//   for (let i = 2; i < args.length; i++) {
//     if (isNaN(Number(args[i]))) {
//       throw new Error("Some values are not numbers");
//     }
//   }

//   return args.slice(2).map((arg) => Number(arg));
// };

// const [target, ...hours] = parseArguments(process.argv);
// console.log(target, hours);

// console.log(calculateExercises(hours, target));

export default calculateExercises;
