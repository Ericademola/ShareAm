const template = document.createElement("template");
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    @font-face {
      font-family: poppins-bold;
      src: url(../../assets/fonts/Poppins-Bold.ttf);
    }
    @font-face {
      font-family: poppins-regular;
      src: url(../../assets/fonts/Poppins-Regular.ttf);
    }
    @font-face {
      font-family: poppins-medium;
      src: url(../../assets/fonts/Poppins-Medium.ttf);
    }
    @font-face {
      font-family: Rubik;
      src: url(../../assets/fonts/Rubik-VariableFont_wght.ttf);
    }
    html {
      font-size: 16px;
    }
    body {
      user-select: none;
      font-family: poppins-regular;
    }
    .join-meeting-container-wrapper {
      display: flex;
      flex-direction: column;
      display: flex;
      align-items: center;
      gap: 4vh;
      padding: 2vw 2vh;
    }

    .join-meeting-container {
      display: flex;
      gap: 2vw;
    }

    .user-input-wrap {
      display: flex;
      flex-direction: column;
      gap: 2vh;
      justify-content: center;
    }

    .user-input-wrap label {
      display: block;
      font-weight: 700;
      font-family: poppins-bold;
      font-size: 12px;
      color: #fffcfc;
    }

    .name-input {
      border: none;
      display: flex;
      align-items: center;
      width: 30vw;
      padding: 2.5vh 1vw;
      border-radius: 11px;
      font-size: 1vw;
    }

    .btn-login {
      background-color: #1376e3;
      padding: 1.5vh 0vw;
      width: 30vw;
      border-radius: 10px;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 1vw;
      cursor: pointer;
      margin-top: 5vh;
    }

    .btn-login:hover {
      background-color: #1058e8;
    }

    .blue-btn-txt {
      color: #fff;
      font-family: Poppins-regular;
      font-size: 0.9rem;
      font-weight: 600;
    }

    @media (prefers-color-scheme: light) {

      .join-meeting-container-wrapper {
        background-color: #dad9d9;
      }

      .name-input {
        background-color: #979797;
        color: #000000;
      }

    }   
      
    @media (prefers-color-scheme: dark) {

      .join-meeting-container-wrapper {
        background-color: #2a282d;
      }

      .name-input {
        background-color: #e4e4e4;
        color: #000000;
      }
    }   
  </style>

  <div class="join-meeting-container-wrapper">
    <div class="join-meeting-container">
      <slot name="videoDisplay"></slot>
      <form class="user-input-wrap" id="meeting-form">
        <label for="name-input">Name:</label>
        <input 
          type="text" 
          class="name-input"
          id="host-name-input"
          required
        />
        <label for="meeting-input">Meeting title:</label>
        <input 
          type="text" 
          class="name-input"
          id="topic-input"
          required
        />
        <button 
          class="btn-login blue-btn-txt" 
          type="submit"
        >
          Join
        </button>
      </form>
    </div>
  </div>
`;

class JoinMeetingHost extends HTMLElement {
  constructor() {
    super();
    this.shadowRootRef = this.attachShadow({ mode: "open" });
    let clone = template.content.cloneNode(true);
    this.shadowRootRef.append(clone);
  }

  connectedCallback() {
    const meetingForm = this.shadowRootRef.getElementById("meeting-form");

    if (meetingForm) {
      meetingForm.addEventListener("submit", this.handleSubmit);
    } else {
      console.error("Meeting form not found");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const topicInput = this.shadowRootRef.getElementById("topic-input").value;
    const hostNameInput = this.shadowRootRef.getElementById("host-name-input").value;
    const formData = {
      topic: topicInput,
      hostName: hostNameInput,
    };
    localStorage.setItem("meetingToken", formData.topic);
    localStorage.setItem("formData", JSON.stringify(formData));
    this.gotoCallInterface();
  }

  gotoCallInterface = async () => {
    window.location.href = "../../screens/dashboard/call_interface.html";
  }
}

customElements.define("join-meeting-host", JoinMeetingHost);
