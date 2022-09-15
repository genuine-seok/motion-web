import ComponentImp from "./core/Component.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Page from "./components/Page.js";
import Popup from "./components/Popup.js";
export default class App extends ComponentImp {
    template() {
        return `
        <header data-component="header"></header>
        <section class="popup" data-component="popup"></section>
        <article data-component="page"></article>
        <footer data-component="footer"></footer>
    `;
    }
    mounted() {
        const $page = this.$target.querySelector('[data-component="page"]');
        const $popup = this.$target.querySelector('[data-component="popup"]');
        const $header = this.$target.querySelector('[data-component="header"]');
        const $footer = this.$target.querySelector('[data-component="footer"]');
        const $Page = new Page($page);
        const $Popup = new Popup($popup, { $Page });
        new Header($header, { $Popup });
        new Footer($footer);
    }
}
