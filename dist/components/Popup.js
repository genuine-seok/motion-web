import ComponentImp from "../core/Component.js";
const buttonMap = {
    Image: {
        title: "이미지",
        input: "URL",
    },
    Video: {
        title: "영상",
        input: "URL",
    },
    Task: {
        title: "할 일 목록",
        input: "내용",
    },
    Note: {
        title: "노트",
        input: "내용",
    },
};
export default class Popup extends ComponentImp {
    mounted() {
        const { id } = this.$props;
        this.setPopupElements(id);
    }
    template() {
        return `
    <div class="popup--container">
        <div class="popup--body">
            <div class="popup--text--container">
                <div data-component="popup--text">팝업 타이틀</div>
            </div>
            <div class="popup--input--container">
                <div data-component="popup--title">
                    <label for="title">제목</label>
                    <input type="text" class="popup--input--field" id="title" />
                </div>
                <div data-component="popup--input"></div>
            </div>
            <div class="popup--button--container">
                <button class="button__confirm">확인</button>
                <button class="button__cancel">취소</button>
            </div>
        </div>
    </div>
        `;
    }
    getNewText(id) {
        return `<h3>${buttonMap[id].title} 블럭 만들기</h3>`;
    }
    getNewInput(id) {
        return `<label for="${id}">${buttonMap[id].input}</label>
      <input type="text" class="popup--input--field" id="${id}" />`;
    }
    setPopupElements(id) {
        const $text = this.$target.querySelector('[data-component="popup--text"]');
        const $input = this.$target.querySelector('[data-component="popup--input"]');
        $text.innerHTML = this.getNewText(id);
        $input.innerHTML = this.getNewInput(id);
    }
    setEvent() {
        this.addEvent("click", ".button__cancel", () => {
            const $popup = this.$target;
            $popup.classList.remove("active");
        });
    }
}
