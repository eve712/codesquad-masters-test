const reference = {
    step1Text: document.getElementById('step1'),
    step1Btn: document.getElementById('step1_btn')
};

class PushWord {
    constructor(reference) {
        this.step1Text = reference.step1Text;
        this.step1Btn = reference.step1Btn;
        this.word;
        this.num;
        this.way;
        this.distance;
        this.result;
    }
    // submit버튼 클릭 이벤트
    initEvent() {
        this.step1Btn.addEventListener("click", this.createInputArr.bind(this));
    }
    // 버튼 클릭이벤트 핸들러(입력값 받아서 배열로 반환)
    createInputArr(e) { 
        e.preventDefault();
        const arr = this.step1Text.value.split(' ');
        [this.word, this.num, this.way] = [arr[0], arr[1], arr[2]];
        this.step1Text.value = '';
        this.fixInputArr();
        this.setDistance();
        this.popWord();
    }
    // 소문자 → 대문자, 음수 → 양수
    fixInputArr() {
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
    popWord() {
        let wordArr = this.word.split('');
        let times = 0;
        while(++times <= this.distance) {
            let popped = wordArr.pop();
            wordArr.unshift(popped);
        }
        this.result = wordArr.join('');
    }
    // L일 때, shift, push를 distance번

    // 결과 화면에 출력
    viewResult() {

    }
}
const pushWord = new PushWord(reference);
pushWord.initEvent();


