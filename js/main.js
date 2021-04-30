window.addEventListener("load", (e) => {
  if (!localStorage.getItem("portfolio1012")[2]) {
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
