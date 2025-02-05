import useCalculatorForm from "../hooks/useCalculatorForm";

function CalculatorForm() {
  /* Retrive the logical layer information */
  const {
    inputData,
    isCalculating,
    result,
    handleCalculate,
    handleInputChange,
    handleReset,
  } = useCalculatorForm();

  /* Render the presentation layer */
  return (
    <div className="calc-form-wrapper">
      <h1>String Calculator TDD Kata</h1>
      <form className="calc-form" onSubmit={handleCalculate}>
        <input
          type="text"
          name="operands-expression"
          id="operands-expression"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Please enter your numbers expression"
          className="calc-form__input"
        />

        <div className="flex gap-3">
          <button type="submit" className="btn-calculate">
            {isCalculating ? "Calculating" : "Calculate"}
          </button>

          <button type="button" className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      {result ? <p className="text-result">Result: {result}</p> : <></>}
    </div>
  );
}

export default CalculatorForm;
