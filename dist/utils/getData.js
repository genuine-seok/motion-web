const dataset = {
    blockList: [
        {
            type: "Note",
            title: "✨ Welcome to Motion demo ✨",
            input: "이미지, 비디오, 할 일, 노트 블럭을 자유롭게 생성, 삭제, 이동할 수 있습니다.",
        },
        {
            type: "Note",
            title: "노트 블럭 📝",
            input: "마우스 드래그 & 드롭으로 블럭 위치를 변경할 수 있습니다.",
        },
        {
            type: "Task",
            title: "할 일 블럭 ✅",
            input: "데모 기본 기능 사용해보기 🚀",
        },
        {
            type: "Video",
            title: "영상 블럭 🎥",
            input: "https://youtu.be/0GxM9_qHCFo",
        },
        {
            type: "Image",
            title: "사진 블럭 🌄",
            input: "https://images.mypetlife.co.kr/content/uploads/2019/05/09153849/dog-2773951_960_720-780x470.jpg",
        },
    ],
};
export function getDefaultData() {
    return dataset;
}
