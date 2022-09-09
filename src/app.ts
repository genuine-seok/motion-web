import ComponentImp from "./core/Component.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Page from "./components/Page.js";
import Popup, { ButtonId } from "./components/Popup.js";

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
    const $page = this.$target.querySelector(
      '[data-component="page"]'
    ) as Element;
    const $popup = this.$target.querySelector(
      '[data-component="popup"]'
    ) as Element;
    const $header = this.$target.querySelector(
      '[data-component="header"]'
    ) as Element;
    const $footer = this.$target.querySelector(
      '[data-component="footer"]'
    ) as Element;

    const $Page = new Page($page);
    const $Popup = new Popup($popup, { $Page });
    new Header($header, { $Popup });
    new Footer($footer);
  }

  // FIX : 버튼을 클릭할 때마다 새로운 팝업을 생성하니, 버튼을 클릭할때마다
  // 새로운 팝업이 생성된채로 존재해서 나중에는 confirm 버튼 클릭시 여러개의 팝업이
  // 해당 이벤트에 반응하는 문제가 발생한다

  // 따라서 app 내부에는 한개의 팝업을 존재하게 두고,
  // 팝업 내부에 팝업의 타입에 관한 meta data를 전달할 수 있는 메서드를 구현해서,
  // 버튼 클릭시마다 팝업의 해당 메서드를 이용해 버튼 타입을 생성해야하는 팝업 타입 인자로 전달한다
  // 전달받은 props를 전달받아 Popup은 내부의 $state를 업데이트하고
  // 이를 기준으로 하위 요소들을 동적으로 렌더링한다
  // setEvent(): void {
  //   this.addEvent("click", ".button--header", (e: Event) => {
  //     const target = e.target as Element;
  //     const { id } = target;
  //     const $popup = this.$target.querySelector(".popup--body") as Element;
  //     const $popupContainer = this.$target.querySelector(".popup") as Element;
  //     new Popup($popup, {
  //       id,
  //       addNewCard: this.addNewCard.bind(this),
  //       checkAppState: this.checkAppState.bind(this),
  //     });
  //     $popupContainer.classList.add("active");
  //   });
  // }
}
