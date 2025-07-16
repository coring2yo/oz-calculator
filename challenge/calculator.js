// 전역 변수 선언 (var, let, const 각각 1회 이상 사용)
var currentExpression = "";
let history = [];
const display = document.getElementById("display");

// 에러 메시지 출력 함수
function showError(msg) {
  display.textContent = "에러: " + msg;
  display.classList.add("error");
}

// 에러 제거 함수
function clearError() {
  display.classList.remove("error");
}

// 숫자 입력 함수 (함수 선언문)
function appendNumber(num) {
  clearError();

  // 0으로 시작 방지
  if (currentExpression === "0") {
    currentExpression = num;
  } else {
    currentExpression += num;
  }
  display.textContent = currentExpression;
}

// 연산자 입력 함수 (함수 표현식)
const setOperator = function(op) {
  clearError();

  // 숫자 없이 연산자 입력 방지
  if (currentExpression === "" || /[+\-*/]$/.test(currentExpression)) {
    showError("숫자를 먼저 입력하세요.");
    return;
  }

  currentExpression += op;
  display.textContent = currentExpression;
};

// 계산 실행 함수 (화살표 함수) + 예외 처리, 기록 저장, 기록 출력
const calculate = () => {
  if (currentExpression === "" || /[+\-*/]$/.test(currentExpression)) {
    showError("계산할 수 없습니다.");
    return;
  }
  clearError();

  // 0으로 나누기 예외 검사
  if (/\/0(?!\d)/.test(currentExpression)) {
    showError("0으로 나눌 수 없습니다.");
    return;
  }

  try {
    // 안전하게 eval 수행
    const result = eval(currentExpression);

    if (typeof result !== "number" || isNaN(result)) {
      throw new Error("잘못된 계산식입니다.");
    }

    // 기록 저장 (객체로 저장)
    history.push({
      expression: currentExpression,
      result: result,
    });

    renderHistory();

    currentExpression = String(result);
    display.textContent = currentExpression;
  } catch (e) {
    showError("잘못된 계산식입니다.");
  }
};

// 기록 출력 함수 (for 반복문 사용)
function renderHistory() {
  const historyDiv = document.getElementById("history");
  let text = "기록:\n";
  for (let i = 0; i < history.length; i++) {
    text += history[i].expression + " = " + history[i].result + "\n";
  }
  historyDiv.textContent = text.trim();
}

// 초기화 함수
function clearAll() {
  currentExpression = "";
  clearError();
  display.textContent = "0";
}

// 백스페이스 기능 구현 (마지막 글자 삭제)
function backspace() {
  clearError();
  if (currentExpression.length > 0) {
    currentExpression = currentExpression.slice(0, -1);
    display.textContent = currentExpression === "" ? "0" : currentExpression;
  }
}

// 버튼 이벤트 리스너 등록
document.querySelectorAll(".number-btn").forEach(btn => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

document.querySelectorAll(".operator-btn").forEach(btn => {
  btn.addEventListener("click", () => setOperator(btn.getAttribute("data-op")));
});

document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("equals").addEventListener("click", calculate);

// 초기 상태 세팅
clearAll();
