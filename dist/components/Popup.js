import ComponentImp from "../core/Component.js";
export default class Popup extends ComponentImp {
    template() {
        return `
    <div class="popup--container">
        <div class="popup--body">
            <div class="popup--text--container">
                <h3>기본 블록</h3>
            </div>
            <div class="popup--input--container">
                <label for="title" />제목</label>
                <input type="text" id="title" />
                <label for="description" />내용</label>
                <input type="text" id="description" />
            </div>
            <div class="popup--button--container">
                <button class="button__confirm">확인</button>
                <button class="button__cancel">취소</button>
            </div>
        </div>
    </div>
        `;
    }
}
