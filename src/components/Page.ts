import ComponentImp from "../core/Component.js";
import { getDefaultData } from "../utils/getData.js";
import Block, { BlockData, DragState } from "./Block.js";

export default class Page extends ComponentImp {
  private blockCompSet = new Set<Block>();
  private dropTarget?: Block;
  private dragTarget?: Block;

  setup() {
    const dataset = getDefaultData();
    this.$state = {
      ...dataset,
    };
    this.blockCompSet = new Set<Block>();
  }

  template(): string {
    return `<section data-component="page__container"></section>`;
  }

  mounted(): void {
    this.paintBlocks();
  }

  addBlock(block: BlockData) {
    const { blockList } = this.$state;
    const newBlockList = [...blockList, block];
    const newState = { ...this.$state, ...{ blockList: newBlockList } };
    this.setState(newState);
    this.paintBlocks();
  }

  removeBlock(id: number) {
    const { blockList } = this.$state;
    const newBlockList = [...blockList];
    newBlockList.splice(id, 1);
    const newState = {
      blockList: newBlockList,
    };
    this.setState(newState);
    this.render();
  }

  private paintBlocks() {
    const { blockList } = this.$state;
    const $pageContainer = this.$target.querySelector(
      '[data-component="page__container"]'
    ) as Element;

    if (blockList.length) {
      $pageContainer.innerHTML = ``;
      blockList.forEach((block: BlockData, id: number) => {
        const $newBlock = this.makeBlock(block, id);
        $pageContainer.appendChild($newBlock);
      });
    }
  }

  private makeBlock(block: BlockData, id: number) {
    const $newBlock = document.createElement("section");
    $newBlock.id = id.toString();
    $newBlock.classList.add("block__container");
    $newBlock.draggable = true;
    const newBlock = new Block($newBlock, { block });
    this.blockCompSet.add(newBlock);

    newBlock.setOnDragStateListener((target: Block, state: DragState) => {
      switch (state) {
        case "start":
          this.dragTarget = target;
          this.updateBlockPointers("mute");
          break;
        case "stop":
          this.dragTarget = undefined;
          this.updateBlockPointers("unmute");
          break;
        case "enter":
          this.dropTarget = target;
          break;
        case "leave":
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state ${state}`);
      }
    });
    return $newBlock;
  }

  private onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  private onDragDrop(e: DragEvent) {
    e.preventDefault();
    if (
      this.dragTarget &&
      this.dropTarget &&
      this.dragTarget !== this.dropTarget
    ) {
      const blockList = [...this.$state.blockList];
      const draggedIdx = +this.dragTarget.$target.id;
      const droppedIdx = +this.dropTarget.$target.id;
      const dragged = blockList.splice(draggedIdx, 1);
      blockList.splice(droppedIdx, 0, dragged[0]);
      const newState = { blockList };
      this.setState(newState);
      this.render();
    }
    this.dropTarget?.onDropped();
  }

  private updateBlockPointers(state: "mute" | "unmute") {
    this.blockCompSet.forEach((block: Block) => {
      block.muteChildren(state);
    });
  }

  setEvent(): void {
    this.addEvent("click", ".material-symbols-outlined", (e: Event) => {
      const $icon = e.target as Element;
      const target = $icon.closest(".block__container") as Element;
      const id = parseInt(target.id);
      this.removeBlock(id);
    });

    this.addEvent(
      "dragover",
      '[data-component="page__container"]',
      (e: DragEvent) => {
        this.onDragOver(e);
      }
    );

    this.addEvent(
      "drop",
      '[data-component="page__container"]',
      (e: DragEvent) => {
        this.onDragDrop(e);
      }
    );
  }
}
