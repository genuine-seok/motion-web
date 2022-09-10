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
            <div class="block__header__container">
              <div class="block__header--title">제목</div>
            </div>
            <div class="block__header__icon">
              <span class="material-symbols-outlined">close</span>
            </div>
          </div>
          <div class="block__body"></div>
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
}
