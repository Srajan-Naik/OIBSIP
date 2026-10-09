
# Temperature Converter Website

## Project Information
- Internship: Oasis Infobyte (OIBSIP)
- Track: Web Development
- Task: Task 3 – Temperature Converter Website

## Description
An interactive temperature converter built using HTML5, CSS3,
and Vanilla JavaScript. It converts temperatures between Celsius,
Fahrenheit, and Kelvin.

## Features
- Numeric temperature input
- Celsius, Fahrenheit, and Kelvin input selection
- Simultaneous display of all three temperature units
- Convert button
- Real-time input validation
- Absolute-zero validation
- Error messages for invalid input
- Responsive and centred user interface

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)

## How to Run
1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Open index.html in your browser, or use the VS Code Live Server extension.

## Conversion Formulas
- Fahrenheit = (Celsius × 9/5) + 32
- Celsius = (Fahrenheit − 32) × 5/9
- Kelvin = Celsius + 273.15
- Celsius = Kelvin − 273.15

## Validation
The application rejects temperatures below absolute zero:
- Celsius: -273.15 °C
- Fahrenheit: -459.67 °F
- Kelvin: 0 K

## Project Structure
TemperatureConverter/
├── index.html
├── style.css
├── script.js
└── README.md