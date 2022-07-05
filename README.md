# Javascript Calculator - Emily Mitcheson-Smith
Built in HTML, SCSS, and Javascript

## Javascript functionality
### Input
Calculator needed a way to handle one or more inputs.
- On mouse click, store numerical input as string in array
    - num1Array if operator undefined
    - num2Array if operator defined
    - Checks to ensure only 1 decimal point
- On mouse click, store operator as variable
- Display current input on screen
- Add current input to history and display on screen

### Calculation
Calculator must perform basic mathematics.
- Convert input arrays into numbers
- Functions defined to perform:
    - Addition
    - Subtraction
    - Multiplication
    - Division
- Additional functions defined to perform:
    - AC: reset calculator to empty
    - +-: change sign of number
    - %: find percentage, as a decimal or as a number
- Checks established to ensure no illegal maths e.g. dividing by 0

### Results
Calculator must display result to user.
- Function defined to display result
    - Accounts for multiple operator input
    - Rounds long decimals

<br><br>
## HTML & SCSS
- Mobile-first design
- Separated SCSS
- BEM
- Flex and grid layouts