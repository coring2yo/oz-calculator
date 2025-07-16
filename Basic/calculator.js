// 변수 선언
var currentExpression = ""; // 전체 계산식 문자열
let firstNumber = null;        
let operator = null;           
let waitingForSecond = false;

const display = document.getElementById("display");

// 에러 표시 함수 (디스플레이에 출력)
function showError(msg) {
  display.textContent = "에러: " + msg;
  display.style.color = "red";
}

// 에러 초기화
function clearError() {
  display.style.color = "black";
}

// 숫자 입력 처리
function appendNumber(num) {
  if (!/^[0-9]$/.test(num)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }
  clearError();

  currentExpression += num;
  display.textContent = currentExpression;
}

// 연산자 설정
function setOperator(op) {
  if (!["+", "-", "*", "/"].includes(op)) {
    showError("유효한 연산자를 입력하세요.");
    return;
  }
  if (currentExpression === "" || /[+\-*/]$/.test(currentExpression)) {
    // 계산식이 비었거나 끝이 이미 연산자이면 에러
    showError("숫자를 먼저 입력하세요.");
    return;
  }
  clearError();

  currentExpression += op;
  display.textContent = currentExpression;
}

// 계산 실행 (= 버튼)
function calculate() {
  if (currentExpression === "" || /[+\-*/]$/.test(currentExpression)) {
    showError("계산할 수 없습니다.");
    return;
  }
  clearError();

  // 안전하게 eval 대신 계산 로직 작성 (단순 사칙연산)
  try {
    // 0으로 나누기 체크
    if (currentExpression.includes("/0")) {
      // 좀 더 정확하게 0으로 나누는 부분 체크해도 됨
      showError("0으로 나눌 수 없습니다.");
      return;
    }

    // eval은 위험하지만 여기선 간단히 사용 (정규식으로 숫자와 연산자만 허용 검증 후 사용 권장)
    // 아래는 eval 쓰는 대신 Function 생성자 사용
    const safeExpr = currentExpression.replace(/[^0-9+\-*/.]/g, "");
    const func = new Function("return " + safeExpr);
    const result = func();

    currentExpression = String(result);
    display.textContent = currentExpression;
  } catch (e) {
    showError("잘못된 계산식입니다.");
  }
}

// 초기화 (C 버튼)
function clearAll() {
  currentExpression = "";
  clearError();
  display.textContent = "0";
}

// 백스페이스 (← 버튼)
function backspace() {
  if (currentExpression.length > 0) {
    currentExpression = currentExpression.slice(0, -1);
    display.textContent = currentExpression === "" ? "0" : currentExpression;
  }
  clearError();
}

// 이벤트 리스너 연결
document.querySelectorAll(".number-btn").forEach(button => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});
document.querySelectorAll(".operator-btn").forEach(button => {
  button.addEventListener("click", () => {
    setOperator(button.getAttribute("data-op"));
  });
});
document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("equals").addEventListener("click", calculate);

// 초기 화면 세팅
clearAll();
