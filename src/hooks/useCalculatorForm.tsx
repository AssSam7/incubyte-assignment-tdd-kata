import { useCallback, useState } from "react";

function useCalculatorForm() {
  /* Local State Variables */
  const [inputData, setInputData] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  /* Calculator Logic */
  const processCalculation = useCallback(() => {
    /* Handling the inputs separated by commas */
    if (inputData !== "" && inputData.match(/^[1-8](,[1-8])*$/)) {
      const numbers = inputData.split(",");

      const sum = numbers.reduce((acc, cur) => {
        const num = parseInt(cur, 10);
        if (num < 0) {
          throw new Error("Negatives not allowed");
        }
        return acc + num;
      }, 0);
      setResult(sum);
    }

    /* Handling the inputs separated by \n & commas */
    if (inputData !== "" && inputData.match(/^[1-8]\\n([1-8],[1-8])+$/)) {
      const numbers = inputData.split("\n").map((line) => line.split(","));

      const sum = numbers.reduce((acc, cur) => {
        return (
          acc +
          cur.reduce((acc, cur) => {
            const num = parseInt(cur, 10);
            if (num < 0) {
              throw new Error("Negatives not allowed");
            }
            return acc + num;
          }, 0)
        );
      }, 0);
      setResult(sum);
    }

    /* Handling the inputs separated by custom delimiter */
    if (inputData !== "" && inputData.startsWith("//")) {
      const delimiter = inputData[2];
      const numbersArray = inputData
        .slice(5, inputData.length)
        .split(delimiter);
      console.log(numbersArray);

      const sum = numbersArray.reduce((acc, cur) => {
        const num = parseInt(cur, 10);
        if (num < 0) {
          throw new Error("Negatives not allowed");
        }
        return acc + num;
      }, 0);
      setResult(sum);
    }
  }, [inputData]);

  /* Event Handlers */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputData(e.target.value);
    },
    []
  );
  const handleCalculate = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        processCalculation();
      }, 1000);
    },
    [processCalculation]
  );

  /* Expose the state and event handlers */
  return {
    inputData,
    isCalculating,
    result,
    handleInputChange,
    handleCalculate,
  };
}

export default useCalculatorForm;
