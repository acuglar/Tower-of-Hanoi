const gameContainer = document.querySelector('main')
const gameSelected = document.querySelector('nav > ul')
const gameTitle = document.querySelector('main > h1')
const game = document.querySelector('iframe')
const expandIcon = document.querySelector('i')

gameSelected.addEventListener('click', async e => {
  if (e.target.matches('li')) {
    // const gameAnchor = e.target.parentElement
    const gameTarget = e.target.getAttribute('target')

    gameTitle.textContent = e.target.textContent
    game.setAttribute('src', `./${gameTarget}/index.html`)
    game.setAttribute('name', `${gameTarget}`)
  }
})

expandIcon.addEventListener('click', () => {
  game.requestFullscreen()
})

