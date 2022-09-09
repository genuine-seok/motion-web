import ComponentImp from "../core/Component.js";
import Button from "./Button.js";

export default class Header extends ComponentImp {
  template(): string {
    return `
    <nav data-component="header__container">
        <div data-component="header--title__container">
            <div class="header--title__icon">
              <img class="icon__logo" src="./assets/icon.svg" />
            </div>
            <h1 data-component="header--title">MOTION</h1>
        </div>
        <div class="button__container">
            <div data-component="button--image">Image</div>
            <div data-component="button--video">Video</div>
            <div data-component="button--task">Task</div>
            <div data-component="button--note">Note</div>
        </div>
    </nav>`;
  }

  mounted() {
    const $imageBtn = this.$target.querySelector(
      '[data-component="button--image"]'
    ) as Element;
    const $videoBtn = this.$target.querySelector(
      '[data-component="button--video"]'
    ) as Element;
    const $taskBtn = this.$target.querySelector(
      '[data-component="button--task"]'
    ) as Element;
    const $noteBtn = this.$target.querySelector(
      '[data-component="button--note"]'
    ) as Element;
    new Button($imageBtn, { id: "Image" });
    new Button($videoBtn, { id: "Video" });
    new Button($taskBtn, { id: "Task" });
    new Button($noteBtn, { id: "Note" });
  }

  setEvent(): void {
    const { $Popup } = this.$props;
    this.addEvent("click", ".button__container", (e: Event) => {
      const target = e.target as Element;
      const { id } = target;
      $Popup.setPopupType(id);
      $Popup.fadeIn();
    });
  }
}
