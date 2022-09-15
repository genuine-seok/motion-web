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
    constructor() {
        super(...arguments);
        this.TITLE = 0;
        this.INPUT = 1;
    }
    setup() {
        this.$state = {
            type: "Image",
            inputs: {
                title: "",
                input: "",
            },
        };
    }
    mounted() {
        const { type } = this.$state;
        this.setPopupElements(type);
    }
    template() {
        return `
    <div class="popup--background">
        <div class="popup--container">
            <div class="popup--body">
                <div class="popup--text--container">
                    <div data-component="popup--text">팝업 타이틀</div>
                </div>
                <div class="popup--input--container">
                    <div data-component="popup--title">
                        <label for="title">제목</label>
                        <input name="title" type="text" class="popup--input--field" id="title" required/>
                    </div>
                    <div data-component="popup--input"></div>
                </div>
                <div class="popup--button--container">
                    <button class="button__confirm">확인</button>
                    <button class="button__cancel">취소</button>
                </div>
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
      <input name="input" type="text" class="popup--input--field" id="${id}" required/>`;
    }
    setPopupType(type) {
        const newState = {
            type,
            inputs: {
                title: "",
                input: "",
            },
        };
        this.setState(newState);
        this.setPopupElements(type);
    }
    setPopupElements(id) {
        const $text = this.$target.querySelector('[data-component="popup--text"]');
        const $input = this.$target.querySelector('[data-component="popup--input"]');
        $text.innerHTML = this.getNewText(id);
        $input.innerHTML = this.getNewInput(id);
    }
    fadeIn() {
        const $popupBackground = this.$target.querySelector(".popup--background");
        $popupBackground.classList.add("active");
    }
    fadeOut() {
        const $popupBackground = this.$target.querySelector(".popup--background");
        $popupBackground.classList.remove("active");
    }
    setEvent() {
        const { $Page } = this.$props;
        this.addEvent("click", ".button__confirm", () => {
            const $inputs = this.$target.querySelectorAll("input");
            const $title = $inputs[this.TITLE];
            const $input = $inputs[this.INPUT];
            if ($title.value === "" || $input.value === "") {
                this.fadeOut();
                return;
            }
            const newBlock = {
                type: $input.id,
                title: $title.value,
                input: $input.value,
            };
            $title.value = "";
            $input.value = "";
            $Page.addBlock(newBlock);
            this.fadeOut();
        });
        this.addEvent("click", ".button__cancel", () => {
            this.fadeOut();
        });
    }
}
