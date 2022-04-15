const form = document.querySelector('form')
const column = document.querySelector('[data-columns="start"]')

let selectedDisks = 3

form.addEventListener('submit', e => {
  e.preventDefault()
  selectedDisks = e.target.disksNumber.value

  for (let i = 0; i < selectedDisks; i++) {
    const disk = document.createElement('div')
    disk.style.background = 'linear-gradient(to right, #d7b889, #b27315, #966f33)'
    disk.style.width = `${i * 10}%`
    disk.style.height = '40px';
    disk.style.zIndex = '999'
    column.append(disk)
  }
})


const colors = {
  1: ['#c595f1', '#8A2BE2', '#6820aa'],
  2: ['#ef9280', '#DF2500', '#a71c00'],
  3: ['#ffae60', '#FF7E00', '#bf5f00'],
  4: ['#fde6f3', '#FBCCE7', '#dcb3ca'],
  5: ['#f3f380', '#E6E600', '#adad00'],
  6: ['#e4fff2', '#C9FFE5', '#97bfac'],
  7: ['#c0ffd5', '#70df95', '#509f6a'],
  8: ['#80dbf5', '#00b7eb', '#007293'],
}