import ComponentImp from "../core/Component.js";
import Card from "./Card.js";
export default class Page extends ComponentImp {
    template() {
        return `<section data-component="page__container">
              <article class="" data-component="card1"></article>
              <article class="" data-component="card2"></article>
            </section>`;
    }
    mounted() {
        const $card = this.$target.querySelector('[data-component="card1"]');
        const $card2 = this.$target.querySelector('[data-component="card2"]');
        new Card($card);
        new Card($card2);
    }
}
