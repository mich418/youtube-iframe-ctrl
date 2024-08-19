import YouTubeIFrameCtrl from './YouTubeIFrameCtrl.js'
const youtubeIFrame = document.getElementById('youtube-iframe')
const youTubeIFrameCtrl = new YouTubeIFrameCtrl(youtubeIFrame)

const commandSelect = document.getElementById('commands')
const commandRunButton = document.getElementById('run-command')

commandSelect.addEventListener('change', () => {
  const selectedValueElement = commandSelect.querySelector('option:checked')
  const command = selectedValueElement.value

  if (!selectedValueElement) return

  const commandArgsWrapper = document.getElementById('command-args')
  commandArgsWrapper.innerHTML = ''
  commandRunButton.disabled = false

  if (!selectedValueElement.disabled) {
    const argsJson = selectedValueElement.getAttribute('data-args')

    if (argsJson) {
      const argsData = JSON.parse(argsJson)

      for  (const input of argsData) {
        const inputElement = document.createElement('input')
        inputElement.type = input.type || 'text'
        inputElement.placeholder = input.placeholder || ''
        inputElement.classList.add('command-argument-input')
        commandArgsWrapper.appendChild(inputElement)
      }
    }

    const examples = document.querySelectorAll('[data-command]')

    for (const example of examples) {
      example.style.display = 'none'
    }

    const selectedCommandExample = document.querySelector(`[data-command="${command}"]`)
    
    if (selectedCommandExample) {
      selectedCommandExample.style.display = 'block'
    } else {
      document.querySelector('[data-command="disabled"]').style.display = 'block'
    }
  } else {
    commandRunButton.disabled = true
  }
})

commandRunButton.addEventListener('click', () => {
  if (!commandRunButton.disabled) {
    const selectedValueElement = commandSelect.querySelector('option:checked')

    if (selectedValueElement) {
      const command = selectedValueElement.value
      const commandArguments = []
      
      for (let argumentInput of Array.from(document.querySelectorAll('.command-argument-input'))) {
        commandArguments.push(argumentInput.value)
      }

      youTubeIFrameCtrl.command(command, commandArguments)
    }
  }
})
