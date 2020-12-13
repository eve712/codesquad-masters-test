const cube = {
    U: [['B','B','B'], ['B','B','B'], ['B','B','B']],
    D: [['R','R','R'], ['R','R','R'], ['R','R','R']],
    L: [['W','W','W'], ['W','W','W'], ['W','W','W']],
    R: [['G','G','G'], ['G','G','G'], ['G','G','G']],
    F: [['O','O','O'], ['O','O','O'], ['O','O','O']],
    B: [['Y','Y','Y'], ['Y','Y','Y'], ['Y','Y','Y']]
}
// ---------------------● Rubiks Cube Data ●-----------------------
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
        this.counting = 0;
        this.startingTime;
        this.boolOfTime = true;
    }
    main(value) {
        let allResults = [];
        if(this.boolOfTime){this.saveTime();}
        this.tokenize(value);
        const quit = this.plane.existsQ.call(this);
        this.inputArr.forEach(v => {
            this.counting++;
            this.setMaterials();
            this.setCurrArr(v);
            this.decideWay(v);
            this.plane.processArr.call(this);
            this.fixCube(v);
            if(this.way === 'R') {this.rotateQuarter(v, this.rotateClockwise);}
            else {this.rotateQuarter(v, this.rotateCounter);}
            allResults.push(JSON.parse(JSON.stringify(cube)));
        });
        const data = {input: this.inputArr, result: allResults, q: quit};
        return data;
    }
    // 경과 시간 구하기 위한 현재 시간 저장 
    saveTime() {
        const date = new Date();
        this.startingTime = date.getTime();
        this.boolOfTime = false;
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
    // 조작을 위해 사용할 배열들 업데이트
    setMaterials() {
        const m = this.materials;
        const cube = this.cube;
        m.inputL = [cube.F.map(e=>e[0]), cube.D.map(e=>e[0]), cube.B.map(e=>e[2]).reverse(), cube.U.map(e=>e[0])];
        m.inputR = [cube.F.map(e=>e[2]), cube.U.map(e=>e[2]), cube.B.map(e=>e[0]).reverse(), cube.D.map(e=>e[2])];
        m.inputF = [cube.U[2], cube.R.map(e=>e[0]), cube.D[0], cube.L.map(e=>e[2])];
        m.inputB =  [cube.U[0], cube.L.map(e=>e[0]), cube.D[2], cube.R.map(e=>e[2])];
    }
    // 조작을 위해 사용할 배열을 currArr에 저장
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
    // 매개변수(조작법, this.way)에 따라 90도 회전 
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
    // 데이터 조작한 것을 cube 객체에 반영
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
    constructor(reference, rubiksCubeData, cube) {
        this.step3Text = reference.step3Text;
        this.step3Btn = reference.step3Btn;
        this.step3Result = reference.step3Result;
        this.rubiksCubeData = rubiksCubeData;
        this.cube = cube;
        this.copiedCube = JSON.parse(JSON.stringify(cube));
        this.inputArr = [];
        this.time;
    }
    setEvent() {
        this.step3Btn.addEventListener("click", this.handleData.bind(this));
    }
    handleData(e) {
        e.preventDefault();
        const value = this.step3Text.value;
        if(value === 'Q') this.quit();
        else {
            const init = JSON.parse(JSON.stringify(this.cube));
            const data = this.rubiksCubeData.main(value);
            this.viewAll(data, init, value);
        }
        this.step3Text.value = '';
    }
    viewAll(data, init, value) {
        this.inputArr = data.input;
        const inputStr = this.getInputStr(data, value);
        this.viewDefault(init, inputStr);
        this.viewResult(data.result);
        if(data.q) this.quit();
    }
    // 입력값에 Q가 있으면 그 이전까지 문자열 반환
    getInputStr(data, value) {
        if(data.q) {
            const i = value.indexOf('Q');
            return value.substring(0, i);
        } return value;
    }
    // 면 하나의 템플릿 생성 
    getSideTemplate(doubleArr) {
        let template = ``;
        doubleArr.forEach(row => {
            const str = row.join('');
            template += `${str}<br>`;
        });
        return template;
    }
    viewDefault(init, inputStr) {
        this.step3Result.innerHTML += 
        `<br><div>-----------------------------------<div>
        <div class="up_side">${this.getSideTemplate(init.U)}</div>
        <div class="middle_side">
            <div>${this.getSideTemplate(init.L)}</div>
            <div>${this.getSideTemplate(init.F)}</div>
            <div>${this.getSideTemplate(init.R)}</div>
            <div>${this.getSideTemplate(init.B)}</div>
        </div>
        <div class="down_side">${this.getSideTemplate(init.D)}</div><br>
        <div class="input_alltexts">CUBE> ${inputStr}</div><br>`
    }
    viewResult(allResults) {
        allResults.forEach((cube, i) => {
            this.step3Result.innerHTML += 
            `<div class="input_text">< ${this.inputArr[i]} ></div>
            <div class="up_side">${this.getSideTemplate(cube.U)}</div>
            <div class="middle_side">
            <div>${this.getSideTemplate(cube.L)}</div>
            <div>${this.getSideTemplate(cube.F)}</div>
            <div>${this.getSideTemplate(cube.R)}</div>
            <div>${this.getSideTemplate(cube.B)}</div>
            </div>
            <div class="down_side">${this.getSideTemplate(cube.D)}</div><br>`
        });
    }
    quit() {
        this.saveTime();
        this.step3Result.innerHTML += 
        `<div>CUBE> Q</div>
        <div>경과시간: ${this.time.hour}:${this.time.min}:${this.time.sec}</div>
        <div>조작갯수: ${this.rubiksCubeData.counting}</div>
        <div>이용해주셔서 감사합니다!!! 뚜뚜뚜-</div>`;
        this.cube = this.copiedCube;
        this.rubiksCubeData.counting = 0;
    }
    // 경과 시간 계산
    saveTime() {
        const starting = this.rubiksCubeData.startingTime;
        const date = new Date()
        const ending = date.getTime();
        this.time = this.getTime(ending - starting);
        this.rubiksCubeData.boolOfTime = true;
    }
    //시간 차이 계산
    getTime(diff) {
        let sec, min, hour;
        sec = parseInt(diff / 1000);
        [min, hour] = ['00', '00']
        if(sec > 60 && sec < 3600) {
            hour = '00';
            min = parseInt(diff / 1000 / 60);
            sec = parseInt((diff / 1000) % 60);
        } else if(sec > 3600) {
            hour = parseInt(diff / 1000 / 60 / 60);
            min = parseInt((diff / 1000 / 60) % 60);
            sec = parseInt((diff / 1000) % 60);
        }
        return {'sec': sec, 'min': min, 'hour': hour};
    }
}
class RandomCube{
    constructor(reference, rubiksCubeData, viewRubiksCube) {
        this.randomBtn = reference.randomBtn;
        this.step3Result = reference.step3Result;
        this.char = ['U', 'L', 'F', 'R', 'B', 'D'];
        this.string = '';
        this.rubiksCubeData = rubiksCubeData;
        this.viewRubiksCube = viewRubiksCube;
    }
    setEvent() {
        this.randomBtn.addEventListener("click", this.makeRandomCube.bind(this));
    }
    makeRandomCube() {
        this.getRandomStr(4, 8);
        const data = this.rubiksCubeData.main(this.string);
        const cube = data.result[this.string.length - 1];
        this.step3Result.innerHTML += 
        `<div class="up_side">${this.viewRubiksCube.getSideTemplate(cube.U)}</div>
        <div class="middle_side">
        <div>${this.viewRubiksCube.getSideTemplate(cube.L)}</div>
        <div>${this.viewRubiksCube.getSideTemplate(cube.F)}</div>
        <div>${this.viewRubiksCube.getSideTemplate(cube.R)}</div>
        <div>${this.viewRubiksCube.getSideTemplate(cube.B)}</div>
        </div>
        <div class="down_side">${this.viewRubiksCube.getSideTemplate(cube.D)}</div><br>`;
        this.string = '';
    }
    getRandomStr(min, max) {
        const repeat = this.getRandomNum(min, max);
        for(let i = 0; i < repeat; i++) {
            let idx = this.getRandomNum(0, this.char.length - 1);
            this.string += this.char[idx]; 
        }
    }
    getRandomNum (min, max) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }

}
// -------------● 실행 ●-------------
const rubiksCubeData = new RubiksCubeData(cube, planeCubeData);
const viewRubiksCube = new ViewRubiksCube(reference, rubiksCubeData, cube);
viewRubiksCube.setEvent();
const randomCube = new RandomCube(reference, rubiksCubeData, viewRubiksCube);
randomCube.setEvent();
