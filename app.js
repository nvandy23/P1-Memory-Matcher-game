const start_screen =document.querySelector('.start--screen--container')
const start_button =document.querySelector('.start_button')
const cells = document.querySelectorAll('#cell')
const game_board = document.querySelector('.game--board--container')
const game_board1 =document.querySelector('.game--board--container_1')
const player_score =document.querySelector('.player--score') 
const total_matches =document.querySelector('.total--matches')
let timer =document.querySelector('.timer')
let match_attempts =document.querySelector('.match--attempts')
let score_container =document.querySelector('.score--container')
let end_game_text =document.querySelector('.end--game--text')
let reset_button =document.querySelector('.reset--button')
let endGame_screen =document.querySelector('.endGame_screen')
let choices_selected = []
let choices_won =[]
let score =0
let matches = 0
let match_attempt =0 
let countDown =100
let times

start_button.addEventListener('click',()=>{
start_screen.style.visibility ='none'
game_board.style.visibility = 'visible'
start_screen.style.display ='none'
score_container.style.visibility ='visible'
count()
})


function count(){
   times =setInterval(function(){
    timer.textContent = countDown
  countDown --;
  if(countDown<0) {
    clearInterval(times)
    gameOver()
  }
   }, 1000)

}



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


function checkforMatches() {
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
     player_score.textContent = ` ${score+=50}`
     total_matches.textContent = ` ${matches+=1}`
}


else if (choices_selected.length ===2 && choices_selected[0].innerText !== choices_selected[1].innerText){
  if(`${score}` >0) {
    player_score.textContent = ` ${score-=10}`
  }
  
  match_attempts.textContent =`${match_attempt+=1}`
  removeClicks()
  for(let match of choices_selected){
    setTimeout(()=> {
    match.style.backgroundColor ='black'
    let pumpkin =match.innerText = "🎃"
    match.textContent =pumpkin
    addClicks()
    },"1000")
  
     }  
    choices_selected=[]
  
}
gameOver()
checkWinConditions()

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

 function removeClicks(){
  console.log('removeClicks')
  cells.forEach((cell)=>{
    cell.removeEventListener('click',listener)
  })
}

addClicks()
shuffleSelections(cells)


function checkWinConditions() {
  if(choices_won.length ===8) {
   game_board1.style.display ='none'
   score_container.style.display ='none'
   endGame_screen.style.display ='flex'
   end_game_text.style.display = 'flex'
   reset_button.style.display ='flex'
   if(`${score}` >1000)
   end_game_text.textContent = `Wow! Amazing job! Your score was ${score}! Want to try again and try to top it?`
   else if(`${score}`<1000 && `${score}`>=700){
    end_game_text.textContent =`Very nice! Your score was ${score}. Want to try again?`
   }
   else if (`${score}`> 700 && `${score}`<=400){
    end_game_text.textContent =`Hey not bad! Your score was ${score}. Want to try again?`
   }
else {
  end_game_text.textContent =`Ehh not bad, Your score was ${score}. Want to try again?`
}
clearInterval(times)
   }
   }

 function gameOver() {
  console.log(timer.textContent)
  console.log(match_attempts.textContent)
  if( timer.textContent <= '0' || (match_attempts.textContent === '25')) {
    game_board1.style.display ='none'
    score_container.style.display ='none'
    endGame_screen.style.display ='flex'
    end_game_text.style.display = 'flex'
    reset_button.style.display ='flex'
    if(timer.textContent <= '0'){
      end_game_text.textContent = `Ahhh! Game over! You ran out of time!  Would you like to try again?`
    }
    else if(match_attempts.textContent === '25'){
      end_game_text.textContent = `You ran out of match attempts! Would you like to try again?`
      clearInterval(times)
    }
  }

 }


function hitReset(){
  reset_button.addEventListener('click',()=>{
    game_board1.style.display = 'grid'
    score_container.style.display = 'flex'
   endGame_screen.style.display ='none'
   location.reload()
   clearInterval(times)
  console.log(choices_won)
  
  })
}


hitReset()

