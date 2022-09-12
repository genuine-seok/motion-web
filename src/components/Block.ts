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
        console.log("received input value is : ", input);
        const embeddedURL = this.convertToEmbeddedURL(input);
        return `<div class="block__body--video">
                  <iframe class="block__body--video__iframe" src="${embeddedURL}">
                  </iframe>
                </div>`;
      case "Task":
        return `<div class="block__body--task"><input type="checkbox" id="${input}" name="${input}" />${input}<label for="${input}"></label></div>`;
      case "Note":
        return `<div class="block__body--Note">${input}</div>`;
      default:
        return `<div class="block__body--Note">${input}</div>`;
    }
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-_]{11})))/m;
    const match = url.match(regExp);
    console.log("match", match);
    const videoId = match ? match[1] || match[2] : undefined;
    console.log("videoId", videoId);
    if (videoId) {
      return `https://youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
