class Css3dProgress extends HTMLElement {
  static get observedAttributes() {
    return ["percent", "is-animation", "stroke-color", "trail-color", "back-shadow", "bottom-shadow"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");

    template.innerHTML = `
    <style>
        .camera {
          width: 100%;
          font-size: 1em;
          perspective: 1000px;
          perspective-origin: 50% 50%;
          backface-visibility: visible;
        }

        .progress {
          height: 10em;
          font-size: 1em;
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.3s ease-in-out;
          transform: rotateX(60deg) rotateY(0deg);
        }

        .face {
          width: 100%;
          height: 2em;
          font-size: 2em;
          position: relative;
          background-color: rgba(254, 254, 254, 0.3);
        }

        .left,
        .right {
          width: 2em;
        }

        .left {
          background-color: rgba(236, 0, 140, 0.6);
          transform: rotateX(90deg) rotateY(-90deg) translateX(2em) translateY(1em) translateZ(1em);
        }

        .right {
          right: 0;
          position: absolute;
          transform: rotateX(90deg) rotateY(-90deg) translateX(4em) translateY(1em) translateZ(-1em);
        }

        .back {
          transform: rotateX(90deg) rotateY(0) translateX(0) translateY(1em) translateZ(-1em);
        }

        .front {
          transform: rotateX(90deg) rotateY(0) translateX(0) translateY(1em) translateZ(3em);
        }

        .top {
          transform: rotateX(0deg) rotateY(0) translateX(0em) translateY(4em) translateZ(2em);
        }

        .bottom {
          box-shadow: 0 0.1em 0.6em rgba(0, 0, 0, 0.3), 0.6em -0.5em 3em rgba(0, 0, 0, 0.3), 1em -1em 8em #fefefe;
        }

        .bar {
          height: 2em;
          transition: all 0.3s ease-in-out;
          background-color: rgba(236, 0, 140, 0.6);
        }

        .bottom .bar {
          box-shadow: 0em 0em 2em rgba(236, 0, 140, 0.8);
        }

        .back .bar {
          box-shadow: -0.5em -1.5em 4em rgba(236, 0, 140, 0.8);
        }

        @keyframes change {
          0% {
            background-position: 0 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }
      </style>

      <div class="camera">
        <div class="progress">
          <div class="face top">
            <div class="bar"></div>
          </div>
          <div class="face back">
            <div class="bar"></div>
          </div>
          <div class="face bottom">
            <div class="bar"></div>
          </div>
          <div class="face left"></div>
          <div class="face right"></div>
          <div class="face front">
            <div class="bar"></div>
          </div>
        </div>
      </div>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    updateStyle(this);
  }

  attributeChangedCallback(name) {
    if (name === "percent") {
      updatePercent(this);
    } else {
      updateStyle(this);
    }
  }
}

function updatePercent(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelectorAll(".bar").forEach((el) => {
    el.style.width = `${elem.getAttribute("percent")}%`;
  });
}

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelectorAll(".bar").forEach((el) => {
    if (elem.getAttribute("is-animation") === "true") {
      el.style.animation = "change 5s ease-in-out infinite";
      el.style.background = `linear-gradient(90deg, ${elem.getAttribute("stroke-color")})`;
      el.style.backgroundSize = "400% 400%";
    } else {
      el.style.background = elem.getAttribute("stroke-color");
    }
  });
  shadow.querySelectorAll(".face").forEach((el) => {
    el.style.background = elem.getAttribute("trail-color");
  });
  shadow.querySelector(".left").style.background = elem.getAttribute("stroke-color");
  shadow.querySelector(".back .bar").style.boxShadow = elem.getAttribute("back-shadow");
  shadow.querySelector(".bottom .bar").style.boxShadow = elem.getAttribute("bottom-shadow");
}

window.customElements.define("css-3d-progress", Css3dProgress);
