
const cells = document.querySelectorAll('#cell')
const game_board = document.querySelector('.game--board--container')
const player_score =document.querySelector('.player--score') 
const total_matches =document.querySelector('.total--matches')
let timer =document.querySelector('.timer')
let match_attempts =document.querySelector('.match--attempts')
let choices_selected = []
let choices_won =[]
let score =0
let matches = 0
let match_attempt =0 
let countDown =100
let emojis =["👻","👻","🍫","🍫","🦇",'🦇',"👺","👺","🕸","🕸","🧟‍♂️","🧟‍♂️","🍬","🍬","🏚","🏚"]



function count(){
  let times =setInterval(function(){
    timer.textContent = countDown
  countDown --;
  if(countDown<0) {
    clearInterval(times)
  }
   }, 1000)

  
}
count()

function shuffleSelections(nodeList) {
  const array = Array.from(nodeList);
  array.sort(() => Math.random() - 0.5)
  array.forEach(item => {
  game_board.appendChild(item)
  item.innerText = "🎃"
  item.style.textAlign ='center'
  item.style.marginTop = "20px";
  item.style.fontSize ='80px'
player_score.textContent = `${score}`
 total_matches.textContent = `${matches}`
 match_attempts.textContent =`${match_attempt}`


  }) 
}


async function checkforMatches() {
  if(choices_selected.length ===2 && choices_selected[0].classList.value === choices_selected[1].classList.value){
    for(let match of choices_selected){
      match.innerText = "🎃"
      match.style.backgroundColor ='black'
    }
      choices_selected = []
  }

else if(choices_selected.length ===2 && choices_selected[0].innerText === choices_selected[1].innerText && choices_selected[0].classList.value !== choices_selected[1].classList.value){
    choices_won.push(choices_selected)
    choices_selected =[]
     player_score.textContent = ` ${score+=100}`
     total_matches.textContent = ` ${matches+=1}`
}


else if (choices_selected.length ===2 && choices_selected[0].innerText !== choices_selected[1].innerText){
  player_score.textContent = ` ${score-=10}`
  match_attempts.textContent =`${match_attempt+=1}`
  await removeClicks()
  for(let match of choices_selected){
    setTimeout(()=> {
    match.style.backgroundColor ='black'
    let pumpkin =match.innerText = "🎃"
    match.textContent =pumpkin
    addClicks()
    },"1000")
  
     }  
    choices_selected=[]
   // addClicks()
  
}

} 
function listener(evt){
  choices_selected.push(evt.target)
  evt.target.classList.remove('cell')
  evt.target.style.backgroundColor ='#c96704'
  evt.target.textContent = evt.target.dataset.value
  checkforMatches()
  console.log(evt.target.dataset)
}
function addClicks() {
  cells.forEach(cell=>{
  cell.addEventListener('click',listener)
  })}

async function removeClicks(){
  console.log('removeClicks')
  cells.forEach((cell)=>{
    cell.removeEventListener('click',listener)
      //choices_selected.push(evt.target)
      //cell.classList.remove('cell')
      //cell.style.backgroundColor ='#c96704'
      //cell.textContent = evt.target.dataset.value

  })
}

addClicks()
shuffleSelections(cells)


function checkWinConditions() {
  if(choices_won.length ===8) {
   game_board.style.display ='none'
  }
}
checkWinConditions()