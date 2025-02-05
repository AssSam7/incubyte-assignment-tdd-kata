import { useCallback, useState } from "react";

function useCalculatorForm() {
  /* Local State Variables */
  const [inputData, setInputData] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  /* Calculator Logic */
  const processCalculation = useCallback(() => {
    console.log("Hello");
    /* Handling the inputs separated by commas */
    if (
      inputData !== "" &&
      parseInt(inputData[0]) > 0 &&
      !inputData.includes("\n")
    ) {
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
    if (inputData !== "" && inputData.includes("\n")) {
      const numbers = [
        inputData.split("\n")[0],
        ...inputData.split("\n")[1].split(","),
      ];

      console.log("Numbers: ", numbers);

      const sum = numbers.reduce((acc, cur) => {
        const num = parseInt(cur, 10);
        if (num < 0) {
          throw new Error("Negatives not allowed");
        }
        return acc + num;
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
        processCalculation();
        setIsCalculating(false);
      }, 1000);
    },
    [processCalculation]
  );

  const handleReset = () => {
    setInputData("");
    setResult(null);
  };

  /* Expose the state and event handlers */
  return {
    inputData,
    isCalculating,
    result,
    handleInputChange,
    handleCalculate,
    handleReset,
  };
}

export default useCalculatorForm;
