import ComponentImp from "../core/Component.js";

export default class Button extends ComponentImp {
  setup(): void {
    const { id } = this.$props;
    this.$state = { id };
  }

  template(): string {
    const { id } = this.$state;
    return `<button id="${id}" class="button--header">${id}</button>`;
  }
}
