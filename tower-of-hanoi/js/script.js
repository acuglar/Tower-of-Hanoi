const form = document.querySelector('form')
const columnStart = document.querySelector('[data-columns="start"]')

const log = (...values) => console.log(...values)

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
  columnStart.replaceChildren(columnStart.firstElementChild)

  for (let i = 1; i <= selectedDisks; i++) {
    const disk = document.createElement('div')
    disk.style.background = `linear-gradient(to right, ${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
    disk.style.width = `${i / selectedDisks * 100}%`
    disk.className = 'disk'
    disk.draggable = true
    columnStart.append(disk)
  }
}

const initGame = ((selectedDisks) => {
  if (!(columnStart.childElementCount - 1)) {
    selectedDisks = 3

    return mountGame(selectedDisks)
  }
})()


form.addEventListener('submit', e => {
  e.preventDefault()

  const selectedOption = e.target.disksNumber
  const selectedDisks = e.target.disksNumber.value

  if (!Number(selectedDisks)) {
    return
  }
  selectedOption.firstElementChild.selected = true

  mountGame(selectedDisks)
})

document.addEventListener('dragstart', (e) => {
  const dragged = e.target
  setTimeout(() => {
    dragged.className = 'invisible'
  }, 0)
})