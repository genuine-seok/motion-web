import ComponentImp from "../core/Component.js";
import { ButtonId } from "./Popup.js";

export type BlockData = {
  type: ButtonId;
  title: string;
  input: string;
};

export default class Block extends ComponentImp {
  template(): string {
    return `
          <div class="block__header">
            <div class="block__header--title">제목</div>
            <span class="material-symbols-outlined">close</span>
          </div>
          <div class="block__body"> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </div>
      `;
  }

  mounted(): void {
    const { block } = this.$props;

    const $title = this.$target.querySelector(
      ".block__header--title"
    ) as Element;
    const $body = this.$target.querySelector(".block__body") as Element;
    $title.innerHTML = block.title;
    $body.innerHTML = block.input;
  }

  //TODO : debounce 적용
  setEvent(): void {
    this.addEvent("mouseover", ".block__container", (e: Event) => {
      const $target = e.target as Element;
      const $closeBtn = $target.querySelector(".material-symbols-outlined");
      $closeBtn?.classList.add("active");
    });

    this.addEvent("mouseout", ".block__container", (e: Event) => {
      const $target = e.target as Element;
      const $closeBtn = $target.querySelector(".material-symbols-outlined");
      $closeBtn?.classList.remove("active");
    });
  }
}
