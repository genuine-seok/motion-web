import ComponentImp from "../core/Component.js";
import { CardData } from "../app.js";

const TITLE = 0;
const INPUT = 1;

export type ButtonId = "Image" | "Video" | "Task" | "Note";
type PopupInput = {
  title: "이미지" | "영상" | "할 일 목록" | "노트";
  input: "URL" | "내용";
};

const buttonMap: Record<ButtonId, PopupInput> = {
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
  setup(): void {
    this.$state = {
      title: "",
      input: "",
    };
  }

  mounted(): void {
    const { id } = this.$props;
    this.setPopupElements(id);
  }

  template(): string {
    return `
    <div class="popup--text--container">
        <div data-component="popup--text">팝업 타이틀</div>
    </div>
    <div class="popup--input--container">
        <div data-component="popup--title">
            <label for="title">제목</label>
            <input name="title" type="text" class="popup--input--field" id="title" />
        </div>
        <div data-component="popup--input"></div>
    </div>
    <div class="popup--button--container">
        <button class="button__confirm">확인</button>
        <button class="button__cancel">취소</button>
    </div>
        `;
  }

  getNewText(id: ButtonId) {
    return `<h3>${buttonMap[id].title} 블럭 만들기</h3>`;
  }
  getNewInput(id: ButtonId) {
    return `<label for="${id}">${buttonMap[id].input}</label>
      <input name="input" type="text" class="popup--input--field" id="${id}" />`;
  }

  setPopupElements(id: ButtonId) {
    const $text = this.$target.querySelector(
      '[data-component="popup--text"]'
    ) as Element;
    const $input = this.$target.querySelector(
      '[data-component="popup--input"]'
    ) as Element;
    $text.innerHTML = this.getNewText(id);
    $input.innerHTML = this.getNewInput(id);
  }

  setEvent(): void {
    const { addNewCard, checkAppState } = this.$props;

    this.addEvent("click", ".button__confirm", () => {
      const $inputs = this.$target.querySelectorAll("input");
      const $title = $inputs[TITLE] as HTMLInputElement;
      const $input = $inputs[INPUT] as HTMLInputElement;
      const card: CardData = {
        type: $input.id as ButtonId,
        title: $title.value,
        input: $input.value,
      };
      addNewCard(card);
      checkAppState();
      // 팝업 닫기 이벤트 추가
    });

    this.addEvent("click", ".button__cancel", () => {
      const $popupContainer = document.querySelector(".popup") as Element;
      $popupContainer.classList.remove("active");
    });
  }
}
