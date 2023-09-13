class App {
  constructor() {
    this.notes = []

    this.$placeholder = document.querySelector("#placeholder")
    this.$form = document.querySelector('#form')
    this.$noteTitle = document.querySelector("#note-title")
    this.$noteText = document.querySelector("#note-text")
    this.$formButtons = document.querySelector('#form-buttons')
    this.$notes = document.querySelector("#notes")
    this.$closeButton = document.querySelector("#form-close-button")

    this.addEventListeners()

  }

  addEventListeners() {
    document.body.addEventListener('click', (event) =>
    { this.handleFormClick(event) })

    this.$form.addEventListener('submit', event =>
    {
      event.preventDefault()
      const title = this.$noteTitle.value
      const text = this.$noteText.value
      const hasNote = title || text;
     
      if (hasNote) {
        this.addNote({title, text})
      }
  
    })

    this.$closeButton.addEventListener('click', event =>
    {
      event.stopPropagation()
      this.closeForm()
    }
    )
    
  }
  


  handleFormClick(y) {

const isFormClicked = this.$form.contains(y.target)

const title = this.$noteTitle.value
const text = this.$noteText.value
const hasNote = title || text;

if (isFormClicked) {
// open form
this.openForm();

} else if (hasNote) {
    this.addNote({title, text})
} else {
// close form
this.closeForm()
}
}

openForm() {
    this.$form.classList.add('form-open')
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';

}

closeForm() {
  this.$form.classList.remove('form-open')
  this.$noteTitle.style.display = "none";
  this.$formButtons.style.display = 'none';
  this.$noteTitle.value = ""
  this.$noteText.value = ""
}
// the note parameter in addNote(note) is an object with title and text as the arguments
// destructure the note parameter for addNote() 

addNote({title, text}) {
const newNote = {
  title,
  text,
  color: "white",
  id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
}
this.notes = [...this.notes, newNote];
this.displayNotes()
this.closeForm()
}

displayNotes() {
  const hasNotes = this.notes.length > 0

  this.$placeholder.style.display = hasNotes ? "none" : "flex"
  // c for copy since map copies from this.notes array
  this.$notes.innerHTML = this.notes.map(cOfNotes =>
    `
    <div style="background: ${cOfNotes.color}" class="note">
<div class="${cOfNotes.title && 'note-title'}">${cOfNotes.title}</div>
<div class="note-text">${cOfNotes.text}</div>
<div class="toolbar-container">
<div class="toolbar">
    <img class="toolbar-color" src="https://icon.now.sh/palette">
    <img class="toolbar-delete" src="https://icon.now.sh/delete">
      </div>
    </div>
</div>
    `
    ).join("")
}


}

new App()