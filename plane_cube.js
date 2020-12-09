// ----수정할 것----
// this.inputArr를 tokenize의 반환값으로 만들어서 main함수 내에서만 사용하도록.

class PlaneCubeData {
    constructor(wordData) {
        this.wordData = wordData;
        this.dataArr = [['R','R','W'], ['G','C','W'], ['G','B','B']];
        this.inputArr = [];  //사용자가 입력한 조작법
        this.currArr = [];   //조작할 1차원 배열
        this.way;
        this.allResults = [];
    }
    // view로부터 배열을 전달받아 순서대로 함수 실행, 데이터 처리
    main(value) {
        this.tokenize(value);
        this.inputArr.forEach(v => {
            this.pickArr(v);
            this.decideWay(v);
            this.processArr();
            this.fixDataArr(v);
            this.allResults.push(this.dataArr);
        });
        const data = {input: this.inputArr, result: this.allResults};
        return data;
    }
    // 입력을 받아 의미 단위로 쪼개 inputArr 만드는 함수
    tokenize(value) {
        const valueArr = value.split('');
        const idx = [];
        valueArr.forEach((el, i) => {if(el === '\'') idx.push(i)});
        if(idx.length > 0) {
            idx.forEach(idx => valueArr[idx - 1] += '\'');
            this.inputArr = valueArr.filter(el => el !== '\'');
        }
        else this.inputArr = valueArr;
    }
    // 사용자의 입력에 따라 처리할 배열 선택
    pickArr(v) {
        const data = this.dataArr;
        if(v === 'U'||v === 'U\'') this.currArr = data[0];
        else if(v === 'B'||v ==='B\'') this.currArr = data[2];
        else if(v === 'L'||v ==='L\'') this.currArr = data.map(arr => arr[0]);
        else this.currArr = data.map(arr => arr[2]);
    }
    // 조작에 따라 방향 정하기 (1,R), (1,L)
    decideWay(v) {
        if(v ==='U\''||v ==='B'||v ==='L'||v ==='R\'') this.way = 'R';
        else this.way = 'L';
    }
    // step-1에 있는 함수 사용 ex: [R, R, W], 1, R
    processArr() {
        //call메서드 사용해야할 수 도
        const result = this.wordData.getResultArr(this.currArr, 1, this.way); 
        this.currArr = result;
    }
    // 처리된 배열을 dataArr에 대입해서 데이터 변경
    fixDataArr(v) {
        const result = this.currArr;
        if(v === 'U'||v === 'U\'') this.dataArr[0] = result;
        else if(v === 'B'||v ==='B\'') this.dataArr[2] = result;
        else if(v === 'L'||v ==='L\'') this.dataArr.forEach((arr, i) => arr[0] = result[i]);
        else this.dataArr.forEach((arr, i) => arr[2] = result[i]);
    }
    // 화면에 출력
}

// step-1의 view클래스와 비슷한 함수 재활용하기
class ViewPlaneCube {
    constructor(reference, planeCubeData) {
        this.step2Text = reference.step2Text;
        this.step2Btn = reference.step2Btn;
        this.step2Result = reference.step2Result;
        this.planeCubeData = planeCubeData;
        this.inputArr = [];
        this.allResults = [];
    }
    // submit버튼 클릭 이벤트
    setEvent() {
        this.step2Btn.addEventListener("click", this.handleData.bind(this) );
    }
    // value를 배열로 만들어 data로 보내기
    handleData(e) {
        e.preventDefault();
        const value = this.step2Text.value;
        const data = this.planeCubeData.main(value);
        this.inputArr = data.input;
        this.allResults = data.result;
        this.step2Text.value = '';
        this.viewResult();
    }
    // 결과를 화면에 출력
    viewResult() {

    }
}

// -------------● 실행 ●-------------
const planeCubeData = new PlaneCubeData(wordData);
const viewPlaneCube = new ViewPlaneCube(reference, planeCubeData);
viewPlaneCube.setEvent();