import ComponentImp from "../core/Component.js";
import Block, { BlockData } from "./Block.js";

export default class Page extends ComponentImp {
  setup() {
    this.$state = {
      blockList: [],
    };
  }

  template(): string {
    return `<section data-component="page__container">
              <article class="" data-component="block1"></article>
              <article class="" data-component="block2"></article>
            </section>`;
  }

  mounted(): void {
    const $block = this.$target.querySelector(
      '[data-component="block1"]'
    ) as Element;
    const $block2 = this.$target.querySelector(
      '[data-component="block2"]'
    ) as Element;

    new Block($block);
    new Block($block2);
  }

  public addBlock(block: BlockData) {
    const { blockList } = this.$state;
    const newBl = [...blockList, block];
    const newState = { ...this.$state, ...{ blockList: newBl } };
    this.setState(newState);
  }

  public getBlockList() {
    console.log(this.$state.blockList);
  }
}
