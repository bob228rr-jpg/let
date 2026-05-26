(function () {
  const gate = document.getElementById("intro-gate");
  const audio = document.getElementById("theme-audio");
  const status = document.getElementById("gate-status");

  if (!gate || !audio) {
    document.body.classList.remove("gate-open");
    return;
  }

  let started = false;

  const enterSite = async () => {
    if (started) return;
    started = true;
    gate.classList.add("is-starting");

    try {
      audio.volume = 0.72;
      await audio.play();
      if (status) status.textContent = "music on";
    } catch (error) {
      started = false;
      gate.classList.remove("is-starting");
      if (status) status.textContent = "click once more to start music";
      return;
    }

    gate.classList.add("is-hidden");
    document.body.classList.remove("gate-open");
    gate.setAttribute("aria-hidden", "true");
    gate.setAttribute("tabindex", "-1");
  };

  gate.addEventListener("click", enterSite);
  gate.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enterSite();
    }
  });
})();
