class Css3dProgress extends HTMLElement {
  static get observedAttributes() {
    return ["percent", "is-animation", "stroke-color", "trail-color", "back-shadow", "bottom-shadow"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const camera = document.createElement("div");
    camera.classList.add("camera");

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const top = document.createElement("div");
    top.classList.add("face", "top");

    const back = document.createElement("div");
    back.classList.add("face", "back");

    const bottom = document.createElement("div");
    bottom.classList.add("face", "bottom");

    const left = document.createElement("div");
    left.classList.add("face", "left");

    const right = document.createElement("div");
    right.classList.add("face", "right");

    const front = document.createElement("div");
    front.classList.add("face", "front");

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "./css-3d-progress.css");

    [top, back, bottom, front].forEach((el) => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      el.appendChild(bar);
    });

    progress.append(top, back, bottom, left, right, front);
    camera.appendChild(progress);
    shadow.appendChild(linkElem);
    shadow.appendChild(camera);
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
