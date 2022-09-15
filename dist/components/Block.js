import ComponentImp from "../core/Component.js";
export default class Block extends ComponentImp {
    template() {
        return `
          <div class="block__header">
            <div class="block__header__container">
              <div class="block__header--title">제목</div>
            </div>
            <div class="block__header__icon">
              <span class="material-symbols-outlined">close</span>
            </div>
          </div>
          <div class="block__body"></div>
      `;
    }
    mounted() {
        const { block } = this.$props;
        const $title = this.$target.querySelector(".block__header--title");
        const $body = this.$target.querySelector(".block__body");
        $title.innerHTML = block.title;
        $body.innerHTML = this.getBlockBody(block);
    }
    getBlockBody(block) {
        const { type, input } = block;
        switch (type) {
            case "Image":
                return `<div class="block__body--image"><img src="${input}"></div>`;
            case "Video":
                const embeddedURL = this.convertToEmbeddedURL(input);
                return `<div class="block__body--video">
                  <iframe class="block__body--video__iframe" src="${embeddedURL}">
                  </iframe>
                </div>`;
            case "Task":
                return `<div class="block__body--task"><input type="checkbox" id="${input}" name="${input}" />${input}<label for="${input}"></label></div>`;
            case "Note":
                return `<div class="block__body--Note">${input}</div>`;
            default:
                return `<div class="block__body--Note">${input}</div>`;
        }
    }
    convertToEmbeddedURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-_]{11})))/m;
        const match = url.match(regExp);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://youtube.com/embed/${videoId}`;
        }
        return url;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    onDragStart(_) {
        this.notifyDragObservers("start");
        this.$target.classList.add("lifted");
    }
    onDragEnd(_) {
        this.notifyDragObservers("stop");
        this.$target.classList.remove("lifted");
    }
    onDragEnter(_) {
        this.notifyDragObservers("enter");
        this.$target.classList.add("drop-area");
    }
    onDragLeave(_) {
        this.notifyDragObservers("leave");
        this.$target.classList.remove("drop-area");
    }
    onDropped() {
        this.$target.classList.remove("drop-area");
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    muteChildren(state) {
        if (state === "mute") {
            this.$target.classList.add("mute-children");
        }
        else {
            this.$target.classList.remove("mute-children");
        }
    }
    setEvent() {
        this.addEvent("dragstart", ".block__container", (e) => {
            this.onDragStart(e);
        });
        this.addEvent("dragend", ".block__container", (e) => {
            this.onDragEnd(e);
        });
        this.addEvent("dragenter", ".block__container", (e) => {
            this.onDragEnter(e);
        });
        this.addEvent("dragleave", ".block__container", (e) => {
            this.onDragLeave(e);
        });
    }
}
