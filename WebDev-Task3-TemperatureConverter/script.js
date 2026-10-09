
const converterForm = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const inputUnit = document.getElementById("inputUnit");
const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Absolute-zero limits for each input unit.
const ABSOLUTE_ZERO = {
  C: -273.15,
  F: -459.67,
  K: 0
};

// Convert the input temperature to Celsius first.
function convertToCelsius(value, unit) {
  if (unit === "C") {
    return value;
  }

  if (unit === "F") {
    return (value - 32) * 5 / 9;
  }

  if (unit === "K") {
    return value - 273.15;
  }
}

// Display a result to 2 decimal places,
// removing unnecessary trailing zeros.
function formatTemperature(value) {
  const rounded = Number(value.toFixed(2));
  return rounded.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    useGrouping: false
  });
}

// Clear old results when the input becomes invalid.
function clearResults() {
  celsiusResult.textContent = "—";
  fahrenheitResult.textContent = "—";
  kelvinResult.textContent = "—";
}

// Show an error and clear the previous results.
function showError(message) {
  errorMessage.textContent = message;
  temperatureInput.setAttribute("aria-invalid", "true");
  clearResults();
}

// Remove the previous error message.
function clearError() {
  errorMessage.textContent = "";
  temperatureInput.removeAttribute("aria-invalid");
}

// Validate the input and display feedback in real time.
function validateInput() {
  const rawValue = temperatureInput.value;

  if (rawValue.trim() === "") {
    showError("Please enter a temperature value.");
    return false;
  }

  const value = temperatureInput.valueAsNumber;

  if (!Number.isFinite(value)) {
    showError("Please enter a valid numeric temperature.");
    return false;
  }

  if (value < ABSOLUTE_ZERO[inputUnit.value]) {
    showError(
      `Temperature cannot be below absolute zero (${ABSOLUTE_ZERO[inputUnit.value]}${inputUnit.value === "K" ? " K" : "°" + inputUnit.value}).`
    );
    return false;
  }

  clearError();
  return true;
}

// Convert and display all three temperature units.
function convertTemperature() {
  if (!validateInput()) {
    return;
  }

  const value = temperatureInput.valueAsNumber;
  const unit = inputUnit.value;

  const celsius = convertToCelsius(value, unit);
  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;

  celsiusResult.textContent = `${formatTemperature(celsius)} °C`;
  fahrenheitResult.textContent = `${formatTemperature(fahrenheit)} °F`;
  kelvinResult.textContent = `${formatTemperature(kelvin)} K`;
}

// Calculate when the user clicks the Convert button.
converterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  convertTemperature();
});

// Validate whenever the temperature changes.
temperatureInput.addEventListener("input", function () {
  validateInput();
});

// Validate again when the user changes the input unit.
inputUnit.addEventListener("change", function () {
  validateInput();
});

// Do not display an invalid value if the unit changes.
converterForm.addEventListener("change", function () {
  if (temperatureInput.value.trim() !== "") {
    validateInput();
  }
});