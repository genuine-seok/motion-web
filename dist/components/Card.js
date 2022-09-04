import ComponentImp from "../core/Component.js";
export default class Card extends ComponentImp {
    template() {
        return `
        <section class="card__container">
            <div class="card__header">
              <div class="card__header--title">제목</div>
              <span class="material-symbols-outlined">close</span>
            </div>
            <div class="card__body"> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </div>
        </section>
      `;
    }
    setEvent() {
        this.addEvent("mouseover", ".card__container", (e) => {
            const $target = e.target;
            const $closeBtn = $target.querySelector(".material-symbols-outlined");
            $closeBtn === null || $closeBtn === void 0 ? void 0 : $closeBtn.classList.add("active");
        });
        this.addEvent("mouseout", ".card__container", (e) => {
            const $target = e.target;
            const $closeBtn = $target.querySelector(".material-symbols-outlined");
            $closeBtn === null || $closeBtn === void 0 ? void 0 : $closeBtn.classList.remove("active");
        });
    }
}
