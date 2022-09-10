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
    $body.innerHTML = this.getBlockBody(block);
  }

  private getBlockBody(block: BlockData) {
    const { type, input } = block;

    switch (type) {
      case "Image":
        return `<div class="block__body--image"><img src="${input}"></div>`;
      case "Video":
        return `<div class="block__body--video"><iframe title="video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0" allowfullscreen src="${input}?autoplay=1&mute=1"></iframe></div>`;
      case "Task":
        return `<div class="block__body--task"><input type="checkbox" id="${input}" name="${input}" />${input}<label for="${input}"></label></div>`;
      case "Note":
        return `<div class="block__body--Note">${input}</div>`;
      default:
        return `<div class="block__body--Note">${input}</div>`;
    }
  }
}
