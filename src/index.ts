const inquirer = require("inquirer");

interface QUESTIONS {
  name: string;
  message: string;
  type: string;
  choices?: string[];
}
interface ANSWERS {
  userID: number;
  pin: number;
  choice?: string;
}

const USER_ID = 1234;
const PIN = 1234;

const questions: QUESTIONS[] = [
  {
    name: "userID",
    message: "Enter your User ID (4 Digits):",
    type: "number",
  },
  {
    name: "pin",
    message: "Enter your PIN (4 Digits):",
    type: "number",
  },
];

const playAgain: QUESTIONS[] = [
  {
    name: "choice",
    message: "Want to try again?",
    type: "list",
    choices: ["YES", "NO"],
  },
];

const askQuestion = (questions: QUESTIONS[]): Promise<ANSWERS> => {
  return inquirer.prompt(questions);
};

const handleAnswers = (ans: ANSWERS) => {
  const { userID, pin } = ans;

  if (userID === USER_ID && pin === PIN) {
    console.log("Logged in");
    generateData(userID);
  } else {
    console.log("Wrong credentials");
    askQuestion(playAgain).then((ans: ANSWERS) => {
      if (ans.choice === "YES") {
        askQuestion(questions).then((ans: ANSWERS) => handleAnswers(ans));
      }
    });
  }
};

const generateData = (userID: number) => {
  const balance = Math.floor(Math.random() * 100000) + 1;

  console.log(`User ID: ${userID}`);
  console.log(`Balance: ${balance}`);
};

askQuestion(questions).then((ans: ANSWERS) => handleAnswers(ans));
