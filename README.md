# 루빅스 큐브 구현하기
<br>

# 1. 단어 밀어내기 구현
## 동작과정
 1. submit 버튼 클릭이벤트로 `WordData` 클래스의 main함수를 실행하고, 입력값인 value를 매개변수로 넘겨준다.
 2. value값을 배열로 만들어 의미 단위별로 `wordArr`, `num`, `way`속성에 값을 저장
 3. 방향이 소문자면 대문자로 바꿔주고, 음수는 절댓값으로 바꾸고, 방향을 반대로 바꿔줌
 4. 숫자가 문자열의 길이보다 같거나 클 경우, 나눈 나머지로 이동할 거리 `distance`속성에 저장. 작을 경우에는 그대로 `distance`에 저장.
 5. `R`일 때 단어 배열을 `distance`번 pop, unshift 반복하고 반환.
 6. `L`일 때 단어 배열을 `distance`번 shift, push 반복하고 반환.
 7. 위의 결과를 `join('')`해서 문자열을 view 클래스에 반환
 8. `ViewWord` 클래스에서 반환받은 문자열을 `result`속성에 저장
 9. 요소를 생성하고 `result`값을 화면에 출력.
   
<br>

## 실행결과
![step1](https://i.postimg.cc/636jv4vY/mastertest-step1.png)

<br>
<br>

# 2. 평면 큐브 구현하기
## 동작과정
✱ View 클래스

 1. submit 버튼 클릭이벤트로 value값을 먼저 검사해서 Q만 입력됐을 때는 종료 요소 출력하고, 데이터를 초기화한다.
 2. Q만 입력되지 않았다면, `PlaneCubeData` 클래스의 main 함수를 실행하고, 입력값인 value를 매개변수로 넘겨준다.
 3. main 실행 전 초기 데이터를 복사해서 `init` 변수에 저장한다.

✱ Data 클래스

 4. 입력값 value를 의미 단위로 쪼개 배열로 만든다.
    - split('')으로 배열로 만든 다음, `'` 원소의 인덱스를 `idx`배열에 저장
    - `idx`배열을 돌면서 전 요소`[idx - 1]`에 `'`를 더해줌
    - filter로 `'` 원소를 제외하고 배열로 반환해서 `inputArr`속성에 저장
 5. 입력값에 `Q`가 존재하는지 확인하고 있으면, Q부터 뒤 요소들 제거하고, 존재여부에 따른 boolean값 반환해서 `quit` 변수에 저장한다. (이후에 view 클래스로 넘겨줌)
 6. 동작해야할 조작법이 들어있는 배열 `inputArr`를 돌면서 함수들을 실행한다.
 7. 조작법에 따라 처리할 배열을 선택해서 `currArr`속성에 저장한다.
 8. 조작법에 따라 방향을 정해 `way`속성에 저장한다.
 9. `step-1`에 있는 함수에 `currArr, 1, way`를 매개변수로 넘겨 밀어내기 구현하고, 결과값을 저장한다.
 10. 결과값을 `dataArr`에 반영하고, 변경된 `dataArr`를 복사해서 `allResults`배열에 push한다.
 11. `data`객체를 만들어 조작법 배열`inputArr`, 순서대로 실행한 결과값 배열`allResults`, Q 존재여부`q`를 저장해 `ViewPlaneCube` 클래스에 반환한다.

✱ View 클래스

 12. `main`함수 실행 전 초기값 `init`, `main`함수 실행 후 데이터 `data`를 화면 출력 함수에 매개변수로 넘겨주고 실행한다.
 13. `init` 초기상태를 출력하고, `data`의 `input`로 입력한 조작법을 출력한다.
 14. `data`의 `Result`로 결과값을 출력한다.
 15. `Q`가 입력값 마지막에 있다면, 종료 요소를 출력하고, 데이터를 초기화한다.

<br>

## 실행결과
![step2](https://i.postimg.cc/wvB9qV9V/mastertest-step2.png)

<br>
<br>

# 3. 루빅스 큐브 구현하기
## 동작과정
✱ View 클래스

 1. submit 버튼 클릭이벤트로 value값을 먼저 검사해서 `Q`만 입력됐을 때는 종료 요소 출력하고 `cube`데이터를 초기화한다. 그리고 조작갯수 `counting`을 출력하고, 초기화한다.
 2. Q만 입력되지 않았다면, `RubiksCubeData` 클래스의 main 함수를 실행하고, 입력값인 value를 매개변수로 넘겨준다.
 3. main 실행 전 초기 데이터를 복사해서 `init` 변수에 저장한다.
   
✱ Data 클래스

 4. 입력값 value를 의미 단위로 쪼개 배열로 만들어 `inputArr`속성에 저장한다.
    - `step-2`의 tokenize 함수를 사용해 `'`를 문자에 붙여줌
    - 숫자가 있으면 (숫자 - 1)만큼 앞의 문자를 반복해 더해줌
 5. 입력값에 `Q`가 존재하는지 확인하고 있으면, Q부터 뒤 요소들 제거하고, 존재여부에 따른 boolean값 반환해서 `quit` 변수에 저장한다. (이후에 view 클래스로 넘겨줌)
 6. 동작해야할 조작법이 들어있는 배열 `inputArr`를 돌면서 실행한다.
 7. 조작갯수 카운팅하는 속성 `counting`에 1을 더해준다.
 8. 조작을 위해 사용할 배열들을 업데이트해준다.
 9. 조작법에 따라 처리할 인접 4면의 배열을 선택해서 `currArr`속성에 저장한다.
 10. 조작법에 따라 방향을 정해 `way`속성에 저장한다.
 11. `step-2`에 있는 함수를 call로 this를 설정해서 실행한다. (밀어내기 구현하고, 결과값은 속성에 저장됨) 
 12. 처리된 데이터를 cube 객체에 반영한다. 조작법에 따라 변경되는 데이터 배열이 다르기 때문에 함수를 나눠 만들어 값을 새로 할당했다. 이로써 인접해 있는 4면의 데이터 변경은 완료됐다.
 13. 그 다음으로는, 돌아가는 면(U조작이면 U면)을 시계 / 반시계 회전을 해준다.
 14. 시계방향으로 돌릴 때는 R로(배열을 오른쪽으로 밀도록) `currArr`의 배열 순서를 정해놓았기 때문에 `way ==='R'`이면 시계방향회전, 아니면 반시계방향으로 회전한다. 인덱스를 직접 설정해 값을 새로 할당하도록 했다.
 15. 데이터조작이 완료된 `cube`를 깊은 복사를 해서 `allResults`배열에 push한다.
 16. `data`객체를 만들어 조작법 배열`inputArr`, 순서대로 실행한 결과값 배열`allResults`, Q 존재여부`q`를 저장해 `ViewPlaneCube` 클래스에 반환한다. 

✱ View 클래스

 12. `main`함수 실행 전 초기값 `init`, `main`함수 실행 후 데이터 `data`를 화면 출력 함수에 매개변수로 넘겨주고 실행한다.
 13. `cube`객체의 면 속성들(3x3 배열)을 템플릿으로 만들어준다. 이 함수의 반환값을 초기상태와 결과값 출력하는 함수에서 사용한다.
 14. `innerHTML`로 요소를 생성하면서 `init` 초기상태를 출력한다.
 15. `innerHTML`로 요소를 생성하면서 `data`의 `Result`로 결과값을 출력한다.
 16. `Q`가 입력값 마지막에 있다면, 종료를 알리는 요소를 출력하고, `cube`데이터를 초기화한다. 그리고 조작갯수 `counting`을 출력하고, 초기화한다.

<br>

## 추가기능
✱ 경과시간
 1. data 클래스에 `this.boolOfTime` 속성을 true로 설정해 처음에 main 함수가 실행될 때 시간값이 저장되도록 한다.
 2. main 함수가 실행되면 `saveTime` 함수가 실행된다. 이 함수에서 현재 시간을 `this.startingTime` 속성에 저장하고, `this.boolOfTime` 속성을 false로 설정해 다음 main 실행 때는 시간 값을 저장하지 않도록한다.
 3. view 클래스에서 `quit`함수가 실행될 때 현재 시간을 구하고, data클래스의 `startingTime` 속성을 가져와 차이를 구한다.
 4. 그 차이를 `getTime` 함수에서 계산해서 경과 시간을 시간, 분, 초 단위로 반환한다.
 5. 경과시간 데이터를 `this.time` 속성에 저장하고 `quit` 함수 실행 중 경과 시간을 출력한다.

✱ 랜덤으로 섞기
 1. `RandomCube`클래스로 객체 생성하고 `setEvent`함수 호출하면서 매개변수로 몇 번 반복해서 랜덤으로 조작할지 설정한다. (8로 전달하면 8개의 랜덤 조작법을 뽑아서 실행)
 2. random 버튼을 누르면 이벤트가 발생하면서 함수 실행
 3. 매개변수로 전달한 개수(8)만큼 인덱스를 랜덤으로 뽑고, 해당 인덱스의 조작법을 `this.string`에 더한다.
 4. `rubiksCubeData.main()` 함수에 `this.string`을 넘겨주어 실행한다.
 5. main 함수에서 처리한 데이터를 객체로 반환하는데, `result` 속성에는 단계별로 실행한 `cube` 결과값들이 들어있다. 최종 결과값만 출력하면 되니까 `result` 속성값의 가장 마지막 원소를 변수 `cube`에 저장한다.
 6. `viewRubiksCube.getSideTemplate()` 함수를 사용해서 `cube`의 면들을 템플릿으로 받고, 화면에 출력한다.
 7. 마지막으로 `this.string`값과 `this.rubiksCubeData.counting`(조작갯수)를 초기화한다.

<br>

## 실행결과
![step3_1](https://i.postimg.cc/nr9qJk6j/mastertest-step3-1.png)
<br>...중간 과정 생략 <br>

![step3_2](https://i.postimg.cc/rmmShcj9/mastertest-step3-2.png)

<br>
랜덤으로 큐브 섞어서 출력하기

![random_cube](https://i.postimg.cc/wvGDZPbY/mastertest-step3-3.png)
