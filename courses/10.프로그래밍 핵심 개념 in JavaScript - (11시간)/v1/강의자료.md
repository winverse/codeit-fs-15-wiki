# 10. 프로그래밍 핵심 개념 in JavaScript - (11시간)

## 1. 자료형

### 01. 숫자형

자바스크립트에서 숫자를 다루는 방법을 알아봅시다. 우리가 일상에서 사용하는 정수와 소수를 자바스크립트에서는 모두 **숫자형(Number)** 데이터로 취급합니다.

---

### 사칙연산

숫자형 데이터는 기본적인 사칙연산이 가능합니다.

- `+` (덧셈)
- (뺄셈)
- (곱셈)
- `/` (나눗셈)

온라인 상점에서 상품의 가격을 계산하는 상황을 예로 들어봅시다.

```jsx
*// 덧셈*
console.log(25000 + 3000); *// 28000 (상품 가격 + 배송비)// 뺄셈*
console.log(50000 - 25000); *// 25000 (예산 - 상품 가격)// 곱셈*
console.log(25000 * 3); *// 75000 (상품 3개의 가격)// 나눗셈*
console.log(25000 / 5); *// 5000 (5개월 할부 시 1개월 납부액)*
```

---

### 특수 연산

사칙연산 외에도 자주 사용되는 유용한 연산자들이 있습니다.

### 나머지 연산 (`%`)

`%` 연산자는 왼쪽의 숫자를 오른쪽 숫자로 나눈 **나머지**를 구합니다. 상품 재고를 박스 단위로 포장할 때 유용하게 사용할 수 있습니다.

```jsx
*// 28개의 상품을 한 박스에 6개씩 담을 때, 남는 상품의 개수*
console.log(28 % 6); *// 4*
```

### 거듭제곱 연산 (`*`)

- `*` 연산자는 거듭제곱을 계산합니다. `a ** b`는 'a를 b번 곱하라'는 의미입니다.

```jsx
*// 2의 3제곱*
console.log(2 ** 3); *// 8 (2 * 2 * 2)*
```

---

### 연산자 우선순위

수학에서와 마찬가지로 자바스크립트도 연산자에는 우선순위가 있습니다. 곱셈과 나눗셈이 덧셈과 뺄셈보다 먼저 계산됩니다.

```jsx
*// 3000 * 3이 먼저 계산됩니다.*
console.log(1000 + 3000 * 3); *// 10000*
```

만약 덧셈을 먼저 계산하고 싶다면, 소괄호 `()`를 사용하여 우선순위를 직접 지정할 수 있습니다.

```jsx
*// (1000 + 3000)이 먼저 계산됩니다.*
console.log((1000 + 3000) * 3); *// 12000*
```

이처럼 자바스크립트의 숫자형 데이터는 우리가 아는 수학적 규칙을 대부분 그대로 따르므로, 직관적으로 이해하고 사용하기 쉽습니다.

### 01. #Quiz 숫자형  (10분)

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요.

```jsx
*// 1. 덧셈과 곱셈*
console.log(10 + 5 * 2);

*// 2. 괄호가 있는 연산*
console.log((10 + 5) * 2);

*// 3. 나머지 연산*
console.log(15 % 4);

*// 4. 거듭제곱 연산*
console.log(3 ** 4);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    *// 1. 덧셈과 곱셈*
    console.log(10 + 5 * 2); *// 20
    
    // 2. 괄호가 있는 연산*
    console.log((10 + 5) * 2); *// 30
    
    // 3. 나머지 연산*
    console.log(15 % 4); *// 3
    
    // 4. 거듭제곱 연산*
    console.log(3 ** 4); *// 81*
    ```
    
    해설:
    
    1. 곱셈(*)이 덧셈(+)보다 우선순위가 높으므로 5 * 2가 먼저 계산되어 10이 되고, 10 + 10의 결과인 20이 출력된다
    2. 소괄호() 안의 연산이 가장 먼저 실행되므로 10 + 5가 먼저 계산되어 15가 되고, 15 * 2의 결과인 30이 출력된다
    3. 15를 4로 나눈 나머지는 3이다 (15 = 4 * 3 + 3)
    4. 3의 4제곱은 3 * 3 * 3 * 3과 같으므로 81이 출력된다

---

### 문제 2

세 명의 친구가 저녁 식사 비용으로 총 54,000원이 나왔습니다. 이 비용을 똑같이 나누어 내려고 합니다. let을 사용하여 totalCost와 numberOfFriends 변수를 선언하고 각각 54,000과 3을 할당하세요. 그 후, 한 사람당 내야 할 금액을 계산하여 costPerPerson 변수에 저장하고, 이 변수를 콘솔에 출력해보세요.

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let totalCost = 54000;
    let numberOfFriends = 3;
    
    let costPerPerson = totalCost / numberOfFriends;
    
    console.log(costPerPerson); *// 18000*
    ```
    
    해설:
    
    총비용을 의미하는 totalCost 변수와 친구들의 수를 의미하는 numberOfFriends 변수를 선언하고 값을 할당했다
    
    그 후, 나눗셈 연산자(/)를 사용하여 총비용을 인원수로 나누어 한 사람당 내야 할 금액을 계산하고
    
    그 결과를 costPerPerson 변수에 저장하여 출력했다
    

### 03. 문자열 기본

프로그래밍을 하다 보면 숫자뿐만 아니라 '이름', '주소', '메시지'와 같은 글자들을 다뤄야 할 때가 많습니다. 자바스크립트에서는 이러한 글자 데이터를 **문자열(String)** 자료형으로 다룹니다.

---

### 문자열 만들기

문자열은 텍스트를 따옴표로 감싸서 만듭니다. **작은따옴표(`'`)** 또는 **큰따옴표(`"`)**를 사용할 수 있습니다.

```jsx
console.log('Hello, World!');
console.log("I love JavaScript!");
```

**주의할 점:** 시작과 끝은 반드시 같은 종류의 따옴표를 사용해야 합니다.

```jsx
console.log('혼합해서 사용하면?); *// SyntaxError: Invalid or unexpected token*
```

---

## 따옴표 안에 따옴표 사용하기

만약 문자열 안에 따옴표 자체를 포함하고 싶다면 어떻게 해야 할까요?

### 1. 다른 종류의 따옴표로 감싸기

문자열 안에 작은따옴표(`'`)를 넣고 싶다면, 전체 문자열을 큰따옴표(`"`)로 감싸면 됩니다.

```jsx
console.log("그가 말했습니다. '안녕!'");
```

반대로 큰따옴표(`"`)를 넣고 싶다면, 작은따옴표(`'`)로 감싸면 됩니다.

```jsx
console.log('자바스크립트의 별명은 "JS"입니다.');
```

### 2. 이스케이프 시퀀스(`\`) 사용하기

만약 같은 종류의 따옴표를 꼭 사용해야 한다면, 따옴표 앞에 **역슬래시(`\`)**를 붙여서 이 따옴표가 문자열을 끝내는 기호가 아닌, 단순한 글자임을 알려줄 수 있습니다.

```jsx
console.log('그가 말했습니다. \'안녕!\'');
```

---

## 문자열 연산

### 문자열 연결 (`+`)

`+` 연산자는 문자열들을 하나로 이어 붙이는 역할을 합니다.

```jsx
console.log('Hello, ' + 'World!'); *// 'Hello, World!'*
```

변수와 함께 사용하면 더욱 유용합니다.

```jsx
let name = '김코딩';
let message = '안녕하세요, ' + name + '님!';

console.log(message); *// '안녕하세요, 김코딩님!'*
```

### 숫자처럼 보이는 문자열

**주의!** 따옴표 안에 있는 숫자는 숫자형(Number)이 아닌 문자열(String)입니다. `+` 연산을 하면 숫자의 덧셈이 아닌 문자열의 연결이 일어납니다.

```jsx
console.log(100 + 50);   *// 150 (숫자 덧셈)*
console.log('100' + '50'); *// '10050' (문자열 연결)*
```

이처럼 값의 자료형에 따라 같은 연산자(`+`)라도 다르게 동작할 수 있으므로, 내가 다루는 값의 자료형이 무엇인지 항상 명확히 인지하는 것이 중요합니다.

### 03. #Quiz 문자열 기본

### 문제 1

아래 코드에서 `greeting` 변수에 문자열 "Hello, World!"가 할당되도록 빈칸을 채워보세요.

```jsx
let greeting = 'Hello, ' + _____; 

console.log(greeting);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let greeting = 'Hello, ' + 'World!';
    
    console.log(greeting);
    ```
    
    해설:
    
    `+` 연산자는 두 문자열을 하나로 이어 붙이는 역할을 한다
    
    'Hello, ' 문자열 뒤에 'World!' 문자열을 더하여 greeting 변수에 'Hello, World!'라는 전체 문자열을 할당할 수 있다
    

---

### 문제 2

아래 코드의 실행 결과를 예상해보세요. 숫자와 문자열의 `+` 연산이 어떻게 다른지 생각해보세요.

```jsx
let num1 = 20;
let num2 = 24;

let str1 = '20';
let str2 = '24';

console.log(num1 + num2);
console.log(str1 + str2);
```

- 정답 및 해설
    
    실행 결과:
    
    ```jsx
    44
    2024
    ```
    
    해설:
    
    num1 + num2: num1과 num2는 모두 숫자형(Number)이므로, + 연산자는 수학적인 덧셈을 수행하여 44를 출력한다
    
    str1 + str2: str1과 str2는 모두 문자열(String)이므로, + 연산자는 두 문자열을 이어 붙이는 연결 연산을 수행하여 '2024'를 출력한다
    
    이처럼 + 연산자는 피연산자의 자료형에 따라 다르게 동작하므로, 값의 자료형을 정확히 파악하는 것이 매우 중요하다
    

---

### 문제 3

문자열 안에 작은따옴표(`'`)와 큰따옴표(`"`)를 모두 포함하는 문장을 만들어 `sentence` 변수에 할당하고 출력해보세요.

**출력할 문장:** `He said, "I'm a programmer."`

- 정답 및 해설
    
    정답 코드 (방법 1: 이스케이프 시퀀스 사용):
    
    ```jsx
    let sentence = "He said, \"I'm a programmer.\"";
    
    console.log(sentence);
    ```
    
    정답 코드 (방법 2: 이스케이프 시퀀스 사용):
    
    ```jsx
    let sentence = 'He said, "I\'m a programmer."';
    
    console.log(sentence);
    ```
    
    해설:
    
    문자열 안에 문자열을 감싸는 따옴표와 같은 종류의 따옴표를 넣으려면, 그 따옴표가 특별한 기능이 없는 일반 문자임을 알려주는 이스케이프 시퀀스($$를 앞에 붙여주어야 한다
    
    방법 1: 전체를 큰따옴표(")로 감쌌으므로, 내부의 큰따옴표 앞에만 \를 붙여준다 ("")
    
    방법 2: 전체를 작은따옴표(')로 감쌌으므로, 내부의 작은따옴표 앞에만 \를 붙여준다 ('')
    
    참고: 이후에 배울 템플릿 리터럴을 사용하면 이 문제를 더 쉽게 해결할 수 있다
    

### 04. 문자열 활용

문자열을 만드는 기본 방법을 배웠으니, 이제 문자열을 더 다양하게 활용하는 방법을 알아봅시다.

---

### 문자열 길이 확인하기 (`.length`)

문자열의 길이를 알고 싶을 때는 문자열 뒤에 `.length`를 붙여줍니다.

```jsx
let myStatus = 'Hello, World!';
console.log(myStatus.length); *// 13*
```

`.length`는 공백과 특수문자를 포함한 모든 글자의 수를 세어줍니다.

---

### 문자열 일부만 가져오기 (`.slice()`)

`.slice(startIndex, endIndex)`를 사용하면 문자열의 일부를 잘라낼 수 있습니다.

- `startIndex`: 잘라내기 시작할 위치 (이 위치의 **글자부터 포함**)
- `endIndex`: 잘라내기를 끝낼 위치 (이 위치의 글자는 **포함하지 않음**)

**원본 문자열을 변경하지 않고**, 지정한 부분만 **새로운 문자열**로 반환합니다.

```jsx
let myStatus = 'Hello, World!';

*// 0번 위치부터 5번 위치 전까지 잘라냅니다.*
console.log(myStatus.slice(0, 5)); *// 'Hello'

// 7번 위치부터 끝까지 잘라냅니다.*
console.log(myStatus.slice(7)); *// 'World!'*
```

---

## 대소문자 바꾸기

- `.toUpperCase()`: 모든 글자를 대문자로 바꿉니다.
- `.toLowerCase()`: 모든 글자를 소문자로 바꿉니다.

```jsx
let myStatus = 'Hello, World!';

console.log(myStatus.toUpperCase()); *// 'HELLO, WORLD!'*
console.log(myStatus.toLowerCase()); *// 'hello, world!'*
```

---

## 특정 글자 찾기

- `.includes(searchText)`: 문자열에 `searchText`가 포함되어 있는지 확인하고, 결과를 `true` 또는 `false`로 반환합니다.
- `.indexOf(searchText)`: 문자열에 `searchText`가 처음으로 나타나는 위치(index)를 반환합니다. 만약 포함되어 있지 않다면 `1`을 반환합니다.

```jsx
let myStatus = 'Hello, World!';

console.log(myStatus.includes('Hello')); *// true*
console.log(myStatus.includes('Bye'));   *// false*

console.log(myStatus.indexOf('World')); *// 7*
console.log(myStatus.indexOf('Bye'));   *// -1*
```

이처럼 문자열 뒤에 점(`.`)을 찍어 사용하는 다양한 기능들을 **메소드(Method)**라고 부릅니다. 앞으로 더 많은 유용한 메소드들을 배우게 될 것입니다.

### 04. #Quiz 문자열 활용 (10분)

### 문제 1

아래 `title` 변수에 할당된 문자열의 길이를 `.length`를 사용하여 구하고, `titleLength` 변수에 저장한 후 콘솔에 출력해보세요.

```jsx
let title = 'JavaScript Basics';
let titleLength;

*// 여기에 코드를 작성하세요.*

console.log(titleLength);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let title = 'JavaScript Basics';
    let titleLength;
    
    titleLength = title.length;
    
    console.log(titleLength); *// 17*
    ```
    
    해설:
    
    문자열 변수 뒤에 .length를 붙이면 해당 문자열의 길이(공백 포함)를 숫자로 반환한다
    
    'JavaScript Basics'는 총 17개의 문자로 이루어져 있으므로 17이 출력된다
    

---

## 문제 2

아래 `fileName` 변수에서 확장자(`.js`)를 제외한 파일 이름('myFile')만 `.slice()` 메소드를 사용하여 추출하고, `baseName` 변수에 저장하여 콘솔에 출력해보세요.

```jsx
let fileName = 'myFile.js';
let baseName;

*// 여기에 코드를 작성하세요.*

console.log(baseName);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let fileName = 'myFile.js';
    let baseName;
    
    baseName = fileName.slice(0, 6);
    
    console.log(baseName); *// 'myFile'*
    ```
    
    해설:
    
    .slice(startIndex, endIndex) 메소드는 문자열의 일부를 잘라낸다
    
    파일 이름 부분은 0번째 위치부터 시작하여 6번째 위치(.) 전까지이므로 .slice(0, 6)을 사용하여 'myFile'을 추출할 수 있다
    

---

## 문제 3

사용자 아이디 `userId`가 대소문자 상관 없이 'codeit'인지 확인하는 코드를 작성해보세요. `.toUpperCase()` 메소드(또는 `.toLowerCase()`)를 사용하여 대소문자 구분 없이 비교하고, 결과를 `isValid` 변수에 저장하여 콘솔에 출력하세요. (결과는 `true` 또는 `false`로 나와야 합니다.)

```jsx
let userId = 'CoDeIt';
let isValid;

*// 여기에 코드를 작성하세요.*

console.log(isValid);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let userId = 'CoDeIt';
    let isValid;
    
    isValid = userId.toUpperCase() === 'CODEIT';
    // isValid = userId.toLowerCase() === 'codeit';
    
    console.log(isValid); *// true*
    ```
    
    해설:
    
    사용자가 아이디를 입력할 때 대소문자를 섞어 입력할 수 있으므로, 비교하기 전에 .toUpperCase() (또는 .toLowerCase())를 사용하여 모두 같은 케이스로 통일해주는 것이 좋다
    
    userId.toUpperCase()는 'CODEIT'을 반환하고, 이 값을 우리가 원하는 아이디 'CODEIT'과 === 연산자로 비교하면 true라는 결과를 얻을 수 있다
    

### 05. #실습 문자열 실습 I (5분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3381
```

### 06. #실습 문자열 실습 II (5분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3382
```

### 07. 불 대수

프로그래밍은 단순히 숫자만 계산하는 것이 아니라, '이 조건이 맞는가?', '저 조건은 틀렸는가?'와 같은 논리적인 판단을 끊임없이 해야 합니다 이러한 논리적 판단의 기초가 되는 것이 바로 **불 대수(Boolean Algebra)**입니다.

---

### 진리값(Truth Value)

불 대수에서는 오직 두 가지 값만 사용합니다.

- `true` (참)
- `false` (거짓)

이 두 값을 **진리값**이라고 부릅니다 그리고 이 진리값을 가지는 문장을 **명제**라고 합니다 명제는 참 또는 거짓이 명확해야 합니다.

- "10은 5보다 크다" (참인 명제)
- "겨울은 덥다" (거짓인 명제)
- "오늘 날씨 어때?" (질문이므로 명제가 아님)
- "이 노래는 좋다" (주관적이므로 명제가 아님)

---

### 불 대수의 기본 연산

불 대수에는 세 가지 기본 연산이 있습니다: **AND, OR, NOT**

### AND 연산 (그리고)

AND 연산은 **두 개의 명제가 모두 `true`일 때만** 결과가 `true`가 됩니다 하나라도 `false`가 있으면 결과는 `false`입니다.

놀이공원의 '자이로드롭' 탑승 조건을 예로 들어봅시다.

> 조건: "키가 140cm 이상이어야 한다" 그리고 "심장이 약하지 않아야 한다"
> 

| 키 140cm 이상? | 심장이 약하지 않음? | 탑승 가능? (AND) |
| --- | --- | --- |
| true | true | **true** |
| true | false | false |
| false | true | false |
| false | false | false |

### OR 연산 (또는)

OR 연산은 **두 개의 명제 중 하나라도 `true`이면** 결과가 `true`가 됩니다 두 명제 모두 `false`일 때만 결과가 `false`입니다.

이번엔 '회전목마' 탑승 조건을 봅시다.

> 조건: "보호자와 함께 탑승한다" 또는 "키가 120cm 이상이다"
> 

| 보호자 동반? | 키 120cm 이상? | 탑승 가능? (OR) |
| --- | --- | --- |
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | **false** |

### NOT 연산 (아니다)

NOT 연산은 명제의 **진리값을 반대로** 뒤집습니다 `true`는 `false`로, `false`는 `true`로 바꿉니다.

> 조건: "우대 쿠폰이 없다"
> 

| 우대 쿠폰이 있음? | 우대 쿠폰이 없음? (NOT) |
| --- | --- |
| true | false |
| false | true |

이러한 불 대수의 기본 연산들은 다음 시간에 배울 자바스크립트의 비교/논리 연산자의 기초가 됩니다 이 개념을 잘 이해해두면 복잡한 조건문을 만들 때 큰 도움이 될 것입니다.

---

### 정리

- **진리값(True/False)**: 논리적 판단의 결과로 얻어지는 값
- **명제(Proposition)**: 참 또는 거짓이 명확히 결정되는 문장
- **AND 연산**: 두 값 모두 참일 때만 결과가 참
- **OR 연산**: 둘 중 하나만 참이면 결과가 참
- **NOT 연산**: 참과 거짓을 **뒤집는** 연산

### 07. #Quiz 불 대수 (10분)

### 문제 1

다음 문장들을 보고 **명제**인 것과 명제가 아닌 것을 구분해보세요.

1. "지구는 태양계의 세 번째 행성이다."
2. "오늘 점심 뭐 먹지?"
3. "100은 5보다 작다."
4. "이 영화는 재미있다."

- 정답 및 해설
    - 명제: 1번, 3번
    - 명제가 아님: 2번, 4번
    
    해설:
    
    명제는 참(true) 또는 거짓(false)을 명확하게 판별할 수 있는 문장이다
    
    1번은 과학적 사실로 참이 명확해 명제
    
    2번은 의문문이므로 명제가 아님
    
    3번은 수학적으로 거짓이 명확해 명제
    
    4번은 주관적 느낌이므로 명제가 아님
    

---

### 문제 2

어떤 웹사이트의 회원가입 조건이 다음과 같다고 할 때, 각 시나리오별로 가입이 가능한지 불가능한지를 `true` 또는 `false`로 답해보세요.

> 가입 조건: "이메일 인증을 통과했다" AND "만 14세 이상이다"
> 

| 시나리오 | 이메일 인증 통과? | 만 14세 이상? | 가입 가능? |
| --- | --- | --- | --- |
| A | `true` | `true` |  |
| B | `true` | `false` |  |
| C | `false` | `true` |  |
- 정답 및 해설
    
    
    | 시나리오 | 이메일 인증 통과? | 만 14세 이상? | 가입 가능? |
    | --- | --- | --- | --- |
    | A | `true` | `true` | **`true`** |
    | B | `true` | `false` | **`false`** |
    | C | `false` | `true` | **`false`** |
    
    해설:
    
    AND 연산은 두 조건이 모두 true일 때만 결과가 true가 된다
    
    - 시나리오 A: 두 조건 모두 true이므로 가입 가능
    - 시나리오 B: 만 14세 이상이 false이므로 가입 불가
    - 시나리오 C: 이메일 인증 통과가 false이므로 가입 불가

---

## 문제 3

미술관 할인 조건이 다음과 같다고 할 때, 각 시나리오별로 할인이 가능한지 불가능한지를 `true` 또는 `false`로 답해보세요.

> 할인 조건: "학생이다" OR "20세 미만이다"
> 

| 시나리오 | 학생? | 20세 미만? | 할인 가능? |
| --- | --- | --- | --- |
| A | `true` | `true` |  |
| B | `true` | `false` |  |
| C | `false` | `true` |  |
| D | `false` | `false` |  |
- 정답 및 해설
    
    
    | 시나리오 | 학생? | 20세 미만? | 할인 가능? |
    | --- | --- | --- | --- |
    | A | `true` | `true` | **`true`** |
    | B | `true` | `false` | **`true`** |
    | C | `false` | `true` | **`true`** |
    | D | `false` | `false` | **`false`** |
    
    해설:
    
    OR 연산은 두 조건 중 하나라도 true이면 결과가 true가 된다
    
    A, B, C 시나리오 모두 할인 조건 중 하나 이상 충족해서 할인 가능
    
    D는 어떤 조건도 충족하지 않아 할인 불가
    

### 08. 불린형

지난 시간에 배운 불 대수의 `true`와 `false`를 자바스크립트에서는 **불린(Boolean)** 이라는 자료형으로 다룹니다 불린은 조건문이나 반복문처럼 코드의 흐름을 제어하는 데 아주 중요하게 사용됩니다.

---

### 비교 연산자

불린 값을 만드는 가장 기본적인 방법은 **비교 연산자**를 사용하는 것입니다.

| 연산자 | 의미 | 예시 | 결과 |
| --- | --- | --- | --- |
| `>` | ~보다 크다 | `5 > 3` | `true` |
| `<` | ~보다 작다 | `5 < 3` | `false` |
| `>=` | ~보다 크거나 같다 | `5 >= 5` | `true` |
| `<=` | ~보다 작거나 같다 | `5 <= 3` | `false` |
| `===` | 같다 | `5 === 5` | `true` |
| `!==` | 다르다 | `5 !== 3` | `true` |

```jsx
let myAge = 25;

console.log(myAge > 20);  *// true*
console.log(myAge === 25); *// true*
console.log(myAge !== 25); *// false*
```

문자열도 비교할 수 있습니다

```jsx
let userId = 'codeit';

console.log(userId === 'codeit'); *// true*
console.log(userId !== 'Codeit'); *// true (대소문자를 구분하므로)*
```

---

### 논리 연산자

불 대수에서 배운 AND, OR, NOT 연산은 자바스크립트에서 **논리 연산자**로 구현됩니다.

### AND 연산자 (`&&`)

`&&` 연산자는 양쪽의 값이 **모두** `true`일 때만 `true`를 반환합니다.

> 프리미엄 멤버십 조건: "로그인 상태이다" 그리고 "유료 회원이다"
> 

```jsx
let isLoggedIn = true;
let isPremium = false;

console.log(isLoggedIn && isPremium); *// false*
```

### OR 연산자 (`||`)

`||` 연산자는 양쪽의 값 중 **하나라도** `true`이면 `true`를 반환합니다.

> 게시물 열람 조건: "작성자 본인이다" 또는 "관리자이다"
> 

```jsx
let isOwner = false;
let isAdmin = true;

console.log(isOwner || isAdmin); *// true*
```

### NOT 연산자 (`!`)

`!` 연산자는 불린 값을 **반대로** 뒤집습니다.

> 로그아웃 상태 확인: "로그인 상태가 아니다"
> 

```jsx
let isLoggedIn = true;

console.log(!isLoggedIn); *// false*
```

이러한 비교/논리 연산자들은 앞으로 배울 `if`문, `for`문 등에서 코드의 실행 흐름을 결정하는 핵심적인 역할을 합니다.

### 정리

- **불린(Boolean)**: 참 또는 거짓을 나타내는 논리 자료형
- **비교 연산자**: 두 값의 관계를 비교하여 true 또는 false를 반환하는 연산자
- **논리 연산자**: 여러 불린 값을 서로 조합하여 새로운 불린 값을 만드는 연산자
- **AND(`&&`)**: 모두 참일 때만 참
- **OR(`||`)**: 하나라도 참이면 참
- **NOT(`!`)**: 값의 진위를 뒤집음

### 08. #Quiz 불린형 (10분)

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요.

```jsx
let height = 180;
let weight = 75;
let name = 'Kim';

*// 1. 키가 175와 일치하는가?*
console.log(height === 175);

*// 2. 몸무게가 75와 일치하지 않는가?*
console.log(weight !== 75);

*// 3. 이름이 'Kim'과 일치하는가?*
console.log(name === 'Kim');

*// 4. 이름이 'Park'과 일치하는가?*
console.log(name === 'Park');
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    let height = 180;
    let weight = 75;
    let name = 'Kim';
    
    *// 1. 키가 175와 일치하는가?*
    console.log(height === 175); *// false
    
    // 2. 몸무게가 75와 일치하지 않는가?*
    console.log(weight !== 75); *// false
    
    // 3. 이름이 'Kim'과 일치하는가?*
    console.log(name === 'Kim'); *// true
    
    // 4. 이름이 'Park'과 일치하는가?*
    console.log(name === 'Park'); *// false*
    ```
    
    해설:
    
    - `===` 연산자는 두 값이 정확히 일치할 때 true를 반환한다
    - `!==` 연산자는 두 값이 일치하지 않을 때 true를 반환한다
    - height는 180이므로 175와 일치하지 않아 false
    - weight는 75이므로 75와 일치하여, '일치하지 않는다'는 비교는 false
    - name은 'Kim'이므로 'Kim'과 일치하여 true, 'Park'과는 일치하지 않아 false

---

### 문제 2

아래 코드의 실행 결과를 예상해보세요. 논리 연산자의 동작 방식을 생각하며 답을 골라보세요.

```jsx
let isAdult = true;
let hasTicket = false;

// 놀이기구 탑승 조건: 성인이고, 티켓을 가지고 있어야 함
let canRide = isAdult && hasTicket;

console.log(canRide);
```

1. true

2. false
3. SyntaxError

- 정답 및 해설
    
    정답**:** 2번 (`false`)
    
    해설: `&&` (AND) 연산자는 두 조건이 모두 true일 때만 true를 반환한다
    
    isAdult는 true
    
    hasTicket은 false
    
    두 조건 중 하나(hasTicket)가 false이므로, isAdult && hasTicket의 최종 결과는 false가 된다
    

---

### 문제 3

아래 코드의 실행 결과를 예상해보세요.

```jsx
let isMember = false;
let hasCoupon = true;

// 할인 적용 조건: 회원이거나, 쿠폰을 가지고 있어야 함
let canGetDiscount = isMember || hasCoupon;

console.log(canGetDiscount);
```

1. true
2. false
3. SyntaxError

- 정답 및 해설
    
    정답: 1번 (`true`)
    
    해설: `||` (OR) 연산자는 두 조건 중 하나라도 true이면 true를 반환한다
    
    isMember는 false
    
    hasCoupon은 true
    
    두 조건 중 하나(hasCoupon)가 true이므로, isMember || hasCoupon의 최종 결과는 true가 된다
    

### 09. 불린형 정리 (따로 읽기)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3483
```

### 10. #Quiz 불린형 퀴즈

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3386
```

### 11. typeof 연산자

지금까지 숫자, 문자열, 불린 등 다양한 자료형을 배웠습니다 코드를 작성하다 보면 "이 변수에 지금 어떤 자료형의 값이 들어있지?" 하고 궁금할 때가 있습니다 이럴 때 값의 자료형을 확인하는 유용한 연산자가 바로 `typeof`입니다.

---

## `typeof` 사용법

`typeof` 연산자는 뒤에 오는 값의 자료형을 **문자열**로 반환합니다.

```jsx
console.log(typeof 101);
console.log(typeof 'Hello');
console.log(typeof true);
```

**실행 결과:**

```jsx
number
string
boolean
```

`typeof`는 값뿐만 아니라, 값이 담긴 변수나 함수의 자료형도 확인할 수 있습니다.

```jsx
let name = '김코딩';
function sayHello() {
  console.log('Hello');
}

console.log(typeof name);      *// string*
console.log(typeof sayHello);  *// function*
```

---

## `typeof`와 연산자 우선순위

`typeof`도 연산자이므로, 다른 연산자와 함께 사용할 때는 **연산자 우선순위**를 주의해야 합니다.

`typeof`는 덧셈(`+`), 뺄셈(`-`)과 같은 사칙연산자보다 우선순위가 높습니다.

```jsx
console.log(typeof 'Hello' + 'World');
```

위 코드는 `'HelloWorld'`라는 문자열의 자료형인 `'string'`을 의도했을 수 있지만, 실제로는 다르게 동작합니다.

1. `typeof 'Hello'`가 먼저 실행되고, 그 결과는 문자열 `'string'`이 됩니다.
2. 결과적으로 `'string' + 'World'`라는 코드가 실행됩니다.
3. 두 문자열이 연결되어 `'stringWorld'`라는 최종 결과가 출력됩니다.

만약 연산의 결과를 먼저 구한 뒤, 그 결과값의 자료형을 확인하고 싶다면 **소괄호 `()`**를 사용하여 연산의 우선순위를 명확히 해주어야 합니다.

```jsx
console.log(typeof ('Hello' + 'World')); *// string*
console.log(typeof (10 - 3));          *// number*
```

이처럼 `typeof`를 다른 연산과 함께 사용할 때는 소괄호를 적절히 사용하여 우리가 의도한 순서대로 코드가 동작하도록 만드는 것이 중요합니다.

### **주의사항**

- 연산자 우선순위로 인해 의도하지 않은 결과가 나올 수 있으니 반드시 소괄호로 우선순위를 잡아줄 것

### 용어설명

- **typeof 연산자**: 피연산자의 자료형을 문자열로 판단해서 반환하는 연산자
- **연산자 우선순위**: 여러 연산자가 함께 쓰이면 어떤 것부터 먼저 계산하는지의 규칙

### 11. #Quiz typeof 연산자 (10분 + 5분)

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요.

```jsx
console.log(typeof 123);
console.log(typeof "123");
console.log(typeof false);
console.log(typeof (10 > 5));
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    console.log(typeof 123); *// 'number'*
    console.log(typeof "123"); *// 'string'*
    console.log(typeof false); *// 'boolean'*
    console.log(typeof (10 > 5)); *// 'boolean'*
    ```
    
    해설:
    
    - `123`: 따옴표 없는 숫자는 `number` 타입입니다.
    - `'123'`: 따옴표로 감싸여 있으므로 `string` 타입입니다.
    - `false`: `true` 또는 `false` 값은 `boolean` 타입입니다.
    - `10 > 5`: 비교 연산의 결과는 `true`이므로, `true` 값의 타입인 `boolean`입니다.

---

### 문제 2

아래 코드의 실행 결과를 예상해보고, 그 이유를 연산자 우선순위와 관련하여 설명해보세요.

```jsx
console.log(typeof 100 + 50);
```

- 정답 및 해설
    
    실행 결과:
    
    ```jsx
    number50
    ```
    
    해설:
    
    `typeof` 연산자는 `+` 연산자보다 우선순위가 높습니다. 따라서 코드는 다음과 같은 순서로 실행됩니다.
    
    1. `typeof 100`이 먼저 실행되고, 그 결과로 문자열 `'number'`가 반환됩니다.
    2. 그 다음 `'number' + 50` 연산이 실행됩니다.
    3. 문자열과 숫자를 `+`로 연산하면, 숫자가 문자열로 변환된 후 두 문자열이 연결됩니다.
    4. 따라서 `'number' + '50'`이 되어, 최종적으로 `'number50'`이라는 문자열이 출력됩니다.

---

## 문제 3

`100 + 50` 연산의 **결과값**의 자료형을 확인하는 코드를 작성해보세요. (콘솔에 `'number'`가 출력되어야 합니다.)

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    console.log(typeof (100 + 50));
    ```
    
    해설:
    
    `typeof` 연산자보다 `+` 연산을 먼저 실행시키기 위해, `100 + 50` 부분을 소괄호 `()`로 감싸주어야 합니다.
    
    1. 소괄호 안의 `100 + 50`이 먼저 계산되어 숫자 `150`이 됩니다.
    2. 그 다음 `typeof 150`이 실행됩니다.
    3. 숫자 `150`의 자료형은 `'number'`이므로, 콘솔에 `'number'`가 출력됩니다.

### 12. #Quiz typeof 연산자 퀴즈

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3388
```

### 13. 연산자 우선순위 (따로 읽기)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3389
```

### 14. 형 변환 I

웹사이트에서 사용자로부터 입력을 받을 때, 그 값은 대부분 문자열(string) 형태로 들어옵니다 만약 사용자가 입력한 나이를 가지고 계산을 하려면, 이 문자열을 숫자(number)로 바꿔주어야 합니다.

이처럼 값의 자료형을 다른 자료형으로 바꾸는 것을 **형 변환(Type Conversion)**이라고 합니다.

---

### 명시적 형 변환

개발자가 의도를 가지고 자료형을 직접 바꾸는 것을 **명시적 형 변환**이라고 합니다 자바스크립트는 형 변환을 위한 내장 함수들을 제공합니다.

### `String()`: 문자열로 변환

`String()` 함수는 어떤 자료형의 값이든 문자열로 바꿔줍니다.

```jsx
let birthYear = 1999;
console.log(birthYear);        *// 1999 (number)*
console.log(String(birthYear)); *// '1999' (string)*

let isAdult = true;
console.log(isAdult);          *// true (boolean)*
console.log(String(isAdult));   *// 'true' (string)*
```

### `Number()`: 숫자로 변환

`Number()` 함수는 값을 숫자형으로 바꿔줍니다.

```jsx
let age = '25';
console.log(age);        *// '25' (string)*
console.log(Number(age)); *// 25 (number)*

let isWorking = true;
console.log(isWorking);          *// true (boolean)*
console.log(Number(isWorking)); *// 1 (number)*

let isStudent = false;
console.log(isStudent);          *// false (boolean)*
console.log(Number(isStudent)); *// 0 (number)*
```

**주의!** 숫자 형태로 바꿀 수 없는 문자열을 `Number()` 함수로 변환하면, 그 결과는 `NaN`이 됩니다 `NaN`은 'Not-A-Number'의 약자로, 숫자가 아님을 나타내는 특별한 값입니다.

```jsx
let userName = '김코딩';
console.log(Number(userName)); *// NaN*
console*.*log*(typeof NaN); // number*
```

### `Boolean()`: 불린형으로 변환

`Boolean()` 함수는 값을 불린형(`true` 또는 `false`)으로 바꿔줍니다 대부분의 값은 `true`로 변환되지만, 몇 가지 예외적인 값들은 `false`로 변환됩니다.

`false`로 변환되는 값들을 **Falsy 값**이라고 부릅니다.

> 대표적인 Falsy 값: '' (빈 문자열), 0, NaN
> 

```jsx
*// Truthy 값*
console.log(Boolean('hello')); *// true*
console.log(Boolean(123));     *// true*
console.log(Boolean(-1));      *// true 

// Falsy 값*
console.log(Boolean(''));      *// false*
console.log(Boolean(0));       *// false*
console.log(Boolean(NaN));     *// false*
```

이처럼 명시적 형 변환을 통해 우리는 값의 자료형을 원하는 형태로 바꾸어 다양한 연산과 로직에 활용할 수 있습니다.

---

### 주의사항

- 숫자 형태로 바꿀 수 없는 문자열을 `Number()`로 변환하면 NaN이 반환됨
- Falsy 값(`''`, 0, NaN 등)은 Boolean 변환 시 false가 됨

### 용어설명

- **형 변환(Type Conversion)**: 값의 자료형을 다른 자료형으로 바꾸는 것
- **명시적 형 변환(Explicit Conversion)**: 개발자가 직접 코드를 명시해서 자료형을 변환하는 것
- **Falsy 값**: 논리적으로 false로 취급되는 값 (`''`, 0, NaN 등)

### 14. #Quiz 형 변환 I (10분 + 5분)

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요

```jsx
*// 숫자 -> 문자열*
console.log(String(123));

*// 불린 -> 문자열*
console.log(String(true));

*// 문자열 -> 숫자*
console.log(Number("456"));

*// 불린 -> 숫자*
console.log(Number(false));
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    *// 숫자 -> 문자열*
    console.log(String(123)); *// '123'// 불린 -> 문자열*
    console.log(String(true)); *// 'true'// 문자열 -> 숫자*
    console.log(Number("456")); *// 456// 불린 -> 숫자*
    console.log(Number(false)); *// 0*
    ```
    
    해설:
    
    - `String()` 함수는 어떤 값이든 그 값의 모양 그대로 문자열로 변환합니다
    - `Number()` 함수는 숫자 형태의 문자열을 실제 숫자로 변환합니다
    - `Number()` 함수로 불린 값을 변환하면 true는 1로, false는 0으로 변환됩니다

---

## 문제 2

사용자로부터 태어난 해를 입력받는 상황을 가정해봅시다. `birthYear` 변수에는 사용자가 입력한 `'1999'`라는 **문자열**이 저장되어 있습니다. 이 값을 숫자형으로 변환하여 `2025`년 기준의 나이를 계산하고, `age` 변수에 저장하여 콘솔에 출력해보세요

```jsx
let birthYear = "1999";
let age;

*// 여기에 코드를 작성하세요*

console.log(age);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let birthYear = "1999";
    let age;
    
    age = 2025 - Number(birthYear);
    
    console.log(age); *// 25*
    ```
    
    해설:
    
    사용자 입력값은 보통 문자열이므로, 산술 연산을 하기 위해서는 숫자형으로 변환해야 합니다
    
    Number(birthYear)를 통해 문자열 '1999'를 숫자 1999로 변환한 후, 2024에서 빼주어 나이를 계산할 수 있습니다
    
    만약 형 변환 없이 2024 - '1999'를 계산하더라도 자바스크립트가 암시적 형 변환을 통해 계산해주지만, 코드의 의도를 명확히 하기 위해 Number()를 사용한 명시적 형 변환을 해주는 것이 더 좋은 습관입니다
    

---

## 문제 3

다음 중 `Boolean()` 함수를 사용했을 때 `false`가 되는 **Falsy 값**을 모두 골라보세요

1. `'hello'`
2. `0`
3. `' '` (공백 문자열)
4. `NaN`
5. `1`
6. `''` (빈 문자열)

- 정답 및 해설
    
    정답: 2, 4, 6
    
    해설:
    
    자바스크립트에서 false로 취급되는 대표적인 Falsy 값은 다음과 같습니다
    
    - `''` (빈 문자열)
    - `0`
    - `NaN`
    - `null` (아직 배우지 않음)
    - `undefined` (아직 배우지 않음)
    
    ' '(공백 문자열)은 비어있지 않고 공백이라는 문자를 포함하고 있으므로 true로 취급되는 Truthy 값입니다
    

### 15. #Quiz 형 변환 퀴즈 I

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3391
```

### 16. 형 변환 II

`String()`, `Number()`와 같이 함수를 사용하여 의도적으로 자료형을 바꾸는 **명시적 형 변환**을 배웠습니다.

하지만 자바스크립트는 때때로 개발자의 의도와 상관없이 연산을 위해 **자동으로** 자료형을 바꾸기도 합니다. 이를 **암시적 형 변환**이라고 합니다.

```jsx
console.log('100' - '50'); *// 50*
console.log('100' * '50'); *// 5000*
```

위 코드에서 문자열 `'100'`과 `'50'`은 뺄셈(`-`)과 곱셈(`*`)을 만나 자동으로 숫자 `100`과 `50`으로 형 변환되어 계산됩니다.

이러한 암시적 형 변환은 편리해 보일 수 있지만, 규칙을 정확히 모르면 예상치 못한 결과를 낳을 수 있으므로 주의해야 합니다.

---

### 암시적 형 변환 규칙

### `+` 연산자의 특별한 규칙

`+` 연산자는 숫자 덧셈과 문자열 연결이라는 두 가지 기능을 모두 가지고 있습니다. 자바스크립트는 `+` 연산자를 만났을 때, 피연산자 중 **하나라도 문자열이 있으면** 다른 피연산자도 문자열로 변환하여 **문자열 연결**을 우선적으로 수행합니다.

```jsx
*// 숫자 + 숫자 -> 덧셈*
console.log(100 + 50); *// 150

// 문자열 + 숫자 -> 문자열 연결*
console.log('100' + 50); *// '10050'

// 숫자 + 문자열 -> 문자열 연결*
console.log(100 + '50'); *// '10050'

// 문자열 + 문자열 -> 문자열 연결*
console.log('100' + '50'); *// '10050'*
```

### 그 외 산술 연산자

`+`를 제외한 다른 산술 연산자들(`-`, `*`, `/`, `%`, `**`)은 피연산자들을 모두 **숫자형**으로 변환하여 계산합니다.

```jsx
console.log('100' - 50);    *// 50*
console.log(100 * '2');     *// 200*
console.log(true + 1);      *// 2 (true가 1로 변환됨)*
console.log(100 - false);   *// 100 (false가 0으로 변환됨)*
```

---

### 같음 비교 연산자 (`==` vs `===`)

두 값이 같은지 비교할 때 사용하는 연산자는 `==`와 `===` 두 종류가 있습니다. 이 둘의 가장 큰 차이점은 **암시적 형 변환**의 유무입니다.

### `===` (일치 비교)

`===` 연산자는 암시적 형 변환을 하지 않습니다. **값과 자료형이 모두** 같아야만 `true`를 반환합니다.

```jsx
console.log(100 === '100'); *// false (자료형이 다름)*
console.log(1 === true);    *// false (자료형이 다름)*
```

### `==` (동등 비교)

`==` 연산자는 두 값의 자료형이 다를 경우, **같은 자료형으로 암시적 형 변환**을 한 후에 값을 비교합니다.

```jsx
console.log(100 == '100'); *// true (문자열 '100'이 숫자 100으로 변환됨)*
console.log(1 == true);    *// true (불린 true가 숫자 1로 변환됨)*
```

### 어떤 것을 사용해야 할까?

`==` 연산자는 편리해 보이지만, 예상치 못한 형 변환으로 인해 버그를 발생시킬 수 있습니다. 따라서 두 값이 같은지 비교할 때는 자료형까지 엄격하게 비교하는 **`===` 연산자를 사용하는 것이 훨씬 더 안전하고 권장됩니다.**

---

### **주의사항**

- `+` 연산자에서 하나라도 문자열이면 결과가 문자열 연결이 됨.
- 암시적 형 변환은 편리해 보이지만, 버그의 원인이 될 수 있으므로 주의해야 함.
- 비교 연산은 항상 `===`를 쓰는 것이 안전함.
    
    ![스크린샷 2025-11-13 17.39.11.png](10%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%20%ED%95%B5%EC%8B%AC%20%EA%B0%9C%EB%85%90%20in%20JavaScript%20-%20(11%EC%8B%9C%EA%B0%84)/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-11-13_17.39.11.png)
    

### 용어 설명

- **암시적 형 변환(Implicit Conversion)**: 자바스크립트가 코드 실행 과정에서 자동으로 자료형을 바꾸는 것.
- **명시적 형 변환(Explicit Conversion)**: 개발자가 직접 함수(예: Number(), String())로 자료형을 바꾸는 것.
- **동등 비교(`==`)**: 자료형까지 일치시키지 않고 값을 비교하는 연산자. 필요하면 자동으로 형 변환함.
- **일치 비교(`===`)**: 값과 자료형이 모두 일치해야만 true가 되는 연산자.

### 16. #Quiz 형 변환 II

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요. 암시적 형 변환 규칙을 생각하며 풀어보세요

```jsx
*// 1번*
console.log("5" + 3);

*// 2번*
console.log("5" - 3);

*// 3번*
console.log("5" * 3);

*// 4번*
console.log("5" / 3);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    *// 1번*
    console.log("5" + 3); *// '53'
    
    // 2번*
    console.log("5" - 3); *// 2
    
    // 3번*
    console.log("5" * 3); *// 15
    
    // 4번*
    console.log("5" / 3); *// 1.666...*
    ```
    
    해설:
    
    1. `+` 연산자는 피연산자 중 하나라도 문자열이 있으면 다른 피연산자도 문자열로 변환하여 문자열 연결을 합니다 따라서 숫자 `3`이 문자열 `'3'`으로 변환되어 `'5' + '3'`이 실행됩니다
    2. `-`, `*`, `/` 연산자는 피연산자들을 모두 숫자형으로 변환하여 계산합니다 따라서 문자열 `'5'`가 숫자 `5`로 변환되어 산술 연산이 수행됩니다

---

## 문제 2

아래 코드의 실행 결과를 각각 `true` 또는 `false`로 작성해보세요. `==`와 `===`의 차이점을 생각하며 풀어보세요

```jsx
*// 1번*
console.log(5 == "5");

*// 2번*
console.log(5 === "5");

*// 3번*
console.log(true == 1);

*// 4번*
console.log(true === 1);

*// 5번*
console.log(0 == false);

*// 6번*
console.log(0 === false);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    *// 1번*
    console.log(5 == "5"); *// true
    
    // 2번*
    console.log(5 === "5"); *// false
    
    // 3번*
    console.log(true == 1); *// true
    
    // 4번*
    console.log(true === 1); *// false
    
    // 5번*
    console.log(0 == false); *// true
    
    // 6번*
    console.log(0 === false); *// false*
    ```
    
    해설:
    
    - `==` (동등 비교 연산자)는 두 값의 자료형이 다를 경우, 같은 자료형으로 암시적 형 변환을 한 후에 값을 비교합니다
        - `'5'`는 숫자 `5`로, `true`는 숫자 `1`로, `false`는 숫자 `0`으로 변환되어 비교됩니다
    - `===` (일치 비교 연산자)는 자료형 변환 없이 값과 자료형이 모두 같은지 엄격하게 비교합니다
        - 위 예시들은 모두 값은 비슷해 보일지라도 자료형(`number`, `string`, `boolean`)이 다르므로 모두 `false`가 됩니다
    
    예상치 못한 버그를 방지하기 위해, 특별한 경우가 아니라면 항상 `===`를 사용해 비교하는 것이 좋습니다
    

### 17. #Quiz 형 변환 퀴즈 II

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3393
```

### 18. 템플릿 문자열

지금까지 우리는 `+` 연산자를 사용하여 변수와 문자열을 연결했습니다.

```jsx
let name = '김코딩';
let message = '안녕하세요, ' + name + '님!';

console.log(message);
```

이 방식은 잘 동작하지만, 연결할 변수가 많아지면 코드가 길고 복잡해져 가독성이 떨어집니다.

```jsx
let item = '노트북';
let price = 1200000;
let quantity = 3;

let orderSummary = item + ' ' + quantity + '개를 주문하셨습니다. 총 ' + (price * quantity) + '원입니다.';
console.log(orderSummary);
```

이런 불편함을 해결하기 위해 더 세련된 문자열 조합 방식인 **템플릿 문자열(Template Strings)**이 등장했습니다.

---

### 템플릿 문자열 사용법

템플릿 문자열은 따옴표(`'`, `"`) 대신 **백틱(```)**으로 문자열을 감싸서 만듭니다.

가장 큰 특징은 문자열 안에 `${...}` 형태의 **플레이스홀더(Placeholder)**를 사용하여 변수나 표현식을 쉽게 삽입할 수 있다는 점입니다.

```jsx
let name = '김코딩';
let message = `안녕하세요, ${name}님!`;

console.log(message);
```

`+` 연산자를 사용했을 때보다 훨씬 간결하고 직관적입니다.

---

### 템플릿 문자열의 장점

### 1. 가독성 향상

`+` 연산자와 따옴표를 반복해서 사용할 필요 없이, 하나의 긴 문장 안에 변수를 바로 삽입할 수 있어 코드를 읽기 편합니다.

아까의 복잡했던 주문 요약 코드를 템플릿 문자열로 바꿔봅시다.

```jsx
let item = '노트북';
let price = 1200000;
let quantity = 3;

let orderSummary = `${item} ${quantity}개를 주문하셨습니다. 총 ${price * quantity}원입니다.`;
console.log(orderSummary);
```

### 2. 표현식 삽입 가능

플레이스홀더 안에는 변수뿐만 아니라, `price * quantity`와 같은 연산식이나 함수 호출 등 **값을 반환하는 모든 표현식**을 넣을 수 있습니다.

```jsx
function getGreeting(name) {
  return `반갑습니다, ${name} 고객님!`;
}

let customerName = '박해커';
let greetingMessage = `${getGreeting(customerName)} 즐거운 쇼핑 되세요.`;

console.log(greetingMessage)
```

이처럼 템플릿 문자열을 사용하면 복잡한 문자열 조합을 훨씬 우아하고 효율적으로 처리할 수 있습니다.

---

### 주의사항

- 반드시 백틱(```)을 사용해야 템플릿 문자열이 동작합니다.
- 플레이스홀더 내부에는 중괄호와 달러표시 `${}`를 꼭 사용해야 합니다.

### 용어설명

- **템플릿 문자열(Template Strings)**: 백틱으로 감싸고, `${}`로 변수·표현식을 삽입할 수 있는 문자열.
- **플레이스홀더(Placeholder)**: 템플릿 문자열에서 변수나 표현식을 삽입하는 `${}` 구문.

### 18. #Quiz 템플릿 문자열 (실습과 함께 15분)

### 문제 1

`+` 연산자를 사용하여 작성된 아래 코드를 **템플릿 문자열**을 사용하는 방식으로 수정해보세요

**수정 전 코드:**

```jsx
let course = "자바스크립트";
let lesson = "템플릿 문자열";

console.log(course + " 강의의 " + lesson + " 파트입니다.");
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let course = "자바스크립트";
    let lesson = "템플릿 문자열";
    
    console.log(`${course} 강의의 ${lesson} 파트입니다.`);
    ```
    
    해설:
    
    템플릿 문자열은 백틱(```)으로 전체 문자열을 감싸고, 변수나 표현식이 들어갈 자리에 `${...}` 플레이스홀더를 사용합니다
    
    `+` 연산자를 여러 번 사용하는 것보다 훨씬 간결하고 가독성이 좋습니다
    

---

### 문제 2

`price` 변수와 `discount` 변수를 사용하여, 최종 할인된 가격을 계산하고 아래와 같은 형식의 문자열을 템플릿 문자열을 이용해 출력해보세요

**출력 형식:** `최종 가격은 8000원입니다.`

```jsx
let price = 10000;
let discount = 0.2; *// 20% 할인// 여기에 코드를 작성하세요*
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    let price = 10000;
    let discount = 0.2; *// 20% 할인*
    
    console.log(`최종 가격은 ${price * (1 - discount)}원입니다.`);
    ```
    
    해설:
    
    템플릿 문자열의 `${...}` 플레이스홀더 안에는 변수뿐만 아니라 `price * (1 - discount)`와 같은 연산식도 직접 넣을 수 있습니다
    
    코드가 실행될 때 이 연산식의 결과값인 8000이 계산되어 문자열에 삽입됩니다
    

### 19. #실습 템플릿 문자열 실습

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3395
```

- 정답
    
    ```jsx
    function calcWage(name, time, wage) {
      let total = time * wage;
    
      console.log(`${name}님의 근무 시간은 총 ${time}시간이며, 최종 급여는 ${total}원 입니다.`);  // 괄호 안에 코드를 작성하세요
    }
    ```
    

### 20. null과 undefined

자바스크립트에는 '값이 없음'을 나타내는 특별한 값, `null`과 `undefined`가 있습니다. 둘 다 '비어있다'는 비슷한 의미를 갖지만, 미묘한 차이점이 있으며 프로그래밍에서 매우 중요하게 사용됩니다.

---

### `undefined`

`undefined`는 **'아직 값이 할당되지 않았다'**는 것을 의미합니다.

변수를 선언만 하고 아무런 값도 할당하지 않으면, 자바스크립트 엔진은 그 변수에 기본값으로 `undefined`를 할당합니다.

```jsx
let name;
console.log(name); *// undefined*
```

`name`이라는 변수 상자는 만들어졌지만, 그 안에 무엇을 넣을지 아직 정하지 않은 상태를 나타냅니다.

---

### `null`

`null`은 개발자가 **'의도적으로 값이 비어있음'**을 표현하기 위해 사용하는 값입니다.

예를 들어, 사용자의 닉네임을 저장하는 변수가 있다고 가정해봅시다. 사용자가 아직 닉네임을 설정하지 않았다면, 이 변수에 `null`을 할당하여 '닉네임이 없는 상태'임을 명확히 나타낼 수 있습니다.

```jsx
let nickname = '김코딩';
console.log(nickname); *// '김코딩'// 사용자가 닉네임을 삭제함*
nickname = null;
console.log(nickname); *// null*
```

`nickname`이라는 변수 상자가 있고, 그 안에 있던 값을 의도적으로 비워서 '빈 상자'로 만든 상태를 나타냅니다.

---

### `null` vs `undefined`

| 구분 | `undefined` | `null` |
| --- | --- | --- |
| **의미** | 값이 할당된 적 없음 | 의도적으로 빈 값을 할당함 |
| **주 사용처** | 자바스크립트 엔진이 자동으로 할당 | 개발자가 명시적으로 사용 |
| **비유** | 아직 주인이 정해지지 않은 빈 집 | 주인이 있지만 현재는 비워둔 집 |

두 값은 의미가 다르므로, 자료형도 다릅니다.

```jsx
console.log(typeof undefined); *// 'undefined'*
console.log(typeof null);      *// 'object' (언어 초기의 오류지만, 하위 호환성을 위해 수정되지 않음)*
```

### 이해를 돕기 위한 이미지

![스크린샷 2025-11-13 18.22.19.png](10%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%20%ED%95%B5%EC%8B%AC%20%EA%B0%9C%EB%85%90%20in%20JavaScript%20-%20(11%EC%8B%9C%EA%B0%84)/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-11-13_18.22.19.png)

### 동등 비교(`==`)와 일치 비교(`===`)

`==`로 비교하면 `null`과 `undefined`는 **'값이 없음'**이라는 의미가 같다고 판단하여 `true`를 반환합니다.

하지만 `===`로 비교하면 자료형이 다르므로 `false`를 반환합니다. 따라서 두 값을 명확히 구분하기 위해서는 항상 `===`를 사용하는 것이 좋습니다.

```jsx
console.log(null == undefined);  *// true*
console.log(null === undefined); *// false*
```

**결론:** 개발자가 코드에서 '값이 비어있음'을 나타내고 싶을 때는 `undefined`가 아닌 `null`을 사용하는 것이 좋습니다.

---

### 주의사항

- `typeof null`은 `'object'`로 나오는 언어적 버그가 있으니 실제로는 객체가 아님에 주의합니다.
- 비교 시 항상 `===`를 사용하여 명확히 구분할 것.

### 용어설명

- **undefined**: 값이 아직 할당되지 않았음을 나타내는 특별한 값.
- **null**: 값이 없음을 개발자가 명시적으로 표현하는 값.
- **동등 비교(`==`)**: 값이 비슷한지(암시적 형 변환 포함) 비교.
- **일치 비교(`===`)**: 값과 타입이 모두 같은지 엄격하게 비교.

### 20. #Quiz null과 undefined

### 문제 1

아래 코드의 실행 결과를 각각 주석으로 작성해보세요

```jsx
let a;
let b = null;

console.log(a);
console.log(b);
console.log(a == b);
console.log(a === b);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    let a;
    let b = null;
    
    console.log(a); *// undefined*
    console.log(b); *// null*
    console.log(a == b); *// true*
    console.log(a === b); *// false*
    ```
    
    해설:
    
    - a: 변수를 선언만 하고 값을 할당하지 않았으므로, 자바스크립트 엔진이 자동으로 `undefined`를 할당합니다
    - b: 개발자가 의도적으로 '값이 비어있음'을 나타내기 위해 null을 할당했습니다
    - `a == b`: 동등 비교(`==`)는 `null`과 `undefined`를 '값이 없음'이라는 같은 의미로 보고 암시적 형 변환을 하여 true로 판단합니다
    - `a === b`: 일치 비교(`===`)는 값과 자료형을 모두 비교합니다. undefined와 null은 자료형이 다르므로 false로 판단합니다

---

### 문제 2

'선택한 옵션'을 저장하는 변수 selectedOption이 있습니다. 처음에는 아무것도 선택하지 않았으므로 null 값을 할당했습니다. 이후 사용자가 '옵션 A'를 선택했다고 가정하고, selectedOption 변수에 '옵션 A'라는 문자열을 할당하는 코드를 작성해보세요

```jsx
*// 처음에는 아무것도 선택하지 않은 상태*
let selectedOption = null;
console.log("초기 선택:", selectedOption);

*// 여기에 사용자가 '옵션 A'를 선택하는 코드를 작성하세요*
console.log("최종 선택:", selectedOption);
```

- 정답 및 해설
    
    정답 코드:
    
    ```jsx
    *// 처음에는 아무것도 선택하지 않은 상태*
    let selectedOption = null;
    console.log("초기 선택:", selectedOption);
    
    *// 사용자가 '옵션 A'를 선택함*
    selectedOption = "옵션 A";
    
    console.log("최종 선택:", selectedOption);
    ```
    
    해설:
    
    null은 '현재는 값이 비어있지만, 나중에 값이 할당될 수 있다'는 상태를 나타낼 때 유용하게 사용됩니다
    
    처음에는 null로 초기화해두었다가, 사용자의 행동 등 특정 이벤트가 발생했을 때 다른 값을 재할당할 수 있습니다
    

### 21. #Quiz null과 undefined 퀴즈 (5분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3397
```

### 22. #실습 자료형 응용하기 (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3398
```

## 2. 추상화

### 01. 할당 연산자

우리는 이미 변수를 선언하고 값을 저장할 때 등호(`=`)를 사용해왔습니다.

```jsx
let level = 5;
```

수학에서는 `=`가 '양쪽이 같다'는 의미지만, 자바스크립트에서는 조금 다릅니다. 자바스크립트에서 `=`는 **할당 연산자(Assignment Operator)**라고 부르며, **오른쪽의 값을 왼쪽의 변수에 저장(할당)하라**는 명령을 의미합니다.

---

## 할당 연산자의 동작 방식

할당 연산자는 다음과 같은 순서로 동작합니다.

1. 할당 연산자 오른쪽의 표현식을 먼저 모두 계산하여 하나의 값으로 만든다.
2. 그 결과를 왼쪽의 변수에 할당(저장)한다.

이러한 동작 방식 때문에 다음과 같은 코드가 가능해집니다.

```jsx
let level = 5;
level = level + 1;

console.log(level); *// 6*
```

위 코드는 수학적으로는 말이 안 되지만, 할당 연산자의 동작 방식으로 이해하면 간단합니다.

1. `level + 1` 이 먼저 계산됩니다. 현재 `level`은 `5`이므로, `5 + 1`의 결과인 `6`이 됩니다.
2. 계산 결과인 `6`이 왼쪽의 `level` 변수에 새롭게 할당됩니다.
3. 결과적으로 `level` 변수의 값은 `5`에서 `6`으로 업데이트됩니다.

이처럼 변수 자기 자신의 값을 이용해 새로운 값을 계산하고, 그 결과를 다시 자기 자신에게 할당하는 패턴은 프로그래밍에서 매우 흔하게 사용됩니다. (예: 레벨업, 점수 누적, 재고 수량 변경 등)

---

## 복합 할당 연산자

`level = level + 1;`과 같이 자기 자신에게 연산한 후 다시 할당하는 코드는 더 간결하게 줄여 쓸 수 있습니다. 이를 **복합 할당 연산자**라고 합니다.

| 기본 표현 | 복합 할당 연산자 | 의미 |
| --- | --- | --- |
| `x = x + y` | `x += y` | `x`에 `y`를 더한 후 할당 |
| `x = x - y` | `x -= y` | `x`에서 `y`를 뺀 후 할당 |
| `x = x * y` | `x *= y` | `x`에 `y`를 곱한 후 할당 |
| `x = x / y` | `x /= y` | `x`를 `y`로 나눈 후 할당 |
| `x = x % y` | `x %= y` | `x`를 `y`로 나눈 나머지를 할당 |

게임 캐릭터가 경험치를 얻는 상황을 예로 들어봅시다.

```jsx
let exp = 150;

*// 몬스터 사냥으로 경험치 100 획득*
exp = exp + 100; *// 기본 표현*
exp += 100;      *// 복합 할당 연산자 (더 간결함)*

console.log(exp); *// 350*
```

두 표현은 완전히 동일하게 동작하지만, 복합 할당 연산자를 사용하는 것이 코드를 더 짧고 깔끔하게 만들어줍니다.

### **정리**

- 등호(`=`)는 수학과 달리 '같다'가 아니라 '저장한다', '할당한다'라는 뜻임.
- 복합 할당 연산자는 코드를 간결하게 만드는 데 매우 유용함.

### **용어설명**

- **할당 연산자(=)**: 값을 변수에 저장하는 명령을 내리는 연산자.
- **복합 할당 연산자(+=, -= 등)**: 기존 변수 값을 연산한 뒤 결과를 다시 변수에 저장하는 연산자.

### 01. #Quiz 할당 연산자

### 문제 1

다음 코드의 실행 결과를 예측하고, 그 이유를 할당 연산자의 동작 순서에 입각하여 설명해보세요

```jsx
let a = 10;
let b = 20;

a = a + b;
b = a - b;
a = a - b;

console.log(a);
console.log(b);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    20
    10
    ```
    
    해설:
    
    이 코드는 임시 변수 없이 두 변수의 값을 서로 바꾸는 고전적인 방법입니다
    
    할당 연산자는 항상 오른쪽을 먼저 계산한다는 점을 기억하며 코드를 한 줄씩 따라가 봅시다
    
    1. a = a + b;
        - 오른쪽 a + b는 10 + 20이므로 30이 됩니다
        - 이 결과 30이 a에 할당됩니다
        - 현재 a는 30, b는 20입니다
    2. b = a - b;
        - 오른쪽 a - b는 30 - 20이므로 10이 됩니다
        - 이 결과 10이 b에 할당됩니다
        - 현재 a는 30, b는 10입니다 (원래 a의 값이 b로 이동함)
    3. a = a - b;
        - 오른쪽 a - b는 30 - 10이므로 20이 됩니다
        - 이 결과 20이 a에 할당됩니다
        - 현재 a는 20, b는 10입니다 (원래 b의 값이 a로 이동함)
    
    결과적으로 a와 b의 값이 서로 바뀌게 됩니다
    

---

### 문제 2

복합 할당 연산자를 사용하여 아래 코드를 더 간결하게 수정해보세요

**수정 전:**

```jsx
let money = 10000;

*// 점심 식사로 7500원 지출*
money = money - 7500;

*// 커피 값으로 4000원 지출*
money = money - 4000;

console.log(money);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    let money = 10000;
    
    *// 점심 식사로 7500원 지출*
    money -= 7500;
    
    *// 커피 값으로 4000원 지출*
    money -= 4000;
    
    console.log(money); *// -1500*
    ```
    
    해설:
    
    x = x - y 형태의 코드는 x -= y 라는 복합 할당 연산자로 간단하게 표현할 수 있습니다
    
    이를 통해 코드가 더 간결해지고 가독성이 좋아집니다
    

### 02. 복합 할당 연산자

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3400
```

### 03. 함수의 실행 순서

자바스크립트 코드는 기본적으로 위에서 아래로, 한 줄씩 순서대로 실행됩니다. 하지만 함수를 만나면 이 흐름에 약간의 변화가 생깁니다.

---

### 함수 정의와 함수 호출

먼저 '함수를 정의하는 것'과 '함수를 호출하는 것'의 차이를 알아야 합니다.

- **함수 정의:** `function` 키워드를 사용해서 함수를 만드는 행위입니다. 함수를 정의만 해서는 아무 일도 일어나지 않습니다. 마치 요리 레시피를 작성해두기만 한 것과 같습니다.
- **함수 호출:** 함수의 이름 뒤에 소괄호`()`를 붙여 함수를 실행시키는 행위입니다. 레시피를 보고 실제로 요리를 시작하는 것에 비유할 수 있습니다.

```jsx
*// 1. takeOrder 함수 정의 (레시피 작성)*
function takeOrder() {
  console.log('주문 접수 완료!');
}

*// 2. 프로그램 시작*
console.log('레스토랑 오픈');

*// 3. takeOrder 함수 호출 (요리 시작)*
takeOrder();

*// 4. 프로그램 종료*
console.log('레스토랑 마감');
```

위 코드를 실행하면 콘솔에 어떤 순서로 출력될까요?

1. `function takeOrder() { ... }` 부분은 함수를 정의하는 부분이므로 일단 건너뜁니다.
2. `console.log('레스토랑 오픈');`이 실행되어 "레스토랑 오픈"이 출력됩니다.
3. `takeOrder();`에서 함수를 호출합니다. 이때 코드의 실행 흐름이 `takeOrder` 함수 내부로 점프합니다.
4. 함수 내부의 `console.log('주문 접수 완료!');`가 실행되어 "주문 접수 완료!"가 출력됩니다.
5. 함수 내부의 코드가 모두 실행되었으므로, 다시 함수를 호출했던 곳으로 돌아옵니다.
6. 다음 줄인 `console.log('레스토랑 마감');`이 실행되어 "레스토랑 마감"이 출력됩니다.

**실행 결과:**

```jsx
레스토랑 오픈
주문 접수 완료!
레스토랑 마감
```

---

## return과 함수의 실행 순서

`return`이 있는 함수는 어떻게 동작할까요? 함수가 `return`을 만나면, 함수 호출문 전체가 `return`된 값으로 대체된다고 생각하면 쉽습니다.

```jsx
*// makeBurger 함수 정의*
function makeBurger(type) {
  return `${type} 버거 완료!`;
}

console.log('버거 만들기 시작');

const finishedBurger = makeBurger('새우');
console.log(finishedBurger);

console.log('버거 만들기 끝');
```

1. `console.log('버거 만들기 시작');`이 실행됩니다.
2. `makeBurger('새우')` 함수가 호출됩니다.
3. `type` 파라미터에 '새우'가 전달되고, 함수는 `'새우' + ' 버거 완료!'` 문자열을 계산하여 `'새우 버거 완료!'`라는 값을 `return`합니다.
4. 함수 호출문 `makeBurger('새우')` 전체가 리턴된 값인 `'새우 버거 완료!'`로 대체됩니다.
5. 결과적으로 `const finishedBurger = '새우 버거 완료!';` 코드가 실행된 것과 같아집니다.
6. `console.log(finishedBurger);`가 실행되어 "새우 버거 완료!"가 출력됩니다.
7. `console.log('버거 만들기 끝');`이 실행됩니다.

**실행 결과:**

```jsx
버거 만들기 시작
새우 버거 완료!
버거 만들기 끝
```

---

## 한 줄에 여러 함수 호출하기

만약 한 줄에 여러 개의 함수 호출이 있다면, 코드는 왼쪽부터 순서대로 각 함수를 호출하고 리턴값으로 대체해 나갑니다.

```jsx
function getPrice(menu) {
  if (menu === '불고기 버거') {
    return 4500;
  } else if (menu === '치즈 버거') {
    return 4000;
  } else {
    return 3000; *// 기본 버거*
  }
}

const totalPrice = getPrice('불고기 버거') + getPrice('치즈 버거');
console.log(`총 주문 금액: ${totalPrice}원`);
```

1. `getPrice('불고기 버거')`가 먼저 호출되고, `4500`을 리턴합니다.
2. `getPrice('치즈 버거')`가 다음으로 호출되고, `4000`을 리턴합니다.
3. 원래 코드는 `const totalPrice = 4500 + 4000;` 과 같아집니다.
4. `totalPrice` 변수에는 `8500`이 할당됩니다.
5. 최종적으로 "총 주문 금액: 8500원"이 출력됩니다.

이처럼 함수의 실행 순서를 이해하면 복잡한 코드의 동작도 정확하게 예측할 수 있습니다.

---

### 주의사항

- 함수 정의와 함수 호출을 반드시 구분할 것.
- return이 있는 함수는 호출한 자리가 리턴값으로 완전히 대체됨.

### 용어설명

- **함수 정의(Function Definition)**: 함수를 만드는 코드 구문.
- **함수 호출(Function Call)**: 함수를 실행하는 작업.
- **return**: 함수 실행 중 값을 외부로 반환하고 실행을 종료하는 키워드.

### 03. #Quiz 함수의 실행 순서 (10분)

### 문제 1

다음 코드의 실행 결과를 예측하고, 콘솔에 출력되는 순서를 정확하게 작성해보세요

```jsx
function printA() {
  console.log("A");
}

function printB() {
  console.log("B");
  printA();
}

console.log("시작");
printB();
console.log("끝");
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    시작
    B
    A
    끝
    ```
    
    해설:
    
    1. console.log('시작');이 실행되어 "시작"이 출력됩니다
    2. printB(); 함수가 호출되어 실행 흐름이 printB 함수 내부로 이동합니다
    3. printB 함수 내부의 console.log('B');가 실행되어 "B"가 출력됩니다
    4. printB 함수 내부에서 printA();가 호출되고 실행 흐름이 printA 함수 내부로 이동합니다
    5. printA 함수 내부의 console.log('A');가 실행되어 "A"가 출력됩니다
    6. printA 함수 실행이 끝나고, printB 함수 내부로 돌아옵니다
    7. printB 함수 실행이 끝나고, 메인 코드로 돌아옵니다
    8. 마지막 console.log('끝');이 실행되어 "끝"이 출력됩니다

---

### 문제 2

다음 코드의 최종 실행 결과를 예측해보세요. return과 함수의 실행 순서를 잘 생각해보세요

```jsx
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

const result = multiply(add(2, 3), add(4, 5));

console.log(result);
```

- 정답 및 해설
    
    정답:
    
    `text45`
    
    해설:
    
    코드는 왼쪽부터 순서대로 실행되며, 함수 호출문은 리턴값으로 대체됩니다
    
    1. multiply 함수의 첫 번째 파라미터인 add(2, 3)이 먼저 호출됩니다
    2. add(2, 3)은 2 + 3의 결과인 5를 리턴합니다
    3. multiply(5, add(4, 5))가 됩니다
    4. multiply 함수의 두 번째 파라미터인 add(4, 5)가 호출됩니다
    5. add(4, 5)는 4 + 5의 결과인 9를 리턴합니다
    6. multiply(5, 9)가 호출되고 5 * 9의 결과인 45를 리턴합니다
    7. result 변수에는 45가 저장되고, console.log(result);에서 45가 출력됩니다

---

### 문제 3

다음 코드의 실행 결과를 예측해보세요. 함수가 아무것도 return하지 않을 때 어떻게 되는지 생각해보세요

```jsx
function sayHello(name) {
  console.log(name + "님, 안녕하세요!");
}

const message = sayHello("홍길동");

console.log(message);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    홍길동, 안녕하세요!
    undefined
    ```
    
    해설:
    
    1. sayHello('홍길동') 함수가 호출됩니다
    2. 함수 내부의 console.log가 실행되어 "홍길동님, 안녕하세요!"가 출력됩니다
    3. sayHello 함수는 return 문이 없습니다. 명시적으로 값을 return하지 않으면 기본적으로 undefined를 리턴합니다
    4. sayHello('홍길동') 호출문은 undefined 값으로 대체됩니다
    5. const message = undefined;가 실행되고, message 변수에는 undefined가 저장됩니다
    6. 마지막 console.log(message);에서 undefined가 출력됩니다

### 04. #실습 함수 부려먹기 I (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3482
```

### 05. #실습 함수 부려먹기 II (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3403
```

### 06. return문 제대로 이해하기

`return` 문은 함수에서 가장 중요한 키워드 중 하나입니다. `return`에는 두 가지 핵심적인 역할이 있습니다.

1. **값을 반환한다 (Output)**
2. **함수의 실행을 즉시 중단한다**

---

### 1. 값을 반환하는 return

`return`은 이름 그대로 함수가 처리한 결과물을 함수를 호출한 곳으로 돌려주는(반환하는) 역할을 합니다.

```jsx
function calculateFee(age) {
  *// 나이에 따라 입장료 계산*
  if (age < 19) {
    return 8000; *// 청소년 요금*
  } else {
    return 10000; *// 성인 요금*
  }
}

const fee = calculateFee(25); *// 함수 호출*
console.log(`당신의 입장료는 ${fee}원 입니다.`);
```

`calculateFee(25)`가 호출되면, 함수는 `10000`이라는 값을 `return`합니다. 그러면 함수를 호출했던 `calculateFee(25)` 부분이 숫자 `10000`으로 대체되고, 이 값이 `fee`라는 상수에 저장됩니다.

---

### 2. 함수를 중단시키는 return

`return`의 또 다른 중요한 역할은 **함수의 실행을 그 즉시 중단시킨다**는 것입니다. 함수는 `return` 키워드를 만나는 순간, 뒤에 어떤 코드가 남아있든 상관없이 바로 종료됩니다.

놀이공원 입장 가능 여부를 확인하는 함수를 예로 들어봅시다.

```jsx
function checkAvailability(age) {
  console.log(`${age}살 고객님, 입장 가능 여부 확인 중...`);

  if (age < 8) {
    console.log('보호자 동반이 필요합니다.');
    return '입장 불가'; *// 여기서 함수가 종료됨*
  }

  console.log('확인 완료. 즐거운 시간 보내세요!');
  return '입장 가능';
}

console.log(checkAvailability(7));
console.log('---');
console.log(checkAvailability(25));
```

**실행 결과:**

```jsx
7살 고객님, 입장 가능 여부 확인 중...
보호자 동반이 필요합니다.
입장 불가
---
25살 고객님, 입장 가능 여부 확인 중...
확인 완료. 즐거운 시간 보내세요!
입장 가능
```

`checkAvailability(7)`을 호출했을 때의 흐름을 살펴봅시다.

1. `age`가 `7`이므로 `if (age < 8)` 조건이 참(true)이 됩니다.
2. `if`문 안의 `console.log`가 실행됩니다.
3. `return '입장 불가';` 코드를 만납니다.
4. 함수는 `'입장 불가'`라는 값을 반환하고, **그 즉시 실행을 멈춥니다.**
5. 따라서 함수 아래쪽에 있던 `console.log('확인 완료...')`와 `return '입장 가능'` 코드는 **절대 실행되지 않습니다.**

이처럼 `return`은 특정 조건에서 함수의 실행을 미리 끝내고 싶을 때 아주 유용하게 사용됩니다.

---

### Dead Code

만약 `return` 문 뒤에 코드를 작성하면 어떻게 될까요?

```jsx
function getTicket(type) {
  return type + ' 티켓';
  console.log('티켓 발급이 완료되었습니다.'); *// 이 코드는 절대 실행되지 않음*
}
```

`getTicket` 함수는 어떤 경우에도 `return` 문에서 실행이 중단되기 때문에, 그 아래 있는 `console.log`는 절대로 실행될 수 없습니다. 이렇게 **절대 실행될 일이 없는 코드**를 **Dead Code(죽은 코드)**라고 부릅니다. Dead Code는 아무런 의미가 없으므로 작성하지 않도록 주의해야 합니다.

---

### 주의사항

- return 키워드를 만나면 함수 실행이 즉시 중지되고, 그 이후의 코드는 실행되지 않는다.
- return 뒤에 코드는 작성하지 않도록 항상 주의할 것.

### 용어 설명

- **return**: 함수 실행 중 값을 반환하고 함수 실행을 즉시 중단하는 키워드.
- **Dead Code**: 절대로 실행될 수 없는 코드(예: return 뒤의 코드 등).

### 06. #Quiz return문 제대로 이해하기

### 문제 1

다음 함수의 실행 결과를 예측해보세요. `return`의 실행 중단 역할을 잘 생각해야 합니다.

```jsx
function checkGrade(score) {
  if (score >= 90) {
    return "A";
  }
  if (score >= 80) {
    return "B";
  }
  if (score >= 70) {
    return "C";
  }
  return "F";
}

console.log(checkGrade(85));
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    B
    ```
    
    해설:
    
    1. `checkGrade(85)`가 호출되고, score 파라미터에는 85가 전달됩니다
    2. 첫 번째 if (score >= 90) 문은 85 >= 90이 거짓(false)이므로 건너뜁니다
    3. 두 번째 if (score >= 80) 문은 85 >= 80이 참(true)이므로 안으로 들어갑니다
    4. return 'B';를 만납니다. 함수는 'B'를 반환하고 **그 즉시 실행을 중단합니다**
    5. 따라서 그 아래에 있는 if (score >= 70)이나 return 'F'; 코드는 실행되지 않습니다
    
    이처럼 if 문과 return을 함께 사용하면, 여러 조건 중 하나를 만족했을 때 함수의 실행을 바로 끝낼 수 있어 else if나 else 없이도 코드를 간결하게 작성할 수 있습니다
    

---

### 문제 2

다음 코드에서 Dead Code(죽은 코드)는 몇 번째 줄이며, 그 이유는 무엇인가요?

```jsx
*// 1*
function getMessage(isLoggedIn) {
  *// 2*
  if (isLoggedIn) {
    *// 3*
    return "로그인 되었습니다.";
    *// 4*
  } else {
    *// 5*
    return "로그인이 필요합니다.";
    *// 6*
  }
  *// 7*
  console.log("메시지 생성 완료");
  *// 8*
}
```

- 정답 및 해설
    
    정답:
    
    7번째 줄의 `console.log('메시지 생성 완료');`가 Dead Code입니다
    
    해설:
    
    getMessage 함수는 isLoggedIn 파라미터의 값에 따라 if문 또는 else문으로 들어가게 됩니다
    
    - isLoggedIn이 true이면 3번째 줄에서 return을 만나 함수가 종료됩니다
    - isLoggedIn이 false이면 5번째 줄에서 return을 만나 함수가 종료됩니다
    
    어떤 경우에도 함수는 3번째 줄 또는 5번째 줄에서 반드시 return을 만나 종료되기 때문에, 7번째 줄의 console.log는 절대로 실행될 수 없습니다
    

---

### 문제 3

다음 코드의 실행 결과를 예측해보세요

```jsx
function test() {
  console.log("A");
  console.log("B");
  return;
  console.log("C");
}

console.log("시작");
test();
console.log("끝");
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    시작
    A
    B
    끝
    ```
    
    해설:
    
    1. console.log('시작');이 실행되어 "시작"이 출력됩니다
    2. test() 함수가 호출됩니다
    3. 함수 내부의 console.log('A');와 console.log('B');가 차례로 실행되어 "A", "B"가 출력됩니다
    4. return;을 만납니다. return 뒤에 반환할 값이 없지만, 함수 실행 중단 역할은 동일하게 수행됩니다. 따라서 함수는 이 지점에서 바로 종료됩니다
    5. return 아래의 console.log('C');는 Dead Code가 되어 실행되지 않습니다
    6. 함수 실행이 끝났으므로, 원래 호출했던 곳으로 돌아와 console.log('끝');을 실행하여 "끝"을 출력합니다

### 07. return과 console.log의 차이

처음 프로그래밍을 배울 때 많은 분들이 `return`과 `console.log`의 역할을 헷갈려 합니다. 둘 다 무언가 값을 보여주는 것 같기 때문이죠. 하지만 둘의 역할은 완전히 다릅니다.

- **`console.log`**: 값을 **개발자 도구 콘솔에 보여주는(출력하는)** 역할. 사람의 눈으로 확인하기 위한 용도입니다.
- **`return`**: 함수가 작업한 결과물을 **호출한 곳으로 돌려주는(반환하는)** 역할. 반환된 값은 코드 내에서 다른 변수에 저장하거나, 다른 연산에 사용하는 등 **데이터로서 활용**됩니다.

두 가지 타입의 인사말 생성 함수를 통해 차이점을 알아봅시다.

```jsx
*// 1. 콘솔에 인사말을 '출력'하는 함수*
function printGreeting(name) {
  console.log(name + '님, 안녕하세요!');
}

*// 2. 인사말을 '반환'하는 함수*
function getGreeting(name) {
  return name + '님, 안녕하세요!';
}
```

---

### Case 1: 함수를 그냥 호출하기

두 함수를 각각 호출하면 어떻게 될까요?

```jsx
printGreeting('코드잇'); *// 콘솔에 "코드잇님, 안녕하세요!"가 출력됨*

getGreeting('자바스크립트'); *// 아무 일도 일어나지 않음*
```

- `printGreeting('코드잇')`은 함수 내부의 `console.log`를 실행하여 콘솔에 결과를 **보여줍니다.**
- `getGreeting('자바스크립트')`는 `'자바스크립트님, 안녕하세요!'` 라는 문자열 값을 **만들어서 돌려주기만 할 뿐**, 그 값을 가지고 무언가를 하라는 명령(예: `console.log`로 출력)이 없었기 때문에 우리 눈에는 아무것도 보이지 않습니다.

---

### Case 2: 함수의 결과를 변수에 저장하기

이번에는 각 함수의 실행 결과를 변수에 저장해봅시다.

```jsx
const printResult = printGreeting('코드잇');
console.log(printResult); *// undefined*

const getResult = getGreeting('자바스크립트');
console.log(getResult); *// "자바스크립트님, 안녕하세요!"*
```

- `printGreeting` 함수는 `return`문이 없습니다. **`return`이 없는 함수는 기본적으로 `undefined`를 반환**하기 때문에, `printResult` 변수에는 `undefined`가 저장됩니다. (물론 함수 내부의 `console.log`는 실행되어 "코드잇님, 안녕하세요!"가 먼저 출력됩니다.)
- `getGreeting` 함수는 인사말 문자열을 `return`하므로, `getResult` 변수에는 `'자바스크립트님, 안녕하세요!'` 라는 값이 잘 저장됩니다.

이처럼 함수의 결과물을 코드 내에서 **데이터로써 계속 사용하고 싶다면 반드시 `return`을 사용해야 합니다.**

---

### Case 3: `console.log`로 함수 호출 감싸기

`console.log` 안에 함수 호출을 넣으면 어떻게 될까요?

```jsx
*// printGreeting 함수는 return 값이 undefined 이다.*
console.log(printGreeting('코드잇'));

*// getGreeting 함수는 return 값이 문자열이다.*
console.log(getGreeting('자바스크립트'));
```

**실행 결과:**

```jsx
코드잇님, 안녕하세요!
undefined
자바스크립트님, 안녕하세요!
```

위 결과가 나오는 과정을 순서대로 살펴봅시다.

1. `console.log(printGreeting('코드잇'))` 실행
    - `printGreeting('코드잇')`이 먼저 호출됩니다.
    - `printGreeting` 함수 내부의 `console.log`가 실행되어 "코드잇님, 안녕하세요!"가 **첫 번째로** 출력됩니다.
    - `printGreeting` 함수는 `return`이 없으므로 `undefined`를 반환합니다.
    - 바깥쪽 `console.log`는 `undefined`를 받아서 **두 번째로** `undefined`를 출력합니다.
2. `console.log(getGreeting('자바스크립트'))` 실행
    - `getGreeting('자바스크립트')`가 먼저 호출됩니다.
    - 함수는 `'자바스크립트님, 안녕하세요!'` 문자열을 반환합니다.
    - 바깥쪽 `console.log`는 이 문자열을 받아서 **세 번째로** "자바스크립트님, 안녕하세요!"를 출력합니다.

`console.log`는 단순히 값을 확인하는 용도, `return`은 값을 만들어서 코드 세상에 내보내는 용도라고 기억하면 둘의 차이를 명확하게 구분할 수 있을 겁니다.

---

### 정리

- `console.log`는 코드 실행 흐름과 무관하게 값을 콘솔에 출력할 뿐이며, 코드 내에서 값으로 쓰려면 반드시 `return`이 필요함.
- `return`이 없는 함수는 기본적으로 `undefined`를 반환하므로, 그 결과를 변수에 저장하거나 반환값에 의존하는 코드를 작성할 때 주의해야 함.

### 용어 설명

- **return**: 함수가 결과를 반환할 때 사용하며, 반환 값은 코드 내에서 변수나 연산 등에 활용된다.
- **console.log**: 값이나 메시지를 콘솔에 출력하는 함수. 반환값이 없으며(즉, undefined) 디버깅이나 정보 확인용으로만 사용된다.

### 07. #Quiz return과 console.log의 차이 (10분)

### 문제 1

다음 코드의 실행 결과를 예측해보세요.

```jsx
function a() {
  console.log("A");
  return "B";
}

const result = a();
console.log(result);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    A
    B
    ```
    
    해설:
    
    1. a() 함수가 호출됩니다
    2. 함수 내부의 console.log('A')가 실행되어 콘솔에 "A"가 먼저 출력됩니다
    3. 함수는 'B'를 return합니다
    4. a() 호출문이 'B'로 대체되어, const result = 'B'; 코드가 실행된 것과 같아집니다
    5. result 변수에는 'B'가 저장됩니다
    6. 마지막 console.log(result)가 실행되어 콘솔에 "B"가 출력됩니다

---

## 문제 2

다음 코드의 실행 결과를 예측해보세요

```jsx
function add(x, y) {
  console.log(`${x}와 ${y}를 더합니다.`);
  return x + y;
}

const sum = add(3, 5);
console.log(sum);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    3와 5를 더합니다.
    8
    ```
    
    해설:
    
    1. add(3, 5) 함수가 호출됩니다
    2. 함수 내부의 console.log가 실행되어 "3와 5를 더합니다."가 출력됩니다
    3. 함수는 3 + 5의 결과인 8을 return합니다
    4. add(3, 5) 호출 부분이 8로 대체되어 const sum = 8; 코드가 실행된 것과 같아집니다
    5. sum 변수에 8이 저장됩니다
    6. console.log(sum)이 실행되어 8이 출력됩니다
    
    이처럼 함수 내부에 console.log를 사용하면 함수가 어떤 작업을 하고 있는지 중간 과정을 확인할 수 있고, return으로는 최종 결과물을 받아 활용할 수 있습니다
    

---

## 문제 3

다음 코드의 실행 결과를 예측해보세요

```jsx
function b(name) {
  console.log(name);
}

function c(name) {
  return name;
}

console.log(b("B"));
console.log(c("C"));
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    B
    undefined
    C
    ```
    
    해설:
    
    1. console.log(b('B')) 실행:
        - b('B') 함수가 먼저 호출됩니다
        - b 함수 내부의 console.log(name)이 실행되어 "B"가 출력됩니다
        - b 함수는 return문이 없으므로 undefined를 반환합니다
        - 바깥쪽 console.log가 이 undefined를 받아서 출력합니다
    2. console.log(c('C')) 실행:
        - c('C') 함수가 먼저 호출됩니다
        - c 함수는 파라미터로 받은 'C'를 그대로 return합니다
        - 바깥쪽 console.log가 이 'C'를 받아서 출력합니다

### 08. #실습 return과 console.log의 차이 실습 (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/6849
```

### 09. #실습 함수 부려먹기 III (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3406
```

### 10. 옵션널 파라미터

함수를 호출할 때 파라미터에 값을 전달하지 않으면 어떻게 될까요?

```jsx
function printMenu(menu) {
  console.log(menu);
}

printMenu('아메리카노'); *// '아메리카노' 출력*
printMenu();           *// undefined 출력*
```

**`printMenu()`**처럼 함수를 호출할 때 파라미터에 해당하는 값을 전달하지 않으면, 해당 파라미터는 **`undefined`**라는 값을 갖게 됩니다.

---

### 옵셔널 파라미터 (Optional Parameters)

때로는 함수를 호출할 때 특정 파라미터 값을 생략하고 싶을 수 있습니다. 이럴 때 파라미터에 **기본값(default value)**을 설정해 줄 수 있는데, 이를 **옵셔널 파라미터**라고 합니다. '선택적인 파라미터'라는 뜻이죠.

함수를 정의할 때 할당 연산자(**`=`**)를 사용해서 기본값을 설정할 수 있습니다.

```jsx
*// size 파라미터에 'Regular'라는 기본값을 설정*
function orderDrink(menu, size = 'Regular') {
  console.log(`${menu} ${size} 사이즈로 주문 완료!`);
}

orderDrink('아메리카노', 'Large');
orderDrink('카페라떼');
```

**실행 결과:**

```jsx
아메리카노 Large 사이즈로 주문 완료!
카페라떼 Regular 사이즈로 주문 완료!
```

- orderDrink('아메리카노', 'Large')처럼 size 파라미터에 값을 전달하면, 전달된 값('Large')이 그대로 사용됩니다.

- orderDrink('카페라떼')처럼 size 파라미터 값을 **생략**하면, 미리 설정해 둔 **기본값('Regular')**이 사용됩니다.

---

### 옵셔널 파라미터의 위치

옵셔널 파라미터를 사용할 때는 한 가지 주의할 점이 있습니다. 바로 **옵셔널 파라미터는 일반 파라미터보다 뒤쪽에 배치해야 한다**는 것입니다.

만약 옵셔널 파라미터가 앞에 오면 어떻게 될까요?

```jsx
*// 잘못된 예: 옵셔널 파라미터가 앞에 있는 경우*
function orderDrink(size = 'Regular', menu) {
  console.log(`${menu} ${size} 사이즈로 주문 완료!`);
}

orderDrink('아메리카노');
```

**실행 결과:**

```jsx
undefined 아메리카노 사이즈로 주문 완료!
```

자바스크립트는 함수를 호출할 때 전달된 값들을 파라미터 순서대로 인식합니다. **`orderDrink('아메리카노')`**를 호출하면, '아메리카노'라는 값이 첫 번째 파라미터인 **`size`**에 할당됩니다. 두 번째 파라미터인 **`menu`**에는 아무 값도 전달되지 않아 **`undefined`**가 되어버립니다.

따라서 원하는 결과를 얻으려면, 값을 필수로 받아야 하는 일반 파라미터를 앞에 쓰고, 생략 가능한 옵셔널 파라미터를 뒤에 써야 합니다.

**올바른 예:**

```jsx
function orderDrink(menu, size = 'Regular') {
  *// ...*
}
```

### 주의사항

- 옵셔널 파라미터(기본값 지정 파라미터)는 필수 파라미터보다 반드시 뒤쪽에 위치해야 한다.
- 파라미터 순서에 따라 값이 엉뚱하게 할당될 수 있음에 주의할 것.

### 용어 설명

- **옵셔널 파라미터(Optional Parameter)**: 함수 정의에서 기본값을 갖는 선택적 파라미터. 인자를 전달하지 않으면 미리 지정한 기본값이 사용된다.
- **기본값(Default Value)**: 파라미터에 값을 전달하지 않을 경우 자동으로 사용되는 값.

### 10. #Quiz 옵션널 파라미터

### 문제 1

다음 코드를 실행했을 때 콘솔에 출력될 결과를 예측해보세요.

```jsx
function printInfo(name, year = 2022) {
  console.log(`${name}님, ${year}년에 입사하셨군요!`);
}

printInfo("김코드", 2020);
printInfo("박자바");
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    김코드님, 2020년에 입사하셨군요!
    박자바님, 2022년에 입사하셨군요!
    ```
    
    해설:
    
    - printInfo('김코드', 2020): name과 year 파라미터에 모든 값을 정상적으로 전달했으므로, 전달된 값인 '김코드'와 2020이 사용됩니다.
    - printInfo('박자바'): year 파라미터 값을 생략했습니다. 이 경우 year는 기본값으로 설정된 2022를 사용하게 됩니다.

---

### 문제 2

사용자의 포인트를 계산하는 함수가 있습니다. 포인트를 얼마나 적립해줄지 pointsToAdd 값으로 전달하는데, 이 값을 생략하면 기본적으로 100 포인트를 적립해주려고 합니다. 아래 코드의 (a) 부분에 들어갈 코드로 가장 적절한 것을 고르세요.

```jsx
function addPoints(currentPoints, pointsToAdd (a) ) {
  return currentPoints + pointsToAdd;
}

*// 테스트*
console.log(addPoints(1000, 200)); *// 1200*
console.log(addPoints(1500));      *// 1600*
```

1. = 100
2. || 100
3. == 100
4. === 100
- 정답 및 해설
    
    정답: 1번 = 100
    
    해설:
    
    옵셔널 파라미터의 기본값을 설정할 때는 할당 연산자(=)를 사용합니다. pointsToAdd = 100과 같이 작성하면, pointsToAdd 파라미터 값이 전달되지 않았을 때 자동으로 100을 기본값으로 사용하게 됩니다.
    

---

### 문제 3

다음 코드는 의도한 대로 동작하지 않습니다. 그 이유를 설명하고, 올바르게 동작하도록 코드를 수정해보세요.

**의도:** title만 전달하면 author는 '작자 미상'으로 출력되길 원함.

**수정 전 코드:**

```jsx
function printBook(author = "작자 미상", title) {
  console.log(`${title} (지은이: ${author})`);
}

printBook("어린 왕자");
```

- 정답 및 해설
    
    이유:
    
    옵셔널 파라미터(author)가 일반 파라미터(title)보다 앞에 있기 때문입니다. printBook('어린 왕자')를 호출하면, 전달된 '어린 왕자' 값이 첫 번째 파라미터인 author에 할당되고, title 파라미터는 undefined가 되어버립니다.
    
    수정 후 코드:
    
    옵셔널 파라미터를 뒤쪽으로 보내야 합니다.
    
    ```jsx
    function printBook(title, author = "작자 미상") {
      console.log(`${title} (지은이: ${author})`);
    }
    
    printBook("어린 왕자"); *// 어린 왕자 (지은이: 작자 미상)*
    printBook("데미안", "헤르만 헤세"); *// 데미안 (지은이: 헤르만 헤세)*
    ```
    

### 11. #실습 세트 메뉴 주문하기

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3408
```

### 12. 변수의 scope

변수를 선언하면 코드 어디에서든 사용할 수 있는 것 같지만, 사실 변수마다 접근할 수 있는 유효한 범위가 정해져 있습니다. 이 범위를 **스코프(Scope)**라고 합니다.

스코프는 크게 **전역 스코프(Global Scope)**와 **지역 스코프(Local Scope)**로 나뉩니다.

---

### 지역 스코프 (Local Scope)

함수의 중괄호 `{}`로 감싸진 부분을 **블록(Block)**이라고 합니다. 이 블록 안에서 선언된 변수를 **지역 변수(Local Variable)**라고 부릅니다.

지역 변수는 **오직 자신이 선언된 블록 안에서만** 접근할 수 있습니다. 마치 특정 상점 안에서만 통용되는 규칙과 같습니다.

```jsx
function showLocalPrice() {
  *// 상점(지역)의 자체 할인 가격*
  let price = 2000;
  console.log(`상점 가격: ${price}원`);
}

showLocalPrice(); *// "상점 가격: 2000원" 출력*

console.log(price); *// Error: price is not defined*
```

`showLocalPrice` 함수 안에서 선언된 `price` 변수는 함수 밖에서는 존재하지 않는 것과 같습니다. 따라서 함수 밖에서 `price`에 접근하려고 하면 `not defined`(정의되지 않음) 에러가 발생합니다.

---

### 전역 스코프 (Global Scope)

블록 밖, 즉 코드의 가장 바깥 영역에서 선언된 변수를 **전역 변수(Global Variable)**라고 합니다.

전역 변수는 코드 전체에서, 즉 **모든 블록 안과 밖에서** 자유롭게 접근할 수 있습니다. 마치 모든 상점에 적용되는 본사의 방침과 같습니다.

```jsx
*// 본사(전역)의 정가*
let price = 3000;

function showGlobalPrice() {
  console.log(`본사 가격: ${price}원`);
}

showGlobalPrice(); *// "본사 가격: 3000원" 출력*
console.log(`전체 정가: ${price}원`); *// "전체 정가: 3000원" 출력*
```

함수 밖에서 선언된 `price` 변수는 함수 안에서도, 밖에서도 모두 접근이 가능합니다.

---

### 스코프 체인 (Scope Chain)

만약 지역 변수와 전역 변수의 이름이 같다면 어떻게 될까요?

```jsx
let priceChain = 3000; *// 전역 변수 (본사 정가)*

function showStorePrice() {
  let priceChain = 2000; *// 지역 변수 (상점 할인가)*
  console.log(`상점 할인가: ${priceChain}원`);
}

showStorePrice(); *// "상점 할인가: 2000원" 출력*
console.log(`본사 정가: ${priceChain}원`); *// "본사 정가: 3000원" 출력*
```

자바스크립트는 변수를 찾을 때, **가장 가까운 스코프부터 바깥쪽으로** 차례대로 검색합니다. 이를 **스코프 체인(Scope Chain)**이라고 합니다.

### 스코프 체인이란?

스코프 체인은 말 그대로 **스코프들이 체인(사슬)처럼 연결되어 있다**는 의미입니다.

함수 안에 함수가 있을 때, 안쪽 함수는 바깥쪽 함수의 변수에 접근할 수 있습니다. 이렇게 스코프들이 서로 연결되어 있는 구조를 스코프 체인이라고 합니다.

```jsx
let globalVar = "전역";

function outer() {
  let outerVar = "외부 함수";

  function inner() {
    let innerVar = "내부 함수";

    console.log(innerVar); *// ✅ 자신의 변수 사용*
    console.log(outerVar); *// ✅ 바깥 함수의 변수 사용*
    console.log(globalVar); *// ✅ 전역 변수 사용*
  }

  inner();
}

outer();
```

위 코드에서 `inner` 함수는 다음 순서로 변수를 찾습니다:

1. inner 함수 스코프 (자기 자신)
2. outer 함수 스코프 (부모)
3. 전역 스코프
4. (없으면) ReferenceError 발생

### 체인은 한 방향으로만 작동합니다

중요한 점은 **안쪽에서 바깥쪽으로만** 접근할 수 있다는 것입니다. 반대 방향은 불가능합니다.

```jsx
function parent() {
  let parentVar = "부모";

  function child() {
    let childVar = "자식";
    console.log(parentVar); *// ✅ 가능: 자식이 부모 변수에 접근*
  }

  console.log(childVar); *// ❌ 불가능: 부모가 자식 변수에 접근*
  child();
}

parent();
```

### 같은 이름의 변수가 있다면?

스코프 체인을 따라가다가 **가장 먼저 발견한 변수**를 사용합니다.

```jsx
let name = "전역";

function outer() {
  let name = "outer";

  function inner() {
    let name = "inner";
    console.log(name); *// "inner" (가장 가까운 스코프의 변수)*
  }

  inner();
  console.log(name); *// "outer"*
}

outer();
console.log(name); *// "전역"*
```

각 함수는 **자신의 스코프에 있는 변수**를 우선적으로 사용하고, 없을 때만 바깥쪽 스코프를 확인합니다.

### 실용적인 예제

```jsx
function createCounter() {
  let count = 0; *// outer 스코프*

  return function () {
    *// inner 스코프*
    count++; *// 스코프 체인으로 count에 접근*
    console.log(count);
  };
}

const counter = createCounter();
counter(); *// 1*
counter(); *// 2*
counter(); *// 3*
```

위 예제에서 반환된 내부 함수는 `createCounter` 함수의 `count` 변수에 계속 접근할 수 있습니다. 이것이 가능한 이유가 바로 스코프 체인 덕분입니다.

> 스코프 체인 정리:
> 
> 1. 변수를 사용하면, **자신의 스코프**에서 먼저 찾는다.
> 2. 없으면 **바깥쪽(부모) 스코프**로 이동해서 찾는다.
> 3. 계속 찾다가 **전역 스코프**까지 확인한다.
> 4. 전역 스코프에도 없으면 **에러**가 발생한다.
> 5. 체인은 **안쪽 → 바깥쪽** 한 방향으로만 작동한다.

이러한 스코프 체인 덕분에 우리는 함수 안에서 바깥쪽 변수를 자유롭게 사용할 수 있고, 동시에 같은 이름의 변수를 서로 다른 스코프에서 충돌 없이 사용할 수 있습니다.

---

### 주의사항

- 지역 변수는 자신이 선언된 블록(함수 등) 밖에서는 접근할 수 없습니다.
- 전역 변수는 코드 어디에서나 접근 가능하지만 남용은 피하는 것이 좋습니다.
- 같은 이름의 지역/전역 변수가 있을 때 가장 가까운(안쪽) 스코프의 변수를 먼저 사용합니다.

### 용어설명

- **스코프(Scope)**: 변수가 유효한 코드의 범위입니다.
- **전역 변수(Global Variable)**: 코드 어디에서나 접근 가능한 변수입니다.
- **지역 변수(Local Variable)**: 특정 블록 안에서만 유효한 변수입니다.
- **스코프 체인(Scope Chain)**: 변수 검색 시, 가장 가까운 스코프부터 바깥쪽으로 검색하는 규칙입니다.

### 12. #Quiz 변수의 scope (10분)

### 문제 1

다음 코드의 실행 결과를 예측해보세요.

```jsx
let x = "전역";

function a() {
  let x = "지역";
  console.log(x);
}

a();
console.log(x);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    지역
    전역
    ```
    
    해설:
    
    1. `a()` 함수가 호출됩니다.
    2. 함수 내부의 `console.log(x)`는 스코프 체인에 따라 가장 가까운 지역 스코프의 `x`를 먼저 찾습니다. 함수 내부에 `let x = '지역';` 이라는 지역 변수가 있으므로, '지역'이 출력됩니다.
    3. 함수 실행이 끝나고, 전역 스코프의 `console.log(x)`가 실행됩니다.
    4. 이 위치에서는 전역 변수 `let x = '전역';`에만 접근할 수 있으므로, '전역'이 출력됩니다.

---

### 문제 2

다음 코드의 실행 결과를 예측해보세요.

```jsx
let x = 10;

function b() {
  let y = 20;
  console.log(x + y);
}

b();
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    30
    ```
    
    해설:
    
    1. `b()` 함수가 호출됩니다.
    2. 함수 내부에서 `x + y` 연산을 하려고 합니다.
    3. `y`는 함수 내부에 선언된 지역 변수이므로 `20`을 사용합니다.
    4. `x`는 함수 내부에 선언된 것이 없습니다. 따라서 스코프 체인을 따라 바깥 스코프(전역 스코프)로 나가서 `x`를 찾습니다. 전역 변수 `let x = 10;`을 찾았으므로 `10`을 사용합니다.
    5. 결과적으로 `10 + 20`의 결과인 `30`이 콘솔에 출력됩니다.

---

### 문제 3

다음 코드를 실행하면 에러가 발생합니다. 에러가 발생하는 이유를 스코프 개념을 사용하여 설명해보세요.

```jsx
function c() {
  let z = 100;
}

c();
console.log(z);
```

- 정답 및 해설
    
    에러 발생 이유:
    
    `z`는 `c` 함수 내부에서 선언된 **지역 변수**입니다. 지역 변수의 스코프(유효 범위)는 자신이 선언된 함수 블록 내부로 한정됩니다.
    
    따라서 `c` 함수가 실행 종료된 후, 함수 외부의 전역 스코프에서 `console.log(z)`를 통해 `z`에 접근하려고 하면, 해당 스코프에서는 `z`라는 변수를 찾을 수 없기 때문에 `ReferenceError: z is not defined` (참조 오류: z가 정의되지 않았습니다) 에러가 발생합니다.
    

### 13. scope 퀴즈

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3410
```

### 14. 상수

프로그래밍을 하다 보면 '절대 바뀌어서는 안 되는 값'들이 있습니다. 예를 들어, 우리나라의 부가세율은 10%로 고정되어 있습니다. 이런 값들을 변수(`let`)로 선언하면, 실수로 값을 변경했을 때 큰 문제가 발생할 수 있습니다.

이럴 때 사용하는 것이 바로 **상수(Constant)**입니다.

---

### 상수 선언하기: `const`

상수는 `const` 키워드를 사용하여 선언합니다. `const`로 선언된 값은 다시는 다른 값으로 재할당할 수 없습니다.

```jsx
const TAX_RATE = 0.1; *// 부가세율 10%*

let itemPrice = 10000; *// 상품 가격*
let tax = itemPrice * TAX_RATE; *// 부가세 계산*

console.log(`상품 가격은 ${itemPrice}원, 부가세는 ${tax}원 입니다.`);
```

위 코드에서 `TAX_RATE`는 프로그램이 실행되는 동안 절대 바뀔 일이 없는 고정된 값입니다. 만약 누군가 이 값을 바꾸려고 시도하면 어떻게 될까요?

```jsx
const TAX_RATE = 0.1;

TAX_RATE = 0.2; *// Error: Assignment to constant variable.*
```

`const`로 선언한 상수에 새로운 값을 할당하려고 하면, 위와 같이 에러가 발생합니다. 덕분에 실수로 중요한 값을 변경하는 것을 방지하고 코드의 안정성을 높일 수 있습니다.

---

### `const`의 특징

`const`는 `let`과 다른 두 가지 중요한 특징이 있습니다.

1. **재할당이 불가능합니다.**
2. **선언과 동시에 값을 할당해야 합니다.**

값을 나중에 할당하려고 하면 에러가 발생합니다.

```jsx
const SHIPPING_FEE; *// Error: Missing initializer in const declaration*
SHIPPING_FEE = 3000;
```

상수는 '변하지 않는 값'이므로, 처음 선언할 때부터 어떤 값을 가질지 명확하게 정해주어야 합니다.

---

### 상수 이름 짓기 (관례)

코드만 보고도 어떤 것이 변수이고 어떤 것이 상수인지 쉽게 구분할 수 있다면 좋겠죠? 그래서 개발자들 사이에는 상수의 이름을 짓는 암묵적인 규칙(관례)이 있습니다.

> 상수의 이름은 모든 글자를 대문자로 작성하고, 여러 단어로 이루어진 경우 밑줄(_)로 단어를 구분합니다.
> 
- 변수: `itemPrice`, `isLoggedIn`
- 상수: `TAX_RATE`, `SHIPPING_FEE`, `MAX_USER_COUNT`

이 규칙을 지키지 않아도 코드는 동작하지만, 다른 개발자와 협업하거나 다른 사람의 코드를 읽을 때 가독성을 크게 높여주므로 꼭 지키는 것이 좋습니다.

변할 수 있는 값은 `let`으로, 변하지 않아야 할 값은 `const`로 선언하는 습관은 좋은 코드를 만드는 첫걸음입니다.

---

### 주의사항

- `const`로 선언한 상수는 재할당이 불가능합니다.
- 반드시 선언과 동시에 값을 할당해야 합니다(초기화 필수).
- 변하지 않는 값엔 `const`, 변할 수 있는 값엔 `let`을 사용합니다.

### 용어설명

- **상수(Constant)**: 절대 변하지 않는 값을 담는 변수.
- **const**: 재할당 불가, 선언과 동시에 초기화가 반드시 필요한 변수 선언 키워드.
- **관례**: 상수명은 모두 대문자, 단어 사이는 언더스코어(_)로 구분합니다.

### 14. #Quiz 상수 (15분)

### 코드잇 문제

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3412
```

### 문제 1

다음 코드에서 `let`으로 선언된 변수 중, `const`를 사용한 상수로 바꾸는 것이 더 적절해 보이는 것을 모두 고르고 그 이유를 설명하세요.

```jsx
let guestName = "김코드";
let visitCount = 3;
let maxConnections = 5;
let serverDomain = "codeit.kr";

console.log(`${guestName}님, ${visitCount}번째 방문을 환영합니다.`);
console.log(`현재 서버는 ${serverDomain}에서 운영되고 있습니다.`);
console.log(`최대 동시 접속자 수는 ${maxConnections}명 입니다.`);
```

- 정답 및 해설
    
    정답:
    
    `maxConnections`와 `serverDomain`을 `const`로 바꾸는 것이 더 적절합니다.
    
    ```jsx
    let guestName = "김코드";
    let visitCount = 3;
    const MAX_CONNECTIONS = 5;
    const SERVER_DOMAIN = "codeit.kr";
    ```
    
    이유:
    
    - `guestName`(손님 이름)과 `visitCount`(방문 횟수)는 사용자마다, 그리고 시간이 지남에 따라 계속 변할 수 있는 값이므로 `let`을 사용합니다.
    - `maxConnections`(최대 접속자 수)와 `serverDomain`(서버 주소)은 프로그램이 실행되는 동안 변하지 않는 **고정된 설정값**이므로 `const`로 선언하는 것이 적절합니다.

---

### 문제 2

다음 코드에서 에러가 발생하는 줄을 모두 고르고, 각각의 에러 발생 이유를 설명하세요.

```jsx
*// 1*
const MY_FAVORITE_NUMBER;
*// 2*
MY_FAVORITE_NUMBER = 7;
*// 3*
console.log(MY_FAVORITE_NUMBER);
*// 4// 5*
const MY_PET_NAME = 'Leo';
*// 6*
MY_PET_NAME = 'Leo the Lion';
*// 7*
console.log(MY_PET_NAME);
```

- 정답 및 해설
    
    정답:
    
    에러는 **1번째 줄**과 **6번째 줄**에서 발생합니다.
    
    이유:
    
    - **1번째 줄:** `const`로 상수를 선언할 때는 반드시 **선언과 동시에 값을 할당**해야 합니다. 값을 할당하지 않아 `Missing initializer in const declaration` 에러가 발생합니다.
    - **6번째 줄:** `const`로 선언된 상수에 새로운 값을 **재할당**하려 하면 `Assignment to constant variable` 에러가 발생합니다.

---

### 문제 3

상수의 이름에 대한 일반적인 네이밍 컨벤션(관례)으로 올바른 것을 고르세요.

1. myConstantNumber (camelCase)
2. MyConstantNumber (PascalCase)
3. my_constant_number (snake_case)
4. MY_CONSTANT_NUMBER (SNAKE_CASE)

- 정답 및 해설
    
    정답:
    
    4번 `MY_CONSTANT_NUMBER`
    
    해설:
    
    상수의 이름은 **모든 글자를 대문자**로 쓰고, 여러 단어로 이루어진 경우 **밑줄(`_`)**로 단어를 구분하는 것이 일반적인 관례입니다.
    
    이를 통해 코드 내에서 변수와 상수를 시각적으로 쉽게 구분할 수 있습니다.
    

### 16. #실습 함수 변수 복습하기 (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3413
```

## 3. 제어문

### 01. if문

지금까지 우리가 작성한 코드는 위에서 아래로 순서대로 실행되었습니다. 하지만 때로는 특정 조건에 따라 코드의 실행 여부를 결정하고 싶을 때가 있습니다. 이럴 때 사용하는 것이 바로 **조건문**입니다.

가장 기본적인 조건문인 `if`문에 대해 알아봅시다.

---

## if문

`if`문은 '만약 ~하면, ...한다'라는 의미를 가집니다. 소괄호 `()` 안의 조건이 참(true)일 경우에만 중괄호 `{}` 안의 코드를 실행합니다.

**기본 구조:**

```jsx
if (조건) {
  *// 조건이 참(true)일 때 실행될 코드*
}
```

놀이기구 탑승 조건을 예로 들어봅시다. 키가 140cm 이상이어야만 탑승할 수 있습니다.

```jsx
let height = 150;

if (height >= 140) {
  console.log('놀이기구에 탑승할 수 있습니다.');
}
```

위 코드에서 `height`는 150이므로, `height >= 140` 조건은 참(true)이 됩니다. 따라서 중괄호 안의 `console.log`가 실행되어 "놀이기구에 탑승할 수 있습니다."라는 메시지가 출력됩니다.

만약 `height`가 130이라면 어떨까요? `height >= 140` 조건이 거짓(false)이 되므로, `if`문은 아무것도 실행하지 않고 그냥 지나갑니다.

---

## else문

`if`문의 조건이 거짓(false)일 때 실행할 코드를 지정하고 싶다면 `else`문을 사용할 수 있습니다. `else`는 '그렇지 않으면'이라는 의미입니다.

**기본 구조:**

```jsx
if (조건) {
  *// 조건이 참(true)일 때 실행될 코드*
} else {
  *// 조건이 거짓(false)일 때 실행될 코드*
}
```

`else`문을 사용해서 키가 140cm 미만일 경우의 메시지도 추가해봅시다.

```jsx
let height = 135;

if (height >= 140) {
  console.log('놀이기구에 탑승할 수 있습니다.');
} else {
  console.log('키가 140cm 이상이어야 탑승할 수 있습니다.');
}
```

`height`가 135이므로 `if`문의 조건 `height >= 140`은 거짓(false)이 됩니다. 따라서 `if`문 블록은 건너뛰고, `else`문 블록 안의 코드가 실행되어 "키가 140cm 이상이어야 탑승할 수 있습니다."라는 메시지가 출력됩니다.

이처럼 `if`문과 `else`문을 함께 사용하면, 특정 조건에 따라 두 가지 다른 동작을 하도록 코드의 흐름을 나눌 수 있습니다.

### 01. #Quiz if문 (15분)

### 문제 1

다음 코드의 실행 결과를 예측해보세요.

```jsx
let age = 25;

if (age >= 20) {
  console.log("성인입니다.");
} else {
  console.log("미성년자입니다.");
}
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    성인입니다.
    ```
    
    해설:
    
    `age` 변수의 값은 `25`입니다. `if`문의 조건 `age >= 20`은 `25 >= 20`이므로 참(true)입니다. 따라서 `if`문의 코드 블록이 실행되어 "성인입니다."가 콘솔에 출력됩니다. `else`문은 실행되지 않습니다.
    

---

## 문제 2

다음 코드의 실행 결과를 예측해보세요.

```jsx
let distance = 3;
let fare = 2000;

if (distance > 2) {
  fare = fare + 500;
}

console.log(fare);
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    2500
    ```
    
    해설:
    
    1. `distance`는 `3`이고, `fare`는 `2000`으로 시작합니다.
    2. `if`문의 조건 `distance > 2`는 `3 > 2`이므로 참(true)입니다.
    3. `if`문의 코드 블록 `fare = fare + 500;`이 실행됩니다.
    4. `fare`의 값은 `2000 + 500`의 결과인 `2500`으로 업데이트됩니다.
    5. `console.log(fare);`가 실행되어 최종 값인 `2500`이 출력됩니다.

---

## 문제 3

변수 `myScore`에 점수가 할당되어 있습니다. `if-else`문을 사용하여 `myScore`가 60점 이상이면 "합격!", 그렇지 않으면 "불합격!"을 콘솔에 출력하는 코드를 완성하세요.

```jsx
let myScore = 75;

*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    정답:
    
    ```jsx
    let myScore = 75;
    
    if (myScore >= 60) {
      console.log("합격!");
    } else {
      console.log("불합격!");
    }
    ```
    
    해설:
    
    `myScore`가 60 이상인지 확인하는 조건 `myScore >= 60`을 `if`문에 작성합니다. 이 조건이 참일 때 "합격!"을 출력하고, 그렇지 않은 모든 경우(`else`)에 "불합격!"을 출력하도록 코드를 구성합니다.
    

### 02. #실습 롤러코스터, 탈 수 있을까?

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3415
```

### 03. else if문

지난 시간에 우리는 `if`문과 `else`문을 통해 프로그램의 흐름을 두 가지 방향으로 나눌 수 있다는 것을 배웠습니다. 하지만 현실에서는 두 가지 이상의 다양한 조건에 따라 다른 동작을 해야 하는 경우가 많습니다. 예를 들어, 시간에 따라 다른 인사말을 출력해야 한다면 어떻게 해야 할까요?

---

### if문 중첩하기

`if`문과 `else`문만으로 여러 조건을 처리하는 한 가지 방법은 `else`문 안에 또 다른 `if`문을 중첩하는 것입니다.

**기본 구조:**

```jsx
if (조건1) {
  *// 조건1이 참일 때 실행될 코드*
} else {
  if (조건2) {
    *// 조건1은 거짓이고 조건2가 참일 때 실행될 코드*
  } else {
    *// 조건1, 조건2 모두 거짓일 때 실행될 코드*
  }
}
```

현재 시간에 따라 다른 인사말을 출력하는 예제를 만들어 봅시다. 현재 시간을 `hour` 변수에 저장하고, 이 값에 따라 인사말을 다르게 출력해 보겠습니다.

```jsx
let hour = 14; *// 현재 시간 (24시간 기준)*

if (hour < 6) {
  console.log('안녕히 주무세요!');
} else {
  if (hour < 12) {
    console.log('좋은 아침입니다!');
  } else {
    if (hour < 18) {
      console.log('안녕하세요!');
    } else {
      console.log('좋은 저녁입니다!');
    }
  }
}
```

위 코드에서 `hour`가 14이므로,

1. `hour < 6` (14 < 6)은 거짓입니다. `else` 블록으로 넘어갑니다.
2. `hour < 12` (14 < 12)는 거짓입니다. 다시 `else` 블록으로 넘어갑니다.
3. `hour < 18` (14 < 18)은 참입니다. 따라서 "안녕하세요!"가 출력됩니다.

이처럼 `if`문을 중첩하여 여러 조건을 처리할 수 있지만, 조건이 많아질수록 코드가 깊어지고 가독성이 떨어지는 문제가 발생합니다.

---

### else if문

`else`문 뒤에 `if`문이 바로 이어지는 패턴이 반복될 때, 이를 더 간결하게 표현할 수 있는 방법이 바로 `else if`문입니다. `else if`는 '그렇지 않고 만약 ~하면'이라는 의미를 가집니다.

**기본 구조:**

```jsx
if (조건1) {
  *// 조건1이 참일 때 실행될 코드*
} else if (조건2) {
  *// 조건1은 거짓이고 조건2가 참일 때 실행될 코드*
} else if (조건3) {
  *// 조건1, 조건2는 거짓이고 조건3이 참일 때 실행될 코드*
} else {
  *// 모든 조건이 거짓일 때 실행될 코드*
}
```

위에서 작성했던 시간에 따른 인사말 예제를 `else if`문을 사용하여 개선해 봅시다.

```jsx
let hour = 20; *// 현재 시간 (24시간 기준)*

if (hour < 6) {
  console.log('안녕히 주무세요!');
} else if (hour < 12) {
  console.log('좋은 아침입니다!');
} else if (hour < 18) {
  console.log('안녕하세요!');
} else {
  console.log('좋은 저녁입니다!');
}
```

`hour`가 20일 경우,

1. `hour < 6` (20 < 6)은 거짓입니다.
2. `else if (hour < 12)` (20 < 12)도 거짓입니다.
3. `else if (hour < 18)` (20 < 18)도 거짓입니다.
4. 모든 `if`와 `else if` 조건이 거짓이므로, 마지막 `else` 블록의 코드가 실행되어 "좋은 저녁입니다!"가 출력됩니다.

`else if`문을 사용하면 코드가 훨씬 평평하고 읽기 쉬워지는 것을 알 수 있습니다. 여러 조건 중 하나만 만족할 때 특정 동작을 수행해야 하는 경우에 매우 유용하게 사용됩니다.

---

### 요약

- `if`문과 `else`문만으로도 여러 조건을 중첩하여 처리할 수 있지만, 가독성이 떨어질 수 있습니다.
- `else if`문은 `else` 뒤에 `if`문이 이어지는 중첩 구조를 간결하게 표현할 수 있도록 돕습니다.
- 여러 조건 중 하나만 만족할 때 특정 코드를 실행해야 하는 상황에서 `else if`문을 활용하면 코드를 더 효율적이고 읽기 쉽게 만들 수 있습니다.

### 03. #Quiz else if문 (15분)

### 문제 1

다음 점수 변수 `score`의 값에 따라 적절한 학점을 출력하는 `else if`문을 작성하세요.

- 90점 이상: 'A'
- 80점 이상 90점 미만: 'B'
- 70점 이상 80점 미만: 'C'
- 60점 이상 70점 미만: 'D'
- 60점 미만: 'F'

```jsx
let score = 85;
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    let score = 85;
    
    if (score >= 90) {
      console.log("A");
    } else if (score >= 80) {
      console.log("B");
    } else if (score >= 70) {
      console.log("C");
    } else if (score >= 60) {
      console.log("D");
    } else {
      console.log("F");
    }
    ```
    
    해설: `else if`문을 사용하여 점수 구간별로 조건을 나누고, 해당 조건에 맞는 학점을 출력합니다. 조건은 위에서부터 순서대로 평가되므로, `score >= 90`이 거짓일 경우에만 `score >= 80`을 평가하게 됩니다.
    

---

### 문제 2

숫자로 표현된 요일 `day` 변수의 값에 따라 다른 메시지를 출력하는 `else if`문을 작성하세요.

- 1: '월요일입니다. 한 주의 시작!'
- 2: '화요일입니다. 힘내세요!'
- 3: '수요일입니다. 절반 왔어요!'
- 4: '목요일입니다. 조금만 더!'
- 5: '금요일입니다. 주말이 다가와요!'
- 그 외: '주말입니다. 즐거운 시간 보내세요!'

```jsx
let day = 5;
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    let day = 5;
    
    if (day === 1) {
      console.log("월요일입니다. 한 주의 시작!");
    } else if (day === 2) {
      console.log("화요일입니다. 힘내세요!");
    } else if (day === 3) {
      console.log("수요일입니다. 절반 왔어요!");
    } else if (day === 4) {
      console.log("목요일입니다. 조금만 더!");
    } else if (day === 5) {
      console.log("금요일입니다. 주말이 다가와요!");
    } else {
      console.log("주말입니다. 즐거운 시간 보내세요!");
    }
    ```
    
    해설: `else if`문을 사용하여 각 요일에 해당하는 숫자를 `===` 연산자로 비교하고, 해당 요일에 맞는 메시지를 출력합니다. 어떤 요일에도 해당하지 않을 경우 `else` 블록의 주말 메시지가 출력됩니다.
    

### 04. 학점 계산기

```jsx
codeit.kr/topics/core-concept-of-javascript-programming/lessons/3416
```

### 05. 서열 정리

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3418
```

### 06. switch문

지난 시간에 `if-else if`문을 통해 여러 조건에 따라 다른 코드를 실행하는 방법을 배웠습니다. `if-else if`문은 조건의 범위가 넓거나 복잡한 조건을 처리할 때 유용합니다. 하지만 특정 '값'에 따라 정확히 일치하는 경우를 처리해야 할 때는 `switch`문이 더 간결하고 가독성 높은 코드를 제공할 수 있습니다.

---

### switch문

`switch`문은 하나의 변수(또는 표현식)의 값을 여러 `case`와 비교하여, 일치하는 `case`의 코드 블록을 실행하는 조건문입니다.

**기본 구조:**

```jsx
switch (비교할_값) {
  case 값1:
    *// 비교할_값이 값1과 일치할 때 실행될 코드*
    break; *// switch문을 빠져나옴*
  case 값2:
    *// 비교할_값이 값2와 일치할 때 실행될 코드*
    break;
  default:
    *// 비교할_값이 어떤 case와도 일치하지 않을 때 실행될 코드
    // default는 선택 사항이며, break가 필요 없습니다.*
}
```

- **`switch (비교할_값)`**: 괄호 안에 비교할 변수나 표현식을 넣습니다.
- **`case 값:`**: `비교할_값`과 일치하는지 확인할 특정 값을 지정합니다. 콜론(`:`) 뒤에 실행할 코드를 작성합니다.
- **`break;`**: 현재 `case`의 실행을 마치고 `switch`문 전체를 빠져나가도록 합니다. `break`가 없으면 일치하는 `case` 이후의 모든 `case` 코드(심지어 `default`까지)가 실행됩니다. 이를 '폴 스루(fall-through)'라고 합니다.
- **`default:`**: `비교할_값`이 어떤 `case`와도 일치하지 않을 때 실행됩니다. `if-else if`문의 마지막 `else`와 비슷한 역할을 합니다. 선택 사항입니다.

요일에 따라 다른 활동을 추천하는 예제를 `switch`문으로 만들어 봅시다. `day` 변수에 1부터 7까지의 숫자로 요일을 표현하고, 각 요일에 맞는 메시지를 출력해 보겠습니다. (1: 월요일, 2: 화요일, ..., 7: 일요일)

```jsx
let day = 3; *// 1:월, 2:화, 3:수, 4:목, 5:금, 6:토, 7:일*

switch (day) {
  case 1:
    console.log('새로운 한 주를 시작해 보세요!');
    break;
  case 2:
    console.log('화요일은 운동하기 좋은 날!');
    break;
  case 3:
    console.log('수요일엔 문화생활 어떠세요?');
    break;
  case 4:
    console.log('목요일은 자기계발의 날!');
    break;
  case 5:
    console.log('불금! 친구들과 약속을 잡아보세요!');
    break;
  case 6:
  case 7:
    console.log('주말에는 푹 쉬세요!');
    break;
  default:
    console.log('유효하지 않은 요일입니다.');
}
```

위 코드에서 `day`가 3이므로, `case 3:`이 일치하여 "수요일엔 문화생활 어떠세요?"가 출력되고 `break`를 만나 `switch`문을 빠져나옵니다.

`case 6:`과 `case 7:`은 `break` 없이 연속되어 있습니다. 이는 `day`가 6이거나 7일 경우 모두 "주말에는 푹 쉬세요!"를 출력하도록 하는 '폴 스루'의 의도적인 활용 예시입니다.

---

### switch문과 if-else if문

`switch`문은 `if-else if`문으로 대체할 수 있으며, 그 반대도 가능합니다. 하지만 어떤 상황에서 어떤 문법을 사용하는 것이 더 적절한지 아는 것이 중요합니다.

- **`if-else if`문**: 조건의 범위가 넓거나, 복잡한 논리적 비교(예: `x > 10 && y < 20`)가 필요할 때 유용합니다.
- **`switch`문**: 하나의 변수 값이 여러 개의 특정 값 중 하나와 정확히 일치하는 경우에 더 간결하고 명확합니다. (예: 요일, 메뉴 선택 등)

일반적으로 `switch`문은 엄격한 동등 비교(===)를 수행하며, 암시적 형 변환을 허용하지 않습니다. 따라서 `비교할_값`과 `case 값`의 타입과 값이 모두 일치해야 합니다.

---

### 요약

- `switch`문은 하나의 값을 여러 `case`와 비교하여 일치하는 코드 블록을 실행하는 조건문입니다.
- 각 `case` 블록의 끝에는 `break`를 사용하여 `switch`문을 빠져나와야 합니다. `break`가 없으면 다음 `case`의 코드가 계속 실행됩니다(폴 스루).
- `default`는 어떤 `case`와도 일치하지 않을 때 실행되며, 선택 사항입니다.
- 특정 값에 대한 정확한 일치 비교가 많을 때 `if-else if`문보다 `switch`문이 더 간결하고 가독성이 좋습니다.

### 07. switch문 vs if문

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3420
```

### 07. #Quiz switch문 (15분)

### 문제 1

다음 메뉴 번호 `menuNumber`의 값에 따라 해당하는 음료 이름을 출력하는 `switch`문을 작성하세요.

- 1: '아메리카노'
- 2: '카페 라떼'
- 3: '카푸치노'
- 4: '에스프레소'
- 그 외: '메뉴를 다시 선택해주세요.'

```jsx
let menuNumber = 2;
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    let menuNumber = 2;
    
    switch (menuNumber) {
      case 1:
        console.log("아메리카노");
        break;
      case 2:
        console.log("카페 라떼");
        break;
      case 3:
        console.log("카푸치노");
        break;
      case 4:
        console.log("에스프레소");
        break;
      default:
        console.log("메뉴를 다시 선택해주세요.");
    }
    ```
    
    해설: `switch`문을 사용하여 `menuNumber`의 값과 각 `case`의 값을 비교합니다. 일치하는 `case`의 음료 이름을 출력하고 `break`를 통해 `switch`문을 빠져나옵니다. 어떤 `case`와도 일치하지 않을 경우 `default` 블록의 메시지가 출력됩니다.
    

---

### 문제 2

숫자로 표현된 월 `month` 변수의 값에 따라 계절을 출력하는 `switch`문을 작성하세요. `break`문을 적절히 생략하여 '폴 스루(fall-through)'를 활용해 보세요.

- 12, 1, 2: '겨울'
- 3, 4, 5: '봄'
- 6, 7, 8: '여름'
- 9, 10, 11: '가을'
- 그 외: '유효하지 않은 월입니다.'

```jsx
let month = 4;
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    let month = 4;
    
    switch (month) {
      case 12:
      case 1:
      case 2:
        console.log("겨울");
        break;
      case 3:
      case 4:
      case 5:
        console.log("봄");
        break;
      case 6:
      case 7:
      case 8:
        console.log("여름");
        break;
      case 9:
      case 10:
      case 11:
        console.log("가을");
        break;
      default:
        console.log("유효하지 않은 월입니다.");
    }
    ```
    
    해설: `switch`문의 '폴 스루' 기능을 활용하여 여러 `case`가 동일한 결과를 가질 때 `break`를 생략하고 코드를 간결하게 작성했습니다. 예를 들어, `month`가 4일 경우 `case 4:`에 도달하지만 `break`가 없으므로 `case 5:`까지 실행된 후 `break`를 만나 '봄'을 출력하고 `switch`문을 빠져나옵니다.
    

### 08. #실습 등급별 티켓 가격 (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3421
```

### 09. for 반복문

프로그래밍에서 반복문은 컴퓨터에게 반복적인 작업을 효율적으로 수행하도록 지시하는 강력한 도구입니다. 사람이 반복적인 작업을 할 때 지루함이나 실수를 할 수 있지만, 컴퓨터는 정확하고 빠르게 반복 작업을 처리합니다. 이번 시간에는 자바스크립트에서 가장 많이 사용되는 반복문 중 하나인 `for` 반복문에 대해 알아보겠습니다.

---

### for 반복문

`for` 반복문은 특정 조건이 만족하는 동안 코드 블록을 반복적으로 실행합니다. 특히 반복 횟수가 명확하게 정해져 있을 때 유용하게 사용됩니다.

**기본 구조:**

```jsx
for (초기화; 조건; 증감) {
  *// 조건이 참(true)일 동안 반복 실행될 코드*
}
```

`for`문의 소괄호 `()` 안에는 세 가지 표현식이 세미콜론(;)으로 구분되어 들어갑니다.

1. **`초기화`**: `for` 반복문이 시작될 때 **딱 한 번** 실행됩니다. 주로 반복 횟수를 세는 변수를 선언하고 초기값을 할당하는 데 사용됩니다.
2. **`조건`**: 매 반복이 시작되기 전에 평가됩니다. 이 조건이 `true`이면 코드 블록이 실행되고, `false`이면 반복문이 종료됩니다.
3. **`증감`**: 코드 블록이 한 번 실행된 후 **매번** 실행됩니다. 주로 반복 횟수를 세는 변수의 값을 증가시키거나 감소시키는 데 사용됩니다.

### for 반복문의 동작 순서

1. `초기화`가 실행됩니다. (딱 한 번)
2. `조건`이 평가됩니다.
3. `조건`이 `true`이면 코드 블록이 실행됩니다. `false`이면 반복문이 종료됩니다.
4. 코드 블록 실행 후 `증감`이 실행됩니다.
5. 2단계로 돌아가 `조건`을 다시 평가합니다.

### 예제: 1부터 10까지 출력하기

1부터 10까지의 숫자를 순서대로 출력하는 `for` 반복문을 작성해 봅시다.

```jsx
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

- **`초기화`**: `let i = 1;` (변수 `i`를 1로 초기화)
- **`조건`**: `i <= 10;` (`i`가 10보다 작거나 같으면 `true`)
- **`증감`**: `i++;` (`i`의 값을 1씩 증가)

이 코드를 실행하면 1부터 10까지의 숫자가 한 줄씩 출력됩니다.

### 예제: 1부터 10까지의 합계 계산하기

`for` 반복문을 사용하여 1부터 10까지의 모든 숫자를 더한 합계를 계산해 봅시다.

```jsx
let sum = 0; *// 합계를 저장할 변수*

for (let i = 1; i <= 10; i++) {
  sum = sum + i; *// 또는 sum += i;*
}

console.log(sum); *// 결과: 55*
```

이 예제에서는 `sum`이라는 변수를 0으로 초기화하고, `for` 반복문이 실행될 때마다 `i`의 값을 `sum`에 더해줍니다. 반복문이 모두 끝난 후 `sum`을 출력하면 1부터 10까지의 합계인 55가 출력됩니다.

---

### 요약

- `for` 반복문은 특정 조건이 만족하는 동안 코드 블록을 반복적으로 실행하는 데 사용됩니다.
- `for (초기화; 조건; 증감)` 구조를 가지며, 각 부분은 반복문의 동작을 제어합니다.
- 반복 횟수가 명확하게 정해져 있을 때 `for` 반복문은 코드를 간결하고 효율적으로 작성할 수 있도록 돕습니다.
- `for`문 안에서 선언된 변수(예: `let i = 1;`의 `i`)는 해당 `for`문 안에서만 유효한 지역 변수입니다.

### 10. for 반복문 Tip

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3423
```

### 10. #Quiz for 반복문 (20분)

### 문제 1

`for` 반복문을 사용하여 10부터 1까지의 숫자를 역순으로 출력하세요.

```jsx
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    for (let i = 10; i >= 1; i--) {
      console.log(i);
    }
    ```
    
    해설: `초기화` 부분에서 `i`를 10으로 설정하고, `조건` 부분에서 `i`가 1보다 크거나 같을 때까지 반복하도록 합니다. `증감` 부분에서는 `i--`를 사용하여 `i`의 값을 1씩 감소시켜 역순으로 숫자를 출력합니다.
    

---

### 문제 2

`for` 반복문을 사용하여 구구단 8단을 출력하세요. 출력 형식은 "8 x 1 = 8", "8 x 2 = 16"과 같이 나타나야 합니다.

```jsx
*// 여기에 코드를 작성하세요.*
```

---

- 정답 및 해설
    
    ```jsx
    let dan = 8;
    for (let i = 1; i <= 9; i++) {
      console.log(`${dan} x ${i} = ${dan * i}`);
    }
    ```
    
    해설: `dan` 변수에 8을 할당하여 구구단의 단수를 정합니다. `for` 반복문은 `i`를 1부터 9까지 1씩 증가시키면서 `dan`과 `i`를 곱한 결과를 템플릿 리터럴을 사용하여 원하는 형식으로 출력합니다.
    

### 11. #실습 for 반복문 실습 I

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3424
```

### 12. #실습 for 반복문 실습 II

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3425
```

### 13. while 반복문

지난 시간에 `for` 반복문을 통해 정해진 횟수만큼 코드를 반복 실행하는 방법을 배웠습니다. `for`문은 반복 횟수가 명확할 때 매우 유용하지만, 때로는 반복 횟수를 미리 알 수 없는 상황에서 특정 조건이 만족될 때까지 반복해야 할 필요가 있습니다. 이럴 때 사용하는 것이 바로 `while` 반복문입니다.

---

### while 반복문

`while` 반복문은 특정 **조건이 참(true)인 동안** 코드 블록을 반복적으로 실행합니다. `for`문과는 달리 초기화, 조건, 증감 부분이 한 줄에 명시되지 않고, 조건 부분만 소괄호 `()` 안에 들어갑니다.

**기본 구조:**

```jsx
while (조건) {
  *// 조건이 참(true)일 동안 반복 실행될 코드*
}
```

- **`while (조건)`**: 괄호 안에 반복을 계속할지 여부를 결정하는 조건을 넣습니다. 이 조건이 `true`이면 중괄호 `{}` 안의 코드가 실행되고, `false`이면 반복문이 종료됩니다.
- **주의**: `while`문 안에서 조건이 언젠가 `false`가 되도록 하는 코드를 반드시 포함해야 합니다. 그렇지 않으면 무한 루프(infinite loop)에 빠져 프로그램이 멈출 수 있습니다.

### while 반복문의 동작 순서

1. `조건`이 평가됩니다.
2. `조건`이 `true`이면 코드 블록이 실행됩니다. `false`이면 반복문이 종료됩니다.
3. 코드 블록 실행 후 다시 1단계로 돌아가 `조건`을 평가합니다.

### 예제: 카운트다운

5부터 1까지 카운트다운을 하고 "발사!"를 출력하는 `while` 반복문을 작성해 봅시다.

```jsx
let count = 5;

while (count > 0) {
  console.log(count);
  count--; *// count 값을 1씩 감소*
}

console.log('발사!');
```

- `count` 변수를 5로 초기화합니다.
- `while (count > 0)` 조건은 `count`가 0보다 큰 동안 `true`입니다.
- 반복문 안에서 `count` 값을 출력하고 `count--`를 통해 1씩 감소시킵니다.
- `count`가 0이 되는 순간 조건이 `false`가 되어 반복문이 종료되고, "발사!"가 출력됩니다.

### 예제: 랜덤 숫자 맞추기 게임

1부터 100 사이의 랜덤 숫자를 맞출 때까지 반복하는 간단한 게임을 `while`문으로 구현해 봅시다. 이 경우 몇 번을 반복해야 정답을 맞출지 미리 알 수 없습니다.

```jsx
let targetNumber = Math.floor(Math.random() * 100) + 1; *// 1~100 사이의 랜덤 숫자*
let guess = 0; *// 사용자의 추측 값*

console.log('1부터 100 사이의 숫자를 맞춰보세요!');

while (guess !== targetNumber) {
  *// 실제 게임에서는 사용자로부터 입력을 받지만, 여기서는 임의의 값으로 대체합니다.*
  guess = Math.floor(Math.random() * 100) + 1; 
  console.log(`추측: ${guess}`);

  if (guess < targetNumber) {
    console.log('더 큰 숫자입니다!');
  } else if (guess > targetNumber) {
    console.log('더 작은 숫자입니다!');
  }
}

console.log(`정답! ${targetNumber}을 맞췄습니다!`);
```

이 예제에서는 `guess`가 `targetNumber`와 같아질 때까지 `while` 반복문이 계속 실행됩니다. 반복 횟수를 미리 알 수 없기 때문에 `while`문이 `for`문보다 더 적합합니다.

---

### for문과 while문 비교

- **`for`문**: 반복 횟수가 명확하게 정해져 있을 때 (예: 10번 반복, 배열의 모든 요소 순회) 주로 사용됩니다. 초기화, 조건, 증감 부분이 한 줄에 있어 코드가 간결합니다.
- **`while`문**: 반복 횟수를 미리 알 수 없고, 특정 조건이 만족될 때까지 반복해야 할 때 (예: 사용자 입력 대기, 파일 끝까지 읽기) 주로 사용됩니다. 조건이 `false`가 되도록 하는 코드를 반드시 포함해야 합니다.

두 반복문은 서로 대체하여 사용할 수 있지만, 상황에 따라 더 적합한 문법을 선택하는 것이 좋습니다.

---

### 요약

- `while` 반복문은 특정 조건이 참(true)인 동안 코드 블록을 반복적으로 실행합니다.
- `for`문과 달리 초기화, 증감 부분이 명시적이지 않으므로, 무한 루프에 빠지지 않도록 조건 변화를 코드 블록 내에서 처리해야 합니다.
- 반복 횟수를 미리 알 수 없는 상황에서 특정 조건이 만족될 때까지 반복해야 할 때 `while`문이 유용합니다.

### 13. #Quiz while 반복문 (20분)

## 문제 1

`while` 반복문을 사용하여 1부터 10까지의 숫자 중 홀수만 출력하세요.

```jsx
let num = 1;
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    let num = 1;
    
    while (num <= 10) {
      if (num % 2 !== 0) {
        *// num이 홀수인지 확인*
        console.log(num);
      }
      num++; *// num 값을 1씩 증가시켜 무한 루프 방지*
    }
    ```
    
    해설: `num` 변수를 1로 초기화하고, `num`이 10보다 작거나 같은 동안 반복합니다. 반복문 안에서 `if`문을 사용하여 `num`이 홀수일 경우에만 출력하고, `num++`를 통해 `num` 값을 증가시켜 반복문이 종료될 수 있도록 합니다.
    

### 14. #실습 while 반복문 실습 I

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3427
```

### 15. #실습 while 반복문 실습 II

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3428
```

### 16. break와 continue

반복문은 코드를 효율적으로 반복 실행하는 강력한 도구입니다. 하지만 때로는 반복문이 특정 조건에 도달했을 때 즉시 종료하거나, 현재 반복만 건너뛰고 다음 반복으로 넘어가야 할 필요가 있습니다. 이럴 때 사용하는 것이 바로 `break`와 `continue` 키워드입니다.

---

### break

`break` 키워드는 반복문(for, while)의 실행을 즉시 중단하고, 반복문 다음의 코드로 제어를 옮깁니다. `switch`문에서 `case` 블록을 빠져나올 때 사용했던 `break`와 동일한 역할을 합니다.

**예제: 특정 숫자 찾기**

1부터 10까지 숫자를 세다가 숫자 7을 만나면 반복을 중단하고 "7을 찾았습니다!"라는 메시지를 출력하는 `for` 반복문을 작성해 봅시다.

```jsx
for (let i = 1; i <= 10; i++) {
  console.log(i);
  if (i === 7) {
    console.log('7을 찾았습니다! 반복을 중단합니다.');
    break; *// i가 7이 되면 반복문 즉시 종료*
  }
}
console.log('반복문 종료.');
```

위 코드에서 `i`가 7이 되는 순간 `if (i === 7)` 조건이 참이 되어 `break`가 실행됩니다. `break`는 `for` 반복문을 즉시 종료시키므로, 7 이후의 숫자(8, 9, 10)는 출력되지 않습니다.

---

### continue

`continue` 키워드는 현재 실행 중인 반복(iteration)의 나머지 부분을 건너뛰고, 반복문의 다음 반복으로 즉시 넘어갑니다. 즉, `continue` 아래에 있는 코드들은 실행되지 않고, `for`문에서는 `증감` 부분으로, `while`문에서는 `조건` 부분으로 바로 이동합니다.

**예제: 짝수 건너뛰고 홀수만 출력하기**

1부터 10까지의 숫자 중에서 짝수는 건너뛰고 홀수만 출력하는 `for` 반복문을 작성해 봅시다.

```jsx
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) { *// i가 짝수이면*
    continue; *// 현재 반복을 건너뛰고 다음 반복으로*
  }
  console.log(i); *// 홀수만 출력됩니다.*
}
```

위 코드에서 `i`가 짝수일 때 `if (i % 2 === 0)` 조건이 참이 되어 `continue`가 실행됩니다. `continue`는 `console.log(i)` 부분을 건너뛰고 `i++` (증감 부분)으로 바로 이동하여 다음 반복을 시작합니다. 결과적으로 홀수만 출력됩니다.

### while문에서 continue 사용 시 주의사항

`while`문에서 `continue`를 사용할 때는 `for`문과 달리 `증감` 부분이 명시적으로 존재하지 않으므로, 무한 루프에 빠지지 않도록 `continue`가 실행되기 전에 반복 제어 변수를 직접 변경(증감)해 주어야 합니다.

```jsx
let j = 1;
while (j <= 10) {
  if (j % 2 === 0) { *// j가 짝수이면*
    j++; *// 중요: continue 전에 j를 증가시켜야 무한 루프를 방지합니다.*
    continue; *// 현재 반복을 건너뛰고 다음 반복으로*
  }
  console.log(j); *// 홀수만 출력됩니다.*
  j++; *// 홀수인 경우에도 j를 증가시킵니다.*
}
```

만약 `j++`가 `continue` 아래에만 있다면, `j`가 짝수일 때 `j`는 증가하지 않고 `continue`가 계속 실행되어 무한 루프에 빠지게 됩니다.

---

### 요약

- `break`는 반복문의 실행을 즉시 중단하고 반복문 밖으로 나갑니다.
- `continue`는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. `continue` 아래의 코드는 실행되지 않습니다.
- `while`문에서 `continue`를 사용할 때는 무한 루프를 방지하기 위해 반복 제어 변수를 `continue` 이전에 반드시 증감시켜야 합니다.
- `break`와 `continue`를 적절히 활용하면 반복문의 흐름을 더욱 세밀하게 제어할 수 있습니다.

### 16. #Quiz break와 continue

### 문제 1

`for` 반복문을 사용하여 1부터 100까지의 숫자 중, 10의 배수를 찾다가 처음으로 30을 넘는 10의 배수를 찾으면 반복을 중단하고 해당 숫자를 출력하세요.

```jsx
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    for (let i = 1; i <= 100; i++) {
      if (i % 10 === 0) {
        *// 10의 배수인지 확인*
        if (i > 30) {
          *// 30을 넘는 10의 배수인지 확인*
          console.log(`처음으로 30을 넘는 10의 배수: ${i}`);
          break; *// 조건에 맞는 숫자를 찾았으므로 반복 중단*
        }
      }
    }
    ```
    
    해설: `for` 반복문으로 1부터 100까지 숫자를 순회합니다. `if (i % 10 === 0)`으로 10의 배수를 확인하고, 그 중에서 `if (i > 30)`으로 30을 넘는 숫자를 찾습니다. 조건을 만족하면 해당 숫자를 출력하고 `break`를 사용하여 반복문을 즉시 종료합니다.
    

---

## 문제 2

`for` 반복문을 사용하여 1부터 20까지의 숫자 중, 3의 배수를 제외하고 나머지 숫자만 출력하세요.

```jsx
*// 여기에 코드를 작성하세요.*
```

- 정답 및 해설
    
    ```jsx
    for (let i = 1; i <= 20; i++) {
      if (i % 3 === 0) {
        *// 3의 배수이면*
        continue; *// 현재 반복을 건너뛰고 다음 반복으로*
      }
      console.log(i); *// 3의 배수가 아닌 숫자만 출력*
    }
    ```
    
    해설: `for` 반복문으로 1부터 20까지 숫자를 순회합니다. `if (i % 3 === 0)`으로 3의 배수인지 확인하고, 3의 배수일 경우 `continue`를 사용하여 `console.log(i)` 부분을 건너뛰고 다음 반복으로 넘어갑니다. 결과적으로 3의 배수를 제외한 나머지 숫자만 출력됩니다.
    

### 17. break와 continue 퀴즈 (5분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3430
```

### 18. #실습 구구단 만들기 (10분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3431
```

### 19. #실습 피보나치 수열 (15분)

```jsx
https://www.codeit.kr/topics/core-concept-of-javascript-programming/lessons/3432
```