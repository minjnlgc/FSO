interface totalProps {
    totalExercises: number;
}

const Total = ({totalExercises} : totalProps): JSX.Element => {
    return <p>Number of exercises: {totalExercises}</p>
}

export default Total;