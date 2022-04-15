const form = document.querySelector('form')
const column = document.querySelector('[data-columns="start"]')

let selectedDisks = 3

form.addEventListener('submit', e => {
  e.preventDefault()
  selectedDisks = e.target.disksNumber.value

  for (let i = 1; i <= selectedDisks; i++) {
    const disk = document.createElement('div')
    disk.style.background = `linear-gradient(to right, ${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
    disk.style.width = `${i / selectedDisks * 100}%`
    disk.style.height = '10%';
    column.append(disk)
  }
})


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