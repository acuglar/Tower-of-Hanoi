const form = document.querySelector('form')
const containerStart = document.querySelector('[data-columns="start"]')
const containerOffset = document.querySelector('[data-columns="offset"]')
const containerEnd = document.querySelector('[data-columns="end"]')
const hanoiContainer = document.querySelector('.hanoi-container-columns')
const disksContainer = document.querySelectorAll('.hanoi-columns')

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
    containerStart.append(disk)
  }
}

const initGame = ((selectedDisks) => {
  if (!(containerStart.childElementCount - 1)) {
    selectedDisks = 8
    mountGame(selectedDisks)
  }
})()

const resetGame = () => {
  const disks = document.querySelectorAll('.disk')
  disks.forEach(disk => disk.remove())
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

checkWin = (e) => {
  e.target.childElementCount
}