const reference = {
    step1Btn: document.getElementById('step1_btn')
};

class PushWord {
    constructor(reference) {
        this.step1Btn = reference.step1Btn;
        this.word;
        this.num;
        this.way;
        this.distance;
    }
    // submit버튼 클릭 이벤트
    initEvent() {
        this.step1Btn.addEventListener('click', this.getInput);
    }
    // 버튼 클릭이벤트 핸들러(입려값 받아서 배열로 반환)
    getInputArr() {

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

