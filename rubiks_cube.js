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
        this.materials = {
            inputU: [cube.F[0], cube.L[0], cube.B[0], cube.R[0]],
            inputD: [cube.F[2], cube.R[2], cube.B[2], cube.L[2]],
            inputL: [cube.F.map(e=>e[0]), cube.D.map(e=>e[0]), cube.B.map(e=>e[2]), cube.U.map(e=>e[0])],
            inputR: [cube.F.map(e=>e[2]), cube.U.map(e=>e[2]), cube.B.map(e=>e[0]), cube.D.map(e=>e[2])],
            inputF: [cube.U[2], cube.R.map(e=>e[0]), cube.D[0], cube.L.map(e=>e[2])],
            inputB: [cube.U[0], cube.L.map(e=>e[0]), cube.D[2], cube.R.map(e=>e[2])]
        };
        this.wordData = wordData;
        this.plane = planeCubeData;
        this.inputArr = [];
        this.currArr = [];
        this.way;
    }
    main(value) {
        this.tokenize(value);
        const quit = this.plane.existsQ();
        this.inputArr.forEach(v => {
            this.setCurrArr(v);
            this.decideWay(v);
            this.plane.processArr.call(this);
            this.fixCube(v);
            console.log(JSON.parse(JSON.stringify(cube)));
        });
    }
    // 2단계 tokenize + 숫자value 변경 함수
    tokenize(value) {
        this.plane.tokenize.call(this, value);
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
    setCurrArr(v) {
        if(v[0] === 'U') this.currArr = this.materials.inputU;
        else if(v[0] === 'D') this.currArr = this.materials.inputD;
        else if(v[0] === 'L') this.currArr = this.materials.inputL;
        else if(v[0] === 'R') this.currArr = this.materials.inputR;
        else if(v[0] === 'F') this.currArr = this.materials.inputF;
        else if(v[0] === 'B') this.currArr = this.materials.inputB;
    }
    decideWay(v) {
        if(v.indexOf('\'') === -1) this.way = 'R';
        else this.way = 'L';
    }
    fixCube(v) {
        const cube = this.cube;
        if(v[0] === 'U') [cube.F[0], cube.L[0], cube.B[0], cube.R[0]] = this.currArr;
        else if(v[0] === 'D') [cube.F[2], cube.R[2], cube.B[2], cube.L[2]] = this.currArr;
        else if(v[0] === 'L') this.fixCubeOfL(cube);
        else if(v[0] === 'R') this.fixCubeOfR(cube);
        else if(v[0] === 'F') this.fixCubeOfF(cube);
        else if(v[0] === 'B') this.fixCubeOfB(cube);
    }
    fixCubeOfL(cube) {
        cube.F.forEach((e, i) => e[0] = this.currArr[0][i]);
        cube.D.forEach((e, i) => e[0] = this.currArr[1][i]);
        cube.B.forEach((e, i) => e[2] = this.currArr[2][i]);
        cube.U.forEach((e, i) => e[0] = this.currArr[3][i]);
    }
    fixCubeOfR(cube) {
        cube.F.forEach((e, i) => e[2] = this.currArr[0][i]);
        cube.U.forEach((e, i) => e[2] = this.currArr[1][i]);
        cube.B.forEach((e, i) => e[0] = this.currArr[2][i]);
        cube.D.forEach((e, i) => e[2] = this.currArr[3][i]);
    }
    fixCubeOfF(cube) {
        cube.U[2] = this.currArr[0];
        cube.R.forEach((e, i) => e[0] = this.currArr[1][i]);
        cube.D[0] = this.currArr[2];
        cube.L.forEach((e, i) => e[2] = this.currArr[3][i]);
    }
    fixCubeOfB(cube) {
        cube.U[0] = this.currArr[0];
        cube.L.forEach((e, i) => e[0] = this.currArr[1][i]);
        cube.D[2] = this.currArr[2];
        cube.R.forEach((e, i) => e[2] = this.currArr[3][i]);
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
        this.step3Text.value = '';
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
