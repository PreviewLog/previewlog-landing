// Landing-only illustrative controls. No video playback or analysis is simulated.
const viewButtons = document.querySelectorAll("[data-view]");
viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const showCuts = button.dataset.view === "cuts";
    document.querySelector(".cuts-panel").hidden = !showCuts;
    document.querySelector(".dialogue-panel").hidden = showCuts;
    viewButtons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  });
});

const dialogueLines = document.querySelectorAll("[data-time]");
dialogueLines.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#demo-time").textContent = button.dataset.time;
    dialogueLines.forEach((item) => {
      item.classList.toggle("selected", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
  });
});
