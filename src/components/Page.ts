import ComponentImp from "../core/Component.js";
import Card from "./Card.js";

export default class Page extends ComponentImp {
  template(): string {
    return `<section data-component="page__container">
              <article class="" data-component="card1"></article>
              <article class="" data-component="card2"></article>
            </section>`;
  }

  mounted(): void {
    const $card = this.$target.querySelector(
      '[data-component="card1"]'
    ) as Element;
    const $card2 = this.$target.querySelector(
      '[data-component="card2"]'
    ) as Element;

    new Card($card);
    new Card($card2);
  }
}
