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

  public removeBlock(id: number) {
    const { blockList } = this.$state;
    const newBlockList = [...blockList];
    newBlockList.splice(id, 1);
    const newState = {
      blockList: newBlockList,
    };
    this.setState(newState);
    this.render();
  }

  //TODO : debounce 적용
  setEvent(): void {
    this.addEvent("click", ".material-symbols-outlined", (e: Event) => {
      const $icon = e.target as Element;
      const target = $icon.closest(".block__container") as Element;
      const id = parseInt(target.id);
      this.removeBlock(id);
    });
  }
}
