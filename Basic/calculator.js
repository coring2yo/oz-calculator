// 변수 선언: var, let, const 각각 사용
var firstNumber = null;
let currentInput = "";
const operators = ["+", "-", "*", "/"];
let operator = null;
const history = [];
const display = document.getElementById("display");
const resultDiv = document.getElementById("result");

// 에러 출력 함수
function showError(msg) {
  resultDiv.textContent = "에러: " + msg;
  resultDiv.style.color = "red";
}

// 에러 초기화 함수
function clearError() {
  resultDiv.textContent = "";
  resultDiv.style.color = "black";
}

// 숫자 입력 함수
function appendNumber(number) {
  clearError();
  if (!/^[0-9]$/.test(number)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }
  currentInput += number;
  display.textContent = currentInput;
}

// 연산자 설정 함수
function setOperator(op) {
  clearError();
  if (!operators.includes(op)) {
    showError("유효한 연산자가 아닙니다.");
    return;
  }
  if (currentInput === "") {
    showError("숫자를 먼저 입력하세요.");
    return;
  }
  const num = Number(currentInput);
  if (isNaN(num)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }
  firstNumber = num;
  operator = op;
  currentInput = "";
  display.textContent = "0";
}

// 계산 실행 함수
function calculate() {
  clearError();
  if (firstNumber === null || operator === null || currentInput === "") {
    showError("계산할 수 없습니다.");
    return;
  }
  let secondNumber = Number(currentInput);
  if (isNaN(secondNumber)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }
  if (operator === "/" && secondNumber === 0) {
    showError("0으로 나눌 수 없습니다.");
    return;
  }
  let varResult;
  switch (operator) {
    case "+":
      varResult = firstNumber + secondNumber;
      break;
    case "-":
      varResult = firstNumber - secondNumber;
      break;
    case "*":
      varResult = firstNumber * secondNumber;
      break;
    case "/":
      varResult = firstNumber / secondNumber;
      break;
    default:
      showError("알 수 없는 연산자입니다.");
      return;
  }
  // 결과 출력
  display.textContent = varResult;
  resultDiv.textContent = "결과: " + varResult;
  resultDiv.style.color = "black";

  // 기록 저장
  history.push({
    firstNumber,
    operator,
    secondNumber,
    result: varResult,
  });
  console.log(JSON.stringify(history));

  // 초기화
  firstNumber = null;
  operator = null;
  currentInput = "";
}

// 초기화 버튼
function clearAll() {
  clearError();
  currentInput = "";
  firstNumber = null;
  operator = null;
  display.textContent = "0";
  resultDiv.textContent = "";
}

// 이벤트 등록
document.querySelectorAll(".number-btn").forEach(button => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelectorAll(".operator-btn").forEach(button => {
  button.addEventListener("click", () => setOperator(button.getAttribute("data-op")));
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearAll);

// 초기 디스플레이 세팅
clearAll();
