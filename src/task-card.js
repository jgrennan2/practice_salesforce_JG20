import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class TaskCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        .card {
          background-color: white;
          height: 10vh;
          color: gray;
          border-radius: 5px;
          margin: 10px;
          margin-bottom: 15px;
          padding: 10px;
          position: relative;
          box-shadow: 5px 5px 10px 4px rgba(0,0,0,0.5);
          transition: height .5s;
        }
        
        .card:hover {
          height: auto;
        }
        
        .taskDescription {
          font-Family: 'Arvo', Serif;
          font-size: .8em;
          margin: 10px;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0 linear 300ms, opacity .7s .5s ; 
        }
        
        .card:hover .taskDescription{
          visibility: visible;
          opacity: 1; 
        }
        
        h3 {
          font-size: 1.15em;
          font-weight: bold;
        }
        
        .title, .date {
          text-align: left;
        }
        
        .name {
          color: white;
          display: inline-block;
          padding: 3px 15px;
          min-width: 50px;
          text-align: center;
          text-transform: uppercase;
          font-size: .7em;
          position: absolute;
          top: -10px;
          left: 10px;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          font-Family: 'Arvo', Serif;
          border-radius: 2px;
        }
        
        .turquoise {
          background: #07BEB8;
        }
        
        .orange {
          background: #F3CA40;
        }
        
        .green {
          background: #21cf5b
        }
        
        .blue {
          background: hsl(239, 82%, 44%)
        }

        .btn {          
          font-Family: 'Lato', Sans-Serif;          
          cursor: pointer;          
          position: absolute;          
          top: 10vh;          
          right: 2vw;          
          height: 3vh;          
          width: 8vw;          
          text-align: center;          
          background: whitesmoke;          
          color: #24294a;          
          font-size: 1em;          
          border-radius: 15px;        
          }                
          
          .btn:hover, .btn:focus {          
            background:  rgb(218, 214, 214);        
          }                

          .btn:active {          
            box-shadow: 0 1px 2px rgba(0,0,0, 0.5) inset;        
          } 

        @media only screen and (max-width: 680px) {
          h2 {
           font-size: 1em;
          }
          
          h3 {
           font-size: .8em;
          }
          
          .name {
           font-size: .6em;
          }
          
          .date, .stats, .btn {
           font-size: .7em;
          }
        }
      </style>
      <div class="card">
        <div class$="name {{color}}">[[user]]</div>
        <h3 class="title">[[title]]</h3>
        <p class="date">[[date]]</p>
        <section class="taskDescription">
          <slot></slot>
            <paper-dropdown-menu on-iron-select="changeStatus" label="Status" value="[[status]]">
              <paper-listbox slot="dropdown-content" class="dropdown-content">
                <paper-item>Backlog</paper-item>
                <paper-item>In Progress</paper-item>
                <paper-item>Complete</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-dropdown-menu on-iron-select="changeColor" label="Color" value="[[color]]">
            <paper-listbox slot="dropdown-content" class="dropdown-content">
              <paper-item>turquoise</paper-item>
              <paper-item>orange</paper-item>
              <paper-item>green</paper-item>
              <paper-item>blue</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
          <button class='btn' on-click="deleteTask">Delete</button>
        </section>
      </div>
    `;
  }

  static get properties() {
    return {
      user: String,
      title: String,
      date: String,
      color: String
    };
  }

  changeStatus(event) {
    const temp = event.target.selectedItem.innerText;
    const id = this.id;
    const detail = {
      id: id,
      status__c: temp
    }
    const newEvent = new CustomEvent('status change', { detail: detail,  bubbles: true, composed: true });
    this.dispatchEvent(newEvent); 
  }

  deleteTask(event) { 

    const id = this.id;   
    const detail = {
      id: this.id,    
    }    

    const newEvent = new CustomEvent('delete task', { detail: detail,  bubbles: true, composed: true });
      this.dispatchEvent(newEvent); 
  }

  changeColor(event) {
    const temp = event.target.selectedItem.innerText;
      const id = this.id;
      const detail = {
        id: id,
        color__c: temp
      }

    const newEvent = new CustomEvent('color change', { detail: detail,  bubbles: true, composed: true });
      this.dispatchEvent(newEvent);
  }

    constructor() {
    super();
    }

}
    
  customElements.define('task-card', TaskCard);