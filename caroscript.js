let heightCaro = parseInt(prompt("Nhập vào chiều cao bàn cờ caro"));
let widthCaro = parseInt(prompt("Nhập vào chiều dài bàn cờ caro"));
let player1Name = prompt("Nhập tên cờ thủ số 1");
let player2Name = prompt("Nhập tên cờ thủ số 2");
let turnPlayer = true;
let lastPosition = [];
caroTable = [];
let arrayLinePlayer = [];
let arrayPosWinPlayer1 = [];
let arrayPosWinPlayer2 = [];
let gameFinished = false;

//create array 2d with heightCaro input;
for (let x = 0; x < heightCaro; x++) {
      caroTable[x] = new Array();
}
//add name 2 player
document.getElementById("player1Name").innerHTML = player1Name;
document.getElementById("player2Name").innerHTML = player2Name;

//create caro table
for (let x = 0; x < heightCaro; x++) {
      let stringPrint = "<tr>";
      for (let y = 0; y < widthCaro; y++) {
            stringPrint += `<td id="caroTable_${x}_${y}" style="border: 1px solid black; width: 30px; height: 30px; text-align:center;font-weight:bold;" onclick="changeOtoX(${x},${y})">&nbsp;&nbsp;</td>`;
      }
      document.getElementById("mainCaro").innerHTML += `${stringPrint}</tr>`;
}

//mark signal of 2 player when play games
function changeOtoX(x,y) {
      if (document.getElementById("btnPlay").innerHTML === "Reset" && !gameFinished) {
            if (turnPlayer && document.getElementById(`caroTable_${x}_${y}`).innerHTML === "&nbsp;&nbsp;") {
                  document.getElementById(`caroTable_${x}_${y}`).innerHTML = "X";
                  turnPlayer = !turnPlayer;
                  lastPosition[0] = x;
                  lastPosition[1] = y;
            } else if (document.getElementById(`caroTable_${x}_${y}`).innerHTML !== "&nbsp;&nbsp;") {
                  lastPosition = [];
            } else {
                  document.getElementById(`caroTable_${x}_${y}`).innerHTML = "O";
                  turnPlayer = !turnPlayer;
                  lastPosition[0] = x;
                  lastPosition[1] = y;
            }
      }
      if (lastPosition.length !== 0 && !gameFinished) {checkLine()};
}

//add function to btnPlayer button 
function addEventBtnPlay(typeMenu) {
      if (typeMenu === "Play game" && (document.getElementById("player1").checked || document.getElementById("player2").checked)) {
            document.getElementById("btnPlay").innerHTML = "Reset";
            turnPlayer = true;
            if (document.getElementById("player2").checked) {
                  turnPlayer = false;
            }
      } else if (typeMenu === "Play game" && (!document.getElementById("player1").checked || !document.getElementById("player2").checked)) {
            alert("Hãy lựa chọn người đi trước");
      }

      if (typeMenu === "Reset") {
            document.getElementById("btnPlay").innerHTML = "Play game";
            document.getElementById("player1").checked = false;
            document.getElementById("player2").checked = false;
            gameFinished = false;
            for (let x = 0; x < heightCaro; x++) {
                  for (let y = 0; y < widthCaro; y++) {
                        document.getElementById(`caroTable_${x}_${y}`).innerHTML = "&nbsp;&nbsp;";
                        document.getElementById(`caroTable_${x}_${y}`).style.color = "black";
                  }
            }
      }

}

//check the winner
function checkLine(x,y) {
      //check horizontal line
      for (let j = 0; j < widthCaro; j++) {
            arrayLinePlayer[j] = {value: document.getElementById(`caroTable_${lastPosition[0]}_${j}`).innerHTML, posX: lastPosition[0], posY: j};
      }
      checkWinner();
      //check vertical line
      for (let i = 0; i < heightCaro; i++) {
            arrayLinePlayer[i] = {value: document.getElementById(`caroTable_${i}_${lastPosition[1]}`).innerHTML, posX: i, posY: lastPosition[1]};
      }
      checkWinner();
      //check main diagonal
      if (lastPosition[0] - lastPosition[1] > 0) {
            for (let i = lastPosition[0] - lastPosition[1], j = 0, k = 0; i < heightCaro && j < widthCaro; i++, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
      } else if (lastPosition[0] - lastPosition[1] < 0) {
            for (let i = 0, j = lastPosition[1] - lastPosition[0], k = 0; i < heightCaro && j < widthCaro; i++, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
      } else if (lastPosition[0] === lastPosition[1]) {
            for (let i = 0, j = 0, k = 0; i < heightCaro && j < widthCaro; i++, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
      }
      checkWinner();
      //check sub diagonal
      if ((heightCaro - 1 - lastPosition[0]) < lastPosition[1]) {
            for (let i = heightCaro - 1, j = lastPosition[1] - (heightCaro - 1 - lastPosition[0]), k = 0; i > 0 && j < widthCaro; i--, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
      } else if ((heightCaro - 1 - lastPosition[0]) > lastPosition[1]) {
            for (let i = lastPosition[0] + lastPosition[1], j = 0, k = 0; i > 0 && j < widthCaro; i--, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
            console.log(arrayLinePlayer);
      } else if ((heightCaro - 1 - lastPosition[0]) === lastPosition[1]) {
            for (let i = heightCaro - 1, j = 0, k = 0; i > 0 && j < widthCaro; i--, j++, k++) {
                  arrayLinePlayer[k] = {value: document.getElementById(`caroTable_${i}_${j}`).innerHTML, posX: i, posY: j};
            }
      }
      checkWinner();
      

}

function checkWinner() {
      arrayLinePlayer.forEach(addWinArray);
      arrayLinePlayer= [];
}

function addWinArray(item,index) {
      if (item.value === "X") {
            arrayPosWinPlayer2 = []
            arrayPosWinPlayer1.push(item);
            if (arrayPosWinPlayer1.length === 5) {
                  alert(`${player1Name} thắng rồi`);
                  for (let i = 0; i < arrayPosWinPlayer1.length; i++) {
                        document.getElementById(`caroTable_${arrayPosWinPlayer1[i].posX}_${arrayPosWinPlayer1[i].posY}`).style.color = "red";
                  }
                  arrayPosWinPlayer1 = [];
                  gameFinished = true;
            }
      } else if (item.value === "O") {
            arrayPosWinPlayer1 = [];
            arrayPosWinPlayer2.push(item);
            
            if (arrayPosWinPlayer2.length === 5) {
                  console.log(arrayPosWinPlayer2);
                  alert(`${player2Name} thắng rồi`);
                  for (let i = 0; i < arrayPosWinPlayer2.length; i++) {
                        document.getElementById(`caroTable_${arrayPosWinPlayer2[i].posX}_${arrayPosWinPlayer2[i].posY}`).style.color = "red";
                  }
                  arrayPosWinPlayer2 = [];
                  gameFinished = true;
            }
      } else {
            arrayPosWinPlayer1 = arrayPosWinPlayer2 = [];
      }
}