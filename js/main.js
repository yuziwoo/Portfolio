window.addEventListener("load", (e) => {
  if (document.body.classList.contains("mobile")) {
    window.location.href = "m_main.html";
  }

  const comment = document.getElementsByClassName("comment")[0];

  document.addEventListener("click", () => {
    if (comment.style.opacity != "0") {
       comment.style.opacity = "0";
       setTimeout(() => {
         comment.style.display = "none";
       }, 1000);
    }
  });
  document.addEventListener("wheel", () => {
    if (comment.style.opacity != "0") {
       comment.style.opacity = "0";
       setTimeout(() => {
         comment.style.display = "none";
       }, 1000);
    }
  });

})
