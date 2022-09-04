import ComponentImp from "../core/Component.js";

export default class Card extends ComponentImp {
  template(): string {
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

  //TODO : debounce 적용
  setEvent(): void {
    this.addEvent("mouseover", ".card__container", (e: Event) => {
      const $target = e.target as Element;
      const $closeBtn = $target.querySelector(".material-symbols-outlined");
      $closeBtn?.classList.add("active");
    });

    this.addEvent("mouseout", ".card__container", (e: Event) => {
      const $target = e.target as Element;
      const $closeBtn = $target.querySelector(".material-symbols-outlined");
      $closeBtn?.classList.remove("active");
    });
  }
}
