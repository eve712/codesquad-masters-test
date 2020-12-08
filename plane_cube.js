class PlaneCubeData {
    constructor() {
        this.dataArr = [[R, R, W], [G, C, W], [G, B, B]];
    }
    // view로부터 배열을 전달받아 순서대로 함수 실행, 데이터 처리
    main() {

    }
    // 사용자의 입력에 따라 처리할 배열 선택
    pickArr() {

    }
    // 조작에 따라 방향 정하기 (1,R), (1,L)
    // step-1에 있는 함수 사용 ex: [R, R, W], 1, R
    // 처리된 배열을 dataArr에 대입해서 데이터 변경
    // 화면에 출력
}

class ViewPlaneCube {
    constructor(reference) {
        this.step2Text = reference.step2Text;
        this.step2Btn = reference.step2Btn;
        this.step2Result = reference.step2Result;
    }
    // submit버튼 클릭 이벤트
    setEvent() {
        this.step2Btn.addEventListener("click", );
    }
    // value를 배열로 만들어 data로 보내기
    handleData() {

    }
    // 결과를 화면에 출력
    viewResult() {

    }
}

// -------------● 실행 ●-------------
const planeCubeData = new PlaneCubeData();
const viewPlaneCube = new ViewPlaneCube(reference);