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
    }
    // submit버튼 클릭 이벤트
    initEvent() {
        this.step1Btn.addEventListener("click", this.getInputArr.bind(this));
    }
    // 버튼 클릭이벤트 핸들러(입력값 받아서 배열로 반환)
    getInputArr(e) { 
        e.preventDefault();
        const text = this.step1Text.value;
        console.log(text.split(' '));
    }
    // 음수 → 양수, 소문자 → 대문자
    fixInputArr() {

    }
    // 문자의 길이로 나눈 나머지로 이동거리 구하기
    getDistance() {

    }
    
    // R일 때, pop, unshift를 distance번
    // L일 때, shift, push를 distance번

    // 결과 화면에 출력
    viewResult() {

    }
}
const pushWord = new PushWord(reference);
pushWord.initEvent();


