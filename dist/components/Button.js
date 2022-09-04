import ComponentImp from "../core/Component.js";
export default class Button extends ComponentImp {
    setup() {
        const { type } = this.$props;
        this.$state = { type };
    }
    template() {
        const { type } = this.$state;
        return `<button id="${type}">${type}</button>`;
    }
}
