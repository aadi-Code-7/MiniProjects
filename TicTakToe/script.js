let boxes = document.querySelectorAll(".btn-box");
let reset = document.querySelector(".reset-btn");
let msgContainer = document.querySelector(".winner");
let msg = document.querySelector("#msg");

let turnO = true;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
};

const disableBox = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner = () => {
    for(pattern of winPattern){
        let post1 = boxes[pattern[0]].innerText;
        let post2 = boxes[pattern[1]].innerText;
        let post3 = boxes[pattern[2]].innerText;

        if(post1 != '' && post2 != '' && post3 != ''){
            if(post1 === post2 && post2 === post3){
                msg.innerText = `Winner of game is ${post1}`;
                msgContainer.classList.remove("hide");
                disableBox();
            }
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
            checkWinner();
        }else{
            box.innerText = "X";
            turnO = true;
            checkWinner();
        }
        box.disabled = true;
    });
});

reset.addEventListener("click", resetGame);