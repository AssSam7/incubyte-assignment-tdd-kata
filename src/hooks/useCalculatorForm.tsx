import { useCallback, useState } from "react";

function useCalculatorForm() {
  /* Local State Variables */
  const [inputData, setInputData] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  /* Calculator Logic */
  const processCalculation = useCallback(() => {
    if (inputData !== "") {
      const operands = inputData.split(",");

      const sum = operands.reduce((acc, cur) => {
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
