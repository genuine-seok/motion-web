import ComponentImp from "../core/Component.js";
export default class Button extends ComponentImp {
    setup() {
        const { id } = this.$props;
        this.$state = { id };
    }
    template() {
        const { id } = this.$state;
        return `<button id="${id}" class="button--header">${id}</button>`;
    }
}
