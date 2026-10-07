// Switch between user-provided screenshots of the running app.
const outputButtons = document.querySelectorAll("[data-output]");
outputButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-output-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.outputPanel !== button.dataset.output;
    });
    outputButtons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  });
});

const viewButtons = document.querySelectorAll("[data-view]");
viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-capture]").forEach((panel) => {
      panel.hidden = panel.dataset.capture !== button.dataset.view;
    });
    viewButtons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  });
});
