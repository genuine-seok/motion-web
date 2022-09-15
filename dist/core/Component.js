export default class ComponentImp {
    constructor($target, $props, $state) {
        this.$target = $target;
        this.$props = $props;
        this.$state = $state;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup() { }
    template() {
        return ``;
    }
    mounted() { }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setEvent() { }
    setState(newState) {
        this.$state = Object.assign(Object.assign({}, this.$state), newState);
    }
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);
        this.$target.addEventListener(eventType, (event) => {
            if (!isTarget(event.target))
                return false;
            return callback(event);
        });
    }
}
