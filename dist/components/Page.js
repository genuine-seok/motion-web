import ComponentImp from "../core/Component.js";
import { getDefaultData } from "../utils/getData.js";
import Block from "./Block.js";
export default class Page extends ComponentImp {
    constructor() {
        super(...arguments);
        this.blockCompSet = new Set();
    }
    setup() {
        const dataset = getDefaultData();
        this.$state = Object.assign({}, dataset);
        this.blockCompSet = new Set();
    }
    template() {
        return `<section data-component="page__container"></section>`;
    }
    mounted() {
        this.paintBlocks();
    }
    addBlock(block) {
        const { blockList } = this.$state;
        const newBlockList = [...blockList, block];
        const newState = Object.assign(Object.assign({}, this.$state), { blockList: newBlockList });
        this.setState(newState);
        this.paintBlocks();
    }
    removeBlock(id) {
        const { blockList } = this.$state;
        const newBlockList = [...blockList];
        newBlockList.splice(id, 1);
        const newState = {
            blockList: newBlockList,
        };
        this.setState(newState);
        this.render();
    }
    paintBlocks() {
        const { blockList } = this.$state;
        const $pageContainer = this.$target.querySelector('[data-component="page__container"]');
        if (blockList.length) {
            $pageContainer.innerHTML = ``;
            blockList.forEach((block, id) => {
                const $newBlock = this.makeBlock(block, id);
                $pageContainer.appendChild($newBlock);
            });
        }
    }
    makeBlock(block, id) {
        const $newBlock = document.createElement("section");
        $newBlock.id = id.toString();
        $newBlock.classList.add("block__container");
        $newBlock.draggable = true;
        const newBlock = new Block($newBlock, { block });
        this.blockCompSet.add(newBlock);
        newBlock.setOnDragStateListener((target, state) => {
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
    onDragOver(e) {
        e.preventDefault();
    }
    onDragDrop(e) {
        var _a;
        e.preventDefault();
        if (this.dragTarget &&
            this.dropTarget &&
            this.dragTarget !== this.dropTarget) {
            const blockList = [...this.$state.blockList];
            const draggedIdx = +this.dragTarget.$target.id;
            const droppedIdx = +this.dropTarget.$target.id;
            const dragged = blockList.splice(draggedIdx, 1);
            blockList.splice(droppedIdx, 0, dragged[0]);
            const newState = { blockList };
            this.setState(newState);
            this.render();
        }
        (_a = this.dropTarget) === null || _a === void 0 ? void 0 : _a.onDropped();
    }
    updateBlockPointers(state) {
        this.blockCompSet.forEach((block) => {
            block.muteChildren(state);
        });
    }
    setEvent() {
        this.addEvent("click", ".material-symbols-outlined", (e) => {
            const $icon = e.target;
            const target = $icon.closest(".block__container");
            const id = parseInt(target.id);
            this.removeBlock(id);
        });
        this.addEvent("dragover", '[data-component="page__container"]', (e) => {
            this.onDragOver(e);
        });
        this.addEvent("drop", '[data-component="page__container"]', (e) => {
            this.onDragDrop(e);
        });
    }
}
