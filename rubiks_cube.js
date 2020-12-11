// ---------------------● Rubiks Cube Data ●-----------------------
class RubiksCubeData {
    constructor(planeCubeData) {
        this.sideU = new Array(3).fill(new Array(3).fill('B'));
        this.sideD = new Array(3).fill(new Array(3).fill('R'));
        this.sideL = new Array(3).fill(new Array(3).fill('W'));
        this.sideR = new Array(3).fill(new Array(3).fill('G'));
        this.sideF = new Array(3).fill(new Array(3).fill('O'));
        this.sideB = new Array(3).fill(new Array(3).fill('Y'));
        this.planeCubeData = planeCubeData;
        this.inputArr = [];
    }
    main(value) {
        this.tokenize(value);
    }
    // 2단계 tokenize + 숫자value 변경 함수
    tokenize(value) {
        this.planeCubeData.tokenize.call(this, value);
        const idx = [];
        this.inputArr.forEach((el, i) => {if(this.isNumber(el)) idx.push(i); });
        if(idx.length > 0) {
            idx.forEach(idx => this.inputArr[idx - 1] += this.inputArr[idx])
            this.inputArr = this.inputArr.filter(el => !this.isNumber(el));
        }
    }
    isNumber(el) {
        const bool = typeof parseInt(el) === 'number' && isFinite(parseInt(el));
        return bool;
    }
    pickSideArr() {

    }
    decideWay() {

    }
    processArr() {

    }
    fixSideArr() {

    }
 } 
// ---------------------● View Rubiks Cube ●-----------------------
class ViewRubiksCube {
    constructor(reference, rubiksCubeData) {
        this.step3Text = reference.step3Text;
        this.step3Btn = reference.step3Btn;
        this.step3Result = reference.step3Result;
        this.rubiksCubeData = rubiksCubeData;
    }
    setEvent() {
        this.step3Btn.addEventListener("click", this.handleData.bind(this));
    }
    handleData(e) {
        e.preventDefault();
        const value = this.step3Text.value;
        this.rubiksCubeData.main(value);
        this.viewAll();
    }
    //
    viewAll() {

    }
    viewDefault() {

    }
    viewResult() {

    }
    quit() {

    }
}
// -------------● 실행 ●-------------
const rubiksCubeData = new RubiksCubeData(planeCubeData);
const viewRubiksCube = new ViewRubiksCube(reference, rubiksCubeData);
viewRubiksCube.setEvent();
