document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('download')
  const resume = document.getElementById('resume')

  if (button && resume) {
    button.addEventListener('click', () => {
      const clone = resume.cloneNode(true)
      clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'))

      const wrapper = document.createElement('div')
      wrapper.style.position = 'absolute'
      wrapper.style.left = '-9999px'
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      html2pdf()
        .set({
          margin: 0.5,
          filename: 'resume.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4' }
        })
        .from(clone)
        .save()
        .then(() => wrapper.remove())
    })

    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span')
      ripple.classList.add('ripple')
      const rect = this.getBoundingClientRect()
      ripple.style.left = `${e.clientX - rect.left}px`
      ripple.style.top = `${e.clientY - rect.top}px`
      ripple.style.width = ripple.style.height = '100px'
      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })
  }
})
