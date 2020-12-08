
// ---------------------● Word Data ●-----------------------
class WordData {
    constructor() {
        this.word;
        this.num;
        this.way;
        this.distance;
        this.result;
    }
    main(value) {
        this.assignProperty(value);
        this.fixProperty();
        this.setDistance();
        this.processWord();
    }
    // input 입력값 받아서 배열로 반환
    assignValue(value) { 
        const arr = value.split(' ');
        [this.word, this.num, this.way] = [arr[0], arr[1], arr[2]];   
    }
    // 소문자 → 대문자, 음수 → 양수
    fixValue() {
        if(this.way === 'l') this.way = 'L';
        else if(this.way === 'r') this.way = 'R';
        if(this.num < 0) {
            this.num = Math.abs(this.num);
            if(this.way === 'L') this.way = 'R';
            else if(this.way === 'R') this.way = 'L';
        }
    }
    // 문자의 길이로 나눈 나머지로 이동거리 구하기
    setDistance() {
        const length = this.word.length;
        const num = this.num;
        if(num >= length) this.distance = num % length;
        else this.distance = num;
    }
    // R일 때, pop, unshift를 distance번 반복해서 밀어내기
    // L일 때, shift, push를 distance번 반복해서 밀어내기
    processWord() {
        let wordArr = this.word.split('');
        let times = 0;
        while(++times <= this.distance) {
            if(this.way === 'R') wordArr = this.popWord(wordArr);
            else wordArr = this.shiftWord(wordArr);
        }
        this.result = wordArr.join('');
    }
    popWord(wordArr) {
            let popped = wordArr.pop();
            wordArr.unshift(popped);
            return wordArr;
    }
    shiftWord(wordArr) {
            let shifted = wordArr.shift();
            wordArr.push(shifted);
            return wordArr;
    }
}


// ---------------------● View Word ●-----------------------
class ViewWord {
    constructor(reference, wordData) {
        this.step1Text = reference.step1Text;
        this.step1Btn = reference.step1Btn;
        this.wordData = wordData;
    }
    // submit버튼 클릭 이벤트
    setEvent() {
        this.step1Btn.addEventListener("click", this.handleData.bind(this));
    }
    // value를 data클래스에 보내서 데이터 처리
    handleData(e) {
        e.preventDefault();
        const value = this.step1Text.value;
        this.wordData.main(value);
        this.step1Text.value = '';
    }
    viewResult() {

    }
}


// -----------● DOM 참조 ●------------
const reference = {
    step1Text: document.getElementById('step1'),
    step1Btn: document.getElementById('step1_btn')
};


// -------------● 실행 ●-------------
const wordData = new WordData();

const viewWord = new ViewWord(reference, wordData);
viewWord.setEvent();

