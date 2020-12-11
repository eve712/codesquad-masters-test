// ---------------------● Rubiks Cube Data ●-----------------------
const cube = {
    U: new Array(3).fill(new Array(3).fill('B')),
    D: new Array(3).fill(new Array(3).fill('R')),
    L: new Array(3).fill(new Array(3).fill('W')),
    R: new Array(3).fill(new Array(3).fill('G')),
    F: new Array(3).fill(new Array(3).fill('O')),
    B: new Array(3).fill(new Array(3).fill('Y'))
}
class RubiksCubeData {
    constructor(cube, planeCubeData) {
        this.cube = cube;
        this.planeCubeData = planeCubeData;
        this.inputArr = [];
        this.currArr = [];
    }
    main(value) {
        this.tokenize(value);
        const quit = this.planeCubeData.existsQ();
        this.inputArr.forEach(v => {
            this.pickSideArr(v);
        });
    }
    // 2단계 tokenize + 숫자value 변경 함수
    tokenize(value) {
        this.planeCubeData.tokenize.call(this, value);
        const idx = [];
        this.inputArr.forEach((el, i) => { if(this.isNumber(el)) idx.push(i); });
        if(idx.length > 0) {
            idx.forEach(idx => this.inputArr[idx - 1] += this.inputArr[idx])
            this.inputArr = this.inputArr.filter(el => !this.isNumber(el));
        }
    }
    isNumber(el) {
        const bool = typeof parseInt(el) === 'number' && isFinite(parseInt(el));
        return bool;
    }
    pickSideArr(v) {
        
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
const rubiksCubeData = new RubiksCubeData(cube, planeCubeData);
const viewRubiksCube = new ViewRubiksCube(reference, rubiksCubeData);
viewRubiksCube.setEvent();
