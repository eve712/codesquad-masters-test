// ---------------------● Rubiks Cube Data ●-----------------------
class RubiksCubeData {
    constructor() {
        sideU = new Array(3).fill(new Array(3).fill('B'));
        sideD = new Array(3).fill(new Array(3).fill('R'));
        sideL = new Array(3).fill(new Array(3).fill('W'));
        sideR = new Array(3).fill(new Array(3).fill('G'));
        sideF = new Array(3).fill(new Array(3).fill('O'));
        sideB = new Array(3).fill(new Array(3).fill('Y'));
    }
    main() {

    }
    // 2단계 tokenize + 숫자value 변경 함수
    getInputArr() {

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
    constructor(reference) {
        this.step3Text = reference.step3Text;
        this.step3Btn = reference.step3Btn;
        this.step3Result = reference.step3Result;
    }
    setEvent() {
        this.step2Btn.addEventListener("click", this.handleData.bind(this));
    }
    handleData() {
        e.preventDefault();
        const value = this.step2Text.value;
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
const rubiksCubeData = new RubiksCubeData();
const viewRubiksCube = new ViewRubiksCube();
viewRubiksCube.setEvent();
