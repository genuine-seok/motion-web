import ComponentImp from "../core/Component.js";
import Block, { BlockData } from "./Block.js";

export default class Page extends ComponentImp {
  setup() {
    this.$state = {
      blockList: [],
    };
  }

  template(): string {
    return `<section data-component="page__container"></section>`;
  }

  mounted(): void {
    this.paintBlocks();
  }

  public addBlock(block: BlockData) {
    const { blockList } = this.$state;
    const newBlockList = [...blockList, block];
    const newState = { ...this.$state, ...{ blockList: newBlockList } };
    this.setState(newState);
    this.paintBlocks();
  }

  // blockList를 기준으로 Block들을 렌더링
  private paintBlocks() {
    const { blockList } = this.$state;
    const $pageContainer = this.$target.querySelector(
      '[data-component="page__container"]'
    ) as Element;

    if (blockList.length) {
      $pageContainer.innerHTML = ``;
      blockList.map((block: BlockData, idx: number) => {
        const $newBlock = document.createElement("section");
        $newBlock.id = idx.toString();
        $newBlock.classList.add("block__container");
        $pageContainer.appendChild($newBlock);

        new Block($newBlock, { block });
      });
    }
  }

  // TEST CODE
  public getBlockList() {
    console.log(this.$state.blockList);
  }
}
