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
    // const $popup = this.$target.querySelector(
    //   '[data-component="popup"]'
    // ) as Element;
    const $header = this.$target.querySelector(
      '[data-component="header"]'
    ) as Element;
    const $page = this.$target.querySelector(
      '[data-component="page"]'
    ) as Element;
    const $footer = this.$target.querySelector(
      '[data-component="footer"]'
    ) as Element;

    // new Popup($popup);
    new Header($header);
    new Page($page);
    new Footer($footer);
  }

  setEvent(): void {
    this.addEvent("click", ".button--header", (e: Event) => {
      const target = e.target as Element;
      const { id } = target;
      const $popup = this.$target.querySelector(
        '[data-component="popup"]'
      ) as Element;

      //TODO: 팝업을 새로 만들지 말고, Popup에 id를 전달할 수 있는 메서드를 구현해서
      // 클릭 이벤트 발생시 id를 전달하는 메서드를 호출해 Popup 내부에 전달한다.
      // 해당 메서드는 Popup의 내부 state를 업데이트하고, 인스턴스 내부적으로만 리렌더링한다.
      // popup--body 내부적으로만 리렌더링해야 transform에 대한 transition이 적용 가능함
      new Popup($popup, { id });
      $popup.classList.add("active");
    });
  }
}
