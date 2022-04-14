const gameContainer = document.querySelector('main')
const gameSelected = document.querySelector('nav > ul')
const gameTitle = document.querySelector('main > h1')

gameSelected.addEventListener('click', e => {
  if (e.target.matches('li')) {
    gameTitle.textContent = e.target.textContent
  }
  console.log(e.target, e.target.matches('a'))
})