export interface Component {
  setup(): void;
  template(): string;
  mounted(): void;
  render(): void;
  setEvent(): void;
  setState(state: any): void;
  addEvent(eventType: string, selector: string, callback: Function): void;
}

export default abstract class ComponentImp implements Component {
  constructor(
    readonly $target: Element,
    readonly $props?: any,
    protected $state?: any
  ) {
    this.setup();
    this.render();
    this.setEvent();
  }
  setup() {}
  template() {
    return ``;
  }
  mounted() {}
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() {}
  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
  }
  addEvent(eventType: string, selector: string, callback: Function) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: Element) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event: Event) => {
      if (!isTarget(event.target as Element)) return false;
      return callback(event);
    });
  }
}
