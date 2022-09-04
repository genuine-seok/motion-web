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
        const $popup = this.$target.querySelector('[data-component="popup"]');
        const $header = this.$target.querySelector('[data-component="header"]');
        const $page = this.$target.querySelector('[data-component="page"]');
        const $footer = this.$target.querySelector('[data-component="footer"]');
        new Popup($popup);
        new Header($header);
        new Page($page);
        new Footer($footer);
    }
    setEvent() {
        this.addEvent("click", "button", (e) => {
            const target = e.target;
            console.log(target.id);
            const $popup = document.querySelector('[data-component="popup"]');
            $popup === null || $popup === void 0 ? void 0 : $popup.classList.toggle("active");
        });
    }
}
