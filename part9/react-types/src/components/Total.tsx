type Props = {
  totalExercises: number;
};

function Total({ totalExercises }: Props) {
  return <div>Number of exercises {totalExercises}</div>;
}

export default Total;
