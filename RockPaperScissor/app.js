let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let user_score = document.querySelector("#userScore");
let comp_score = document.querySelector("#compScore");
let reset = document.querySelector("#reset-btn");


choices.forEach((choice) => {
    choice.addEventListener("click", () =>{
        const userId = choice.getAttribute("id");
        gameResult(userId);
    });
});

const genCompChoice = () => {
    let choices = ["rock", "paper", "scissor"];
    let index = Math.floor(Math.random() * 3);
    return choices[index];
}
const draw = () => {
    msg.innerText = "Match was draw. Play again.";
    msg.style.backgroundColor = "rgba(0, 90, 128, 1)";
}
const winner = (userWin,userChoice,compChoice) => {
    if(userWin){
        msg.innerText = `You Win. Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "Green";
        user_score.innerText = ++userScore;
    }else{
        msg.innerText = `Computer Win. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        comp_score.innerText = ++compScore;
    }
}
const gameResult = (userChoice) => {
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        draw();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            userWin = compChoice === "scissor" ? false : true;
        }else{
            userWin = compChoice === "rock" ? false : true;
        }
        winner(userWin,userChoice,compChoice);
    }   
}

const resetGame = () => {
    user_score.innerText = "0";
    comp_score.innerText = "0";
    userScore = 0;
    compScore = 0;
    msg.innerText = "Play Your Move"
}
reset.addEventListener("click", resetGame);