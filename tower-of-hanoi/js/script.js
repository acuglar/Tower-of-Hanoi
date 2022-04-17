const form = document.querySelector('form')
const columnStart = document.querySelector('[data-columns="start"]')
const columnOffset = document.querySelector('[data-columns="offset"]')
const columnEnd = document.querySelector('[data-columns="end"]')
const columnsContainer = document.querySelector('.hanoi-container-columns')
const columns = document.querySelectorAll('.hanoi-columns')
const column = document.querySelector('.column')

// const console.log = (...values) => console.console.log(...values)

const colors = {
  1: ['#c595f1', '#8A2BE2', '#6820aa'],
  2: ['#ef9280', '#DF2500', '#a71c00'],
  3: ['#ffae60', '#FF7E00', '#bf5f00'],
  4: ['#ffd760', '#FFBF00', '#bf8f00'],
  5: ['#ffdf80', '#E6E600', '#adad00'],
  6: ['#c0ffd5', '#70df95', '#509f6a'],
  7: ['#c0f5ff', '#80EAFF', '#70cddf'],
  8: ['#e4fff2', '#C9FFE5', '#97bfac'],
}

const mountGame = (selectedDisks) => {
  for (let i = selectedDisks; i >= 1; i--) {
    const disk = document.createElement('div')
    disk.style.background = `linear-gradient(to right, ${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
    disk.style.width = `${i / selectedDisks * 100}%`
    disk.className = 'disk'
    disk.dataset.number = i
    columnStart.append(disk)
  }
}

const initGame = ((selectedDisks) => {
  if (!(columnStart.childElementCount - 1)) {
    selectedDisks = 3
    return mountGame(selectedDisks)
  }
})()

const resetGame = () => {
  const disks = document.querySelectorAll('.disk')
  disks.forEach(disk => disk.remove())
}

form.addEventListener('submit', e => {
  e.preventDefault()

  resetGame()

  const selectedOption = e.target.disksNumber
  const selectedDisks = e.target.disksNumber.value

  if (!Number(selectedDisks)) {
    return
  }
  selectedOption.firstElementChild.selected = true

  mountGame(selectedDisks)
  checkDraggable()
})

let dragged

columnsContainer.addEventListener('dragstart', (e) => {
  const disks = document.querySelectorAll('.disk')

  dragged = e.target
  setTimeout(() => {
    dragged.classList.add('hidden')
  }, 0)
  checkDraggable()

})

const dragLeaveEvent = (e) => {
  e.target.firstElementChild.style.filter = ''
}

const dragOverEvent = (e) => {
  e.preventDefault()
  e.target.firstElementChild.style.filter = 'contrast(1.4)'
}

const dropEvent = (e) => {
  e.preventDefault()

  // console.log(dragged.dataset.number)

  // console.log(e.target.lastElementChild)
  dragged.parentElement.removeChild(dragged)
  e.target.appendChild(dragged)
  e.target.firstElementChild.style.filter = ''
}

const dragEndEvent = () => {
  // e.preventDefault()
  dragged.classList.remove('hidden')
}

columns.forEach(column => {
  column.addEventListener('dragover', dragOverEvent)
  column.addEventListener('drop', dropEvent)
  column.addEventListener('dragleave', dragLeaveEvent)
  column.addEventListener("dragend", dragEndEvent)
})