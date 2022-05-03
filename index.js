const gameContainer = document.querySelector('main')
const gameSelected = document.querySelector('nav > ul')
const gameTitle = document.querySelector('[data-font]')
const game = document.querySelector('iframe')
const expandIcon = document.querySelector('i')

gameSelected.addEventListener('click', async e => {
  if (e.target.matches('li')) {
    const gameTarget = e.target.getAttribute('target')

    gameTitle.textContent = e.target.textContent
    gameTitle.setAttribute('data-font', `${gameTarget}`)
    game.setAttribute('src', `./${gameTarget}/index.html`)
    game.setAttribute('name', `${gameTarget}`)
  }
})

expandIcon.addEventListener('click', () => {
  game.requestFullscreen()
})

