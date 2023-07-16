import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="context-menu"
export default class extends Controller {
  static targets = ["menu", "editLink", "deleteLink", "showLink"];
  
  // This is called when the controller is connected to the DOM
  // Here, we bind the hideMenu method to this instance and add event listeners
  connect() {
    this.hideMenu = this.hideMenu.bind(this);
    document.addEventListener("click", this.hideMenu);
    // document.addEventListener("scroll", this.hideMenu);
  }

  // This is called when the controller is disconnected from the DOM
  // Here, we remove the click event listener
  disconnect() {
    document.removeEventListener("click", this.hideMenu);
    document.removeEventListener("scroll", this.hideMenu);
  }

  // This method handles opening of the context menu
  // It prevents the default and propagation of the click event,
  // gets the todoId from the clicked element, updates link targets,
  // toggles visibility of menu options, positions the menu and shows it
  open(event) {
    event.preventDefault();
    event.stopPropagation();

    let clickedElement = event.target;
    let todoId = this.getTodoId(clickedElement);

    if (todoId) {
      this.prepareMenuForTodoItem(todoId);
    } else {
      this.hideMenuOptions();
    }

    this.positionMenu(event);
    this.menuTarget.classList.remove("hidden");
  }
}
