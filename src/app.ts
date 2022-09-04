import ComponentImp from "./core/Component.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Page from "./components/Page.js";
import Popup from "./components/Popup.js";

export default class App extends ComponentImp {
  template() {
    return `
        <section class="popup" data-component="popup"></section>
        <header data-component="header"></header>
        <article data-component="page"></article>
        <footer data-component="footer"></footer>
    `;
  }
  mounted() {
    const $popup = this.$target.querySelector(
      '[data-component="popup"]'
    ) as Element;
    const $header = this.$target.querySelector(
      '[data-component="header"]'
    ) as Element;
    const $page = this.$target.querySelector(
      '[data-component="page"]'
    ) as Element;
    const $footer = this.$target.querySelector(
      '[data-component="footer"]'
    ) as Element;

    new Popup($popup);
    new Header($header);
    new Page($page);
    new Footer($footer);
  }

  setEvent(): void {
    this.addEvent("click", "button", (e: Event) => {
      const target = e.target as Element;
      console.log(target.id);

      const $popup = document.querySelector('[data-component="popup"]');
      // console.log($popup);
      $popup?.classList.toggle("active");
    });
  }
}
