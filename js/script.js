const cells = document.querySelectorAll('.cell');
let turn=0;
const cellSign=[];

var bluePoints=0;
var redPoints=0;

showInfo(`\u00C8 il turno di 'X'`);
showPoints();

for(let i=0;i<cells.length;i++){
    cells[i].addEventListener('click', function(){
        if(cellSign[i]){
           showInfo(`Questa cella è già occupata da: '${cellSign[i]}'`)
            return;
        }
        if(turn%2===0)
            sign='X';
        else
            sign='O';
        
        showInfo(`\u00C8 il turno di '${sign=='X'? 'O' : 'X'}'`);
        if(sign=='X')
            cells[i].classList.add('blue');
        else
            cells[i].classList.add('red');
        cells[i].innerText=sign;
        cellSign[i]=sign;
        turn++;
        console.table(cellSign);
        if(checkVictory()){
            if(sign=='X')
                bluePoints++;
            else
                redPoints++;
            showAlert(`'${sign}': Ha vinto!`);
            showPoints();
        }else if(turn===9){
            showAlert('Pareggio!');
        }
    })
}

function checkVictory(){
    const winComb=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0;i<winComb.length;i++){
        const comb=winComb[i];
        const a=comb[0];
        const b=comb[1];
        const c=comb[2];
        if(cellSign[a] && cellSign[a] === cellSign[b] && cellSign[b] === cellSign[c])
            return true;
    }
    return false;
}

function showAlert(message){
    const tableEl=document.querySelector('.table');
    const gameAlertArea= document.createElement('div');
    gameAlertArea.classList.add('gameAlertArea')
    const alertMsg=`
    <div class="gameAlert">
        ${message}
        <a onclick="init()">Restart</a>
    </div>
    `;
    gameAlertArea.innerHTML=alertMsg;
    tableEl.appendChild(gameAlertArea);
}
function showInfo(message){
    const gameTurn=document.getElementById('turn');
    gameTurn.innerText=message;
}

function init(){
    const tableEl=document.querySelector('.table');
    turn=0;
    for(let i=0;i<cells.length;i++){
        if(cellSign[i]=='X')
            cells[i].classList.remove('blue');
        else
            cells[i].classList.remove('red');
        cellSign[i]=cells[i].innerText='';
        
    }
    tableEl.removeChild(tableEl.lastChild);
    showInfo(`\u00C8 il turno di 'X'`);
}
function showPoints(){
    const bluePointsEl=document.getElementById('bluePoints');
    const redPointsEl=document.getElementById('redPoints');
    bluePointsEl.innerText=bluePoints;
    redPointsEl.innerText=redPoints;
}