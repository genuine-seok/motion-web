import ComponentImp from "../core/Component.js";
import Button from "./Button.js";
export default class Header extends ComponentImp {
    template() {
        return `
    <nav data-component="header__container">
        <div data-component="header--title__container">
            <div class="header--title__icon">
              <img class="icon__logo" src="./assets/icon.svg" />
            </div>
            <h1 data-component="header--title">MOTION</h1>
        </div>
        <div data-component="button__container">
            <div data-component="button--image">Image</div>
            <div data-component="button--video">Video</div>
            <div data-component="button--task">Task</div>
            <div data-component="button--note">Note</div>
        </div>
    </nav>`;
    }
    mounted() {
        const $imageBtn = this.$target.querySelector('[data-component="button--image"]');
        const $videoBtn = this.$target.querySelector('[data-component="button--video"]');
        const $taskBtn = this.$target.querySelector('[data-component="button--task"]');
        const $noteBtn = this.$target.querySelector('[data-component="button--note"]');
        new Button($imageBtn, { type: "Image" });
        new Button($videoBtn, { type: "Video" });
        new Button($taskBtn, { type: "Task" });
        new Button($noteBtn, { type: "Note" });
    }
}
