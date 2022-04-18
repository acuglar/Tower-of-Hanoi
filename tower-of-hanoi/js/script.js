const form = document.querySelector('.form-info')
const containerStart = document.querySelector('[data-columns="start"]')
const containerOffset = document.querySelector('[data-columns="offset"]')
const containerEnd = document.querySelector('[data-columns="end"]')
const hanoiContainer = document.querySelector('.hanoi-container-columns')
const disksContainer = document.querySelectorAll('.hanoi-columns')

const column = document.querySelector('.column')

let counter = 0

// const console.log = (...values) => console.console.log(...values)

const colors = {
  1: ['#c595f1', '#8A2BE2', '#6820aa'],
  2: ['#ef9280', '#DF2500', '#a71c00'],
  3: ['#ffae60', '#FF7E00', '#bf5f00'],
  4: ['#ffd760', '#FFBF00', '#bf8f00'],
  5: ['#ffff70', '#ffff00', '#b3b300'],
  6: ['#d4ff70', '#b3ff00', '#71a100'],
  7: ['#c0ffd5', '#70df95', '#509f6a'],
  8: ['#c0f5ff', '#80EAFF', '#58a1af'],
}

const mountGame = (selectedDisks) => {
  for (let i = selectedDisks; i >= 1; i--) {
    const disk = document.createElement('div')
    disk.style.background = `linear-gradient(to right, ${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
    disk.style.width = `${i / selectedDisks * 100}%`
    disk.className = 'disk'
    disk.dataset.number = i
    containerStart.append(disk)
  }
}

const setMinValue = (selectedDisks) => {
  const minMove = document.querySelector('[data-counter-min="form__counter-min"]')

  minMove.innerText = `${(2 ** selectedDisks - 1)}`
}

const initGame = ((selectedDisks) => {
  if (!(containerStart.childElementCount - 1)) {
    selectedDisks = 8
    mountGame(selectedDisks)
    setMinValue(selectedDisks)
  }
})()

const resetGame = () => {
  const disks = document.querySelectorAll('.disk')
  disks.forEach(disk => disk.remove())

  const winMessage = document.querySelector('.winner')
  winMessage.classList.add('hidden')

  const counter = document.querySelector('[data-counter-move="form__counter-move"]')

  counter.innerText = 0
}

const add = document.querySelector('.form__counter-btn.add')
const sub = document.querySelector('.form__counter-btn.sub')

add.addEventListener('click', e => {
  const selectedDisks = e.target.parentElement.parentElement.form__number.value

  if (selectedDisks < 8) {
    e.target.parentElement.parentElement.form__number.value++
  }
  console.log(selectedDisks);
})

sub.addEventListener('click', e => {
  const selectedDisks = e.target.parentElement.parentElement.form__number.value

  if (selectedDisks > 3) {
    e.target.parentElement.parentElement.form__number.value--
  }
})

form.addEventListener('click', e => {
  e.preventDefault()

  if (e.target.value === "Let's Play!") {
    resetGame()

    const selectedDisks = e.target.parentElement.form__number.value

    setMinValue(selectedDisks)
    mountGame(selectedDisks)
    checkDraggable()

    const disks = document.querySelectorAll('.disk')

    disks.forEach(disk => {
      disk.addEventListener('dragstart', dragStartEvent) /* When init drag item */
      disk.addEventListener('dragend', dragEndEvent)
    })
  }
})

const disks = document.querySelectorAll('.disk')

const checkDraggable = () => {
  const disks = document.querySelectorAll('.disk')

  disks.forEach(disk => {
    if (disk.parentElement.lastElementChild === disk) {
      disk.setAttribute('draggable', true)
      disk.classList.remove('undraggable')
    } else {
      disk.removeAttribute('draggable')
      disk.classList.add('undraggable')
    }
  })
}

checkDraggable()

const checkWinner = () => {
  const selectedDisks = document.querySelector('#form__number').value
  if (containerEnd.childElementCount - 1 == selectedDisks) {
    const winMessage = document.querySelector('.winner')
    winMessage.classList.remove('hidden')
  }
}

const dragStartEvent = (e) => {
  e.dataTransfer.setData('text/plain', e.target.dataset.number)
  console.log('DragStart', e)

  setTimeout(() => {
    e.target.classList.add('hidden')
  }, 0)
}

const dragOverEvent = (e) => {
  e.preventDefault()
  // console.log('DragOver', e)
  if (Array.from(e.target.classList).includes('hanoi-columns')) {
    e.target.firstElementChild.style.filter = 'contrast(1.4)'
  }
}

const dragLeaveEvent = (e) => {
  e.preventDefault()
  console.log('DragLeave', e.target.classList)

  if (Array.from(e.target.classList).includes('hanoi-columns')) {
    e.target.firstElementChild.style.filter = ''
  }
}

const dropEvent = (e) => {
  e.preventDefault()
  console.log('Drop', e)

  if (Array.from(e.target.classList).includes('hanoi-columns')) {
    e.target.firstElementChild.style.filter = ''
  }

  data = e.dataTransfer.getData('text')
  const diskTransfer = document.querySelector(`[data-number="${data}"]`)

  const isValid = e.target.childElementCount === 1 || data < e.target.lastElementChild.dataset.number
  if (isValid) {
    e.target.append(diskTransfer)
    checkDraggable()
    checkWinner()

    const counter = document.querySelector('[data-counter-move="form__counter-move"]')

    counter.innerText++
  }
}

const dragEndEvent = (e) => {
  console.log('End')
  e.target.classList.remove('hidden')
}

// Drag Events
disks.forEach(disk => {
  disk.addEventListener('dragstart', dragStartEvent) /* When init drag item */
  disk.addEventListener('dragend', dragEndEvent)
})

// Drop Events
disksContainer.forEach(container => {
  container.addEventListener('dragover', dragOverEvent) /* When over box */
  container.addEventListener('dragleave', dragLeaveEvent) /* When leave box on drag */
  container.addEventListener('drop', dropEvent) /* When drop item on box */
})