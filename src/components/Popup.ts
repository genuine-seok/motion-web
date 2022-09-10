import ComponentImp from "../core/Component.js";
import { BlockData } from "./Block.js";

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
  private TITLE = 0;
  private INPUT = 1;

  setup(): void {
    this.$state = {
      type: "Image",
      inputs: {
        title: "",
        input: "",
      },
    };
  }

  mounted(): void {
    const { type } = this.$state;
    this.setPopupElements(type);
  }

  template(): string {
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

  getNewText(id: ButtonId) {
    return `<h3>${buttonMap[id].title} 블럭 만들기</h3>`;
  }
  getNewInput(id: ButtonId) {
    return `<label for="${id}">${buttonMap[id].input}</label>
      <input name="input" type="text" class="popup--input--field" id="${id}" required/>`;
  }

  setPopupType(type: ButtonId) {
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

  fadeIn() {
    const $popupBackground = this.$target.querySelector(
      ".popup--background"
    ) as Element;
    $popupBackground.classList.add("active");
  }

  fadeOut() {
    const $popupBackground = this.$target.querySelector(
      ".popup--background"
    ) as Element;
    $popupBackground.classList.remove("active");
  }

  setEvent(): void {
    const { $Page } = this.$props;

    this.addEvent("click", ".button__confirm", () => {
      const $inputs = this.$target.querySelectorAll("input");
      const $title = $inputs[this.TITLE] as HTMLInputElement;
      const $input = $inputs[this.INPUT] as HTMLInputElement;

      if ($title.value === "" || $input.value === "") {
        this.fadeOut();
        return;
      }

      const newBlock: BlockData = {
        type: $input.id as ButtonId,
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
