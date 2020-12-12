// ---------------------● Rubiks Cube Data ●-----------------------
const cube = {
    U: [['B','B','B'], ['B','B','B'], ['B','B','B']],
    D: [['R','R','R'], ['R','R','R'], ['R','R','R']],
    L: [['W','W','W'], ['W','W','W'], ['W','W','W']],
    R: [['G','G','G'], ['G','G','G'], ['G','G','G']],
    F: [['O','O','O'], ['O','O','O'], ['O','O','O']],
    B: [['Y','Y','Y'], ['Y','Y','Y'], ['Y','Y','Y']]
}
class RubiksCubeData {
    constructor(cube, planeCubeData) {
        this.cube = cube;
        this.materials = {
            inputU: [cube.F[0], cube.L[0], cube.B[0], cube.R[0]],
            inputD: [cube.F[2], cube.R[2], cube.B[2], cube.L[2]],
            inputL: [],
            inputR: [],
            inputF: [],
            inputB: []
        };
        this.wordData = wordData;
        this.plane = planeCubeData;
        this.inputArr = [];
        this.currArr = [];
        this.way;
    }
    main(value) {
        let allResult = [];
        this.tokenize(value);
        const quit = this.plane.existsQ();
        this.inputArr.forEach(v => {
            this.setMaterials();
            this.setCurrArr(v);
            this.decideWay(v);
            this.plane.processArr.call(this);
            this.fixCube(v);
            if(this.way === 'R') {this.rotateQuarter(v, this.rotateClockwise);}
            else {this.rotateQuarter(v, this.rotateCounter);}
            allResult.push(JSON.parse(JSON.stringify(cube)));
        });
        const data = {input: this.inputArr, result: allResults, q: quit};
        return data;
    }
    // 2단계 tokenize + 숫자는 조작법 더 써서 inputArr에 조작법 저장
    tokenize(value) {
        this.plane.tokenize.call(this, value);
        const idx = [];
        this.inputArr.forEach((el, i) => { if(this.isNumber(el)) idx.push(i); });
        if(idx.length > 0) {
            idx.forEach(i => this.spreadNumber(i));
            this.inputArr = this.inputArr.flat();
        }
    }
    // 숫자를 제거하고 숫자 - 1만큼 앞문자 생성
    spreadNumber(idx) {
        let n = this.inputArr[idx];
        this.inputArr.splice(idx, 1, []);
        for(let i = 0; i < n - 1; i++) {
            this.inputArr[idx].push(this.inputArr[idx - 1]);
        }
    }
    isNumber(el) {
        const bool = typeof parseInt(el) === 'number' && isFinite(parseInt(el));
        return bool;
    }
    setMaterials() {
        const m = this.materials;
        const cube = this.cube;
        m.inputL = [cube.F.map(e=>e[0]), cube.D.map(e=>e[0]), cube.B.map(e=>e[2]).reverse(), cube.U.map(e=>e[0])];
        m.inputR = [cube.F.map(e=>e[2]), cube.U.map(e=>e[2]), cube.B.map(e=>e[0]).reverse(), cube.D.map(e=>e[2])];
        m.inputF = [cube.U[2], cube.R.map(e=>e[0]), cube.D[0], cube.L.map(e=>e[2])];
        m.inputB =  [cube.U[0], cube.L.map(e=>e[0]), cube.D[2], cube.R.map(e=>e[2])];
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
    rotateQuarter(v, func) {
        if(v[0] === 'U') func(this.cube.U);
        else if(v[0] === 'D') func(this.cube.D);
        else if(v[0] === 'L') func(this.cube.L);
        else if(v[0] === 'R') func(this.cube.R);
        else if(v[0] === 'F') func(this.cube.F);
        else if(v[0] === 'B') func(this.cube.B);
    }
    // 반시계방향 90도 회전
    rotateCounter(face) {
        const copied = face.map(e => [...e]);
        [face[0][0], face[0][1], face[0][2]] = copied.map(e => e[2]);
        [face[1][0], face[1][1], face[1][2]] = copied.map(e => e[1]);
        [face[2][0], face[2][1], face[2][2]] = copied.map(e => e[0]);
    }
    // 시계방향 90도 회전
    rotateClockwise(face) {
        const copied = face.map(e => [...e]);
        [face[0][0], face[0][1], face[0][2]] = copied.map(e => e[0]).reverse();
        [face[1][0], face[1][1], face[1][2]] = copied.map(e => e[1]).reverse();
        [face[2][0], face[2][1], face[2][2]] = copied.map(e => e[2]).reverse();
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
        cube.B.forEach((e, i) => e[2] = this.currArr[2][2-i]);
        cube.U.forEach((e, i) => e[0] = this.currArr[3][i]);
    }
    fixCubeOfR(cube) {
        cube.F.forEach((e, i) => e[2] = this.currArr[0][i]);
        cube.U.forEach((e, i) => e[2] = this.currArr[1][i]);
        cube.B.forEach((e, i) => e[0] = this.currArr[2][2-i]);
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
