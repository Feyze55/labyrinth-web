function generateMathQuestion() {
  // Randomly select a category
  const categories = ["squares", "equations", "angles"];
  const category = categories[Math.floor(Math.random() * categories.length)];

  let question = "";
  let answer = "";
  let hint = "";

  switch(category) {
    case "squares":
      // Random number between 1 and 12
      const num = Math.floor(Math.random() * 12) + 1;
      question = `What number is ${num} squared?`;
      answer = num * num;
      hint = `This number is divisible by ${num}.`;
      break;

    case "equations":
      // Random coefficients for a linear equation
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const c = Math.floor(Math.random() * 20) + 1;
      question = `Solve for X: ${a}x + ${b} = ${c}`;
      answer = (c - b) / a;
      hint = `Move the constant (${b}) to the other side and divide by ${a}.`;
      break;

    case "angles":
      // Random angle type
      const angles = ["Acute", "Obtuse", "Right", "Reflex"];
      const angleType = angles[Math.floor(Math.random() * angles.length)];
      question = `What kind of angle is ${Math.floor(Math.random() * 360)} degrees?`;
      answer = angleType;
      hint = `Refer to the angle types: Acute, Obtuse, Right, Reflex.`;
      break;
  }

  return { question, answer, hint };
}

// Example usage:
const randomQuestion = generateMathQuestion();
console.log(randomQuestion.question);
console.log("Answer:", randomQuestion.answer);
console.log("Hint:", randomQuestion.hint);
