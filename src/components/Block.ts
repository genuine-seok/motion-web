import ComponentImp, { Component } from "../core/Component.js";
import { ButtonId } from "./Popup.js";

export type BlockData = {
  type: ButtonId;
  title: string;
  input: string;
};

export type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

export default class Block extends ComponentImp {
  private dragStateListener?: OnDragStateListener<Block>;

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
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://youtube.com/embed/${videoId}`;
    }
    return url;
  }

  setOnDragStateListener(listener: OnDragStateListener<Block>) {
    this.dragStateListener = listener;
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
    this.$target.classList.add("lifted");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
    this.$target.classList.remove("lifted");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
    this.$target.classList.add("drop-area");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
    this.$target.classList.remove("drop-area");
  }
  onDropped() {
    this.$target.classList.remove("drop-area");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.$target.classList.add("mute-children");
    } else {
      this.$target.classList.remove("mute-children");
    }
  }

  setEvent(): void {
    this.addEvent("dragstart", ".block__container", (e: DragEvent) => {
      this.onDragStart(e);
    });

    this.addEvent("dragend", ".block__container", (e: DragEvent) => {
      this.onDragEnd(e);
    });

    this.addEvent("dragenter", ".block__container", (e: DragEvent) => {
      this.onDragEnter(e);
    });

    this.addEvent("dragleave", ".block__container", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }
}
