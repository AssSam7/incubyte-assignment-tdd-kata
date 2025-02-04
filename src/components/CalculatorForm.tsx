export const CalculatorForm = () => {
  return (
    <div className="calc-form-wrapper">
      <h1>String Calculator TDD Kata</h1>
      <form className="calc-form">
        <label htmlFor="operands-expression">
          <span>Operands Expression</span>
          <input
            type="number"
            name="operands-expression"
            id="operands-expression"
            placeholder="Please enter your operands expression"
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
};
