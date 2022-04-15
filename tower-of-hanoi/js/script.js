const form = document.querySelector('form')

let selectedDisks = 3

form.addEventListener('submit', e => {
  e.preventDefault()
  console.log(e.target.disksNumber.value)

  selectedDisks = e.target.disksNumber.value
})

