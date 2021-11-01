  // header.js script 태그는 3번째에 첨부해주세요.

window.addEventListener("load", (e) => {
  const header = document.createElement("header");
  header.classList.add("header");
  document.body.appendChild(header);

  // Logo
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const logo_a = document.createElement("a");
  logo_a.href = "main.html";
  logo_a.innerHTML = '<svg viewBox="0 0 157.17 29.04" class="logoImg"><path d="M103.14,38.73h-4V14.66l-4,2.48V13l4-2.69h4Z" transform="translate(-3.37 -9.98)"/><path d="M111.64,36.89A8.2,8.2,0,0,1,109.58,31V18a8.17,8.17,0,0,1,2.07-5.95,8.09,8.09,0,0,1,6-2.11q4,0,6,2.1a8.16,8.16,0,0,1,2.06,6V31a8.16,8.16,0,0,1-2.07,5.95,9.65,9.65,0,0,1-12.08,0Zm9.16-2.76a4.53,4.53,0,0,0,1-3.18V18a4.53,4.53,0,0,0-1-3.17,5,5,0,0,0-6.25,0,4.58,4.58,0,0,0-1,3.17V31a4.58,4.58,0,0,0,1,3.18,5,5,0,0,0,6.23,0Z" transform="translate(-3.37 -9.98)"/><path d="M138.51,38.73h-4V14.66l-4.05,2.48V13l4.05-2.69h4Z" transform="translate(-3.37 -9.98)"/><path d="M144.53,35.27l9.9-13.2a10,10,0,0,0,1.34-2.36,6.4,6.4,0,0,0,.47-2.27v0a3.46,3.46,0,0,0-1-2.64,4,4,0,0,0-2.83-.94,4,4,0,0,0-2.82,1,4.7,4.7,0,0,0-1.31,2.9v0h-4.12v0a10.72,10.72,0,0,1,1.44-4.17,7.38,7.38,0,0,1,2.8-2.64,8.45,8.45,0,0,1,4-.91,9.86,9.86,0,0,1,4.33.87,6.17,6.17,0,0,1,2.74,2.53,8.09,8.09,0,0,1,.93,4v0a8.71,8.71,0,0,1-.62,3.14A13.66,13.66,0,0,1,158,23.76L149.8,34.94h10.74v3.79h-16Z" transform="translate(-3.37 -9.98)"/><path d="M90,35v3.78H73.73V35Z" transform="translate(-3.37 -9.98)"/><path d="M6.46,38.1a7.94,7.94,0,0,1-3.09-2.58l3.26-2.34a3.71,3.71,0,0,0,1.58,1.48,5.25,5.25,0,0,0,2.41.53,4.56,4.56,0,0,0,3.6-1.44,6,6,0,0,0,1.28-4.07V10.33h4V29.7a11.24,11.24,0,0,1-1,5,7.12,7.12,0,0,1-3,3.18,9.84,9.84,0,0,1-4.8,1.1A9.43,9.43,0,0,1,6.46,38.1Z" transform="translate(-3.37 -9.98)"/><path d="M30.5,38.73h-4V10.33h4Z" transform="translate(-3.37 -9.98)"/><path d="M50.36,10.33H53.1l5.82,22.26,5-22.26h4.14l-6.94,28.4H57.08L51.85,18.88,46.38,38.73H42.32l-6.94-28.4h4.14l5,22.26Z" transform="translate(-3.37 -9.98)"/></svg>'

  const path = logo_a.getElementsByTagName("path");
  if (document.body.classList.contains("darkmode")) {
    for (let i = 0; i < 8; i++) {
      path[i].setAttribute("fill", "rgba(255, 255, 255, 0.8)");
    }
  } else {
    for (let i = 0; i < 8; i++) {
      path[i].setAttribute("fill", "rgba(30, 50, 39, 0.8)");
    }
  }
  logo.appendChild(logo_a);
  header.appendChild(logo);

  // Main Navigation
  const nav = document.createElement("nav");
  const main_menu = document.createElement("ul");
  nav.classList.add("main_menu");

  const main_menu_list_info = [["About me", "aboutMe.html"], ["Interactive works", "interactiveWork.html"], ["Pages", "page.html"], ["Design tools", "designTool.html"]];
  for (let i =0; i < 4; i++){
    let main_menu_list = document.createElement("li");
    let main_menu_list_a = document.createElement("a");
    main_menu_list_a.innerText = main_menu_list_info[i][0];
    main_menu_list_a.href = main_menu_list_info[i][1];
    main_menu_list.classList.add("main_menu_list")
    main_menu_list.appendChild(main_menu_list_a);
    main_menu.appendChild(main_menu_list);
  }
  nav.appendChild(main_menu);
  header.appendChild(nav);

const activeNum = document.getElementsByTagName("script")[2].getAttribute("activeNum");
if (activeNum < 4) {
  document.getElementsByClassName("main_menu_list")[activeNum].classList.add("active");

 if (document.getElementsByClassName("main_menu_list")[0].classList.contains("active")){
   document.styleSheets[3].cssRules[0].style.setProperty("left", "-377.5px");
 } else if (document.getElementsByClassName("main_menu_list")[1].classList.contains("active")){
   document.styleSheets[3].cssRules[0].style.setProperty("left", "-227.5px");
 } else if (document.getElementsByClassName("main_menu_list")[2].classList.contains("active")){
   document.styleSheets[3].cssRules[0].style.setProperty("left", "-77.5px");
 } else if (document.getElementsByClassName("main_menu_list")[3].classList.contains("active")){
   document.styleSheets[3].cssRules[0].style.setProperty("left", "72.5px");
 } else {
   document.styleSheets[3].cssRules[0].style.setProperty("left", "-377.5px");
 }
} else if (activeNum >= 4) {
  document.styleSheets[3].cssRules[0].style.setProperty("left", "-377.5px");
}






  // Menu button darkmode_btn
  const menu_btn_wrap = document.createElement("div");
  const darkmode = document.createElement("div");
  darkmode.classList.add("darkmode_btn");
  const darkmode_btn = document.createElement("button");
  darkmode.appendChild(darkmode_btn);
  menu_btn_wrap.appendChild(darkmode);
  let darkmode_btn_image = document.createElement("img");
  if (document.body.classList.contains("darkmode")) {
    darkmode_btn_image.src = "img/darkmode_btn.png";
  } else if (document.body.classList.contains("lightmode")) {
    darkmode_btn_image.src = "img/lightmode_btn.png";
  }

  darkmode_btn.addEventListener("click", () => {
      let localStorage_value = localStorage.getItem("portfolio1012")[0];
      let localStorage_value2 = localStorage.getItem("portfolio1012")[2];

    // localStorage 변환
    if (document.body.classList.contains("darkmode")) {
      document.body.classList.add("lightmode");
      document.body.classList.remove("darkmode");
      darkmode_btn_image.src = "img/lightmode_btn.png";
      localStorage.setItem("portfolio1012", `${localStorage_value}1${localStorage_value2}`);
    } else if (document.body.classList.contains("lightmode")) {
      document.body.classList.add("darkmode");
      document.body.classList.remove("lightmode");
      darkmode_btn_image.src = "img/darkmode_btn.png";
      localStorage.setItem("portfolio1012", `${localStorage_value}0${localStorage_value2}`);
    }

    // header logo 색깔 변환
    if (document.body.classList.contains("darkmode")) {
      for (let i = 0; i < 8; i++) {
        path[i].setAttribute("fill", "rgba(255, 255, 255, 0.8)");
      }
    } else {
      for (let i = 0; i < 8; i++) {
        path[i].setAttribute("fill", "rgba(30, 50, 39, 0.8)");
      }
    }
  }, false); // click 이벤트 종료

  darkmode_btn.appendChild(darkmode_btn_image);

  // Menu button -darkmode_btn
  const menu_btn = document.createElement("button");
  menu_btn_wrap.classList.add("menu_btn");
  for (let i = 0; i < 3; i++){
    let line = document.createElement("span");
    line.classList.add("menu_btn_line");
    line.classList.add(`menu_btn_line${i+1}`);
    menu_btn.appendChild(line);
  }
  menu_btn_wrap.appendChild(menu_btn);
  header.appendChild(menu_btn_wrap);
  const menu_btn_line = document.getElementsByClassName("menu_btn_line")


  // Side Navigation
  const side_nav = document.createElement("nav");
  side_nav.classList.add("side_nav");
  const side_nav_overlay = document.createElement("div");
  side_nav_overlay.classList.add("side_nav_overlay");
  header.appendChild(side_nav_overlay);
  header.appendChild(side_nav);

  const side_nav_menu_wrap = document.createElement("div");
  side_nav_menu_wrap.classList.add("side_nav_menu")
  const side_nav_menu = document.createElement("ul");
  const side_nav_menu_info = [["About me", "aboutMe.html"], ["Interactive works", "interactiveWork.html"], ["Pages", "page.html"], ["Design tools", "designTool.html"], ["Contact", "contact.html"]];
  for (let i =0; i < 5; i++){
    let side_nav_menu_list = document.createElement("li");
    let side_nav_menu_list_a = document.createElement("a");
    side_nav_menu_list_a.innerText = side_nav_menu_info[i][0];
    side_nav_menu_list_a.href = side_nav_menu_info[i][1];
    side_nav_menu_list.classList.add("side_nav_menu_list")
    side_nav_menu_list.appendChild(side_nav_menu_list_a);
    side_nav_menu.appendChild(side_nav_menu_list);
  }
  side_nav_menu_wrap.appendChild(side_nav_menu);
  side_nav.appendChild(side_nav_menu_wrap);


  // Device Mode
  const deviceMode = document.createElement("div");
  const deviceMode_btn = document.createElement("a");
  deviceMode.classList.add("deviceMode");

  if (document.body.classList.contains("pc")) {
    deviceMode_btn.innerText = "Mobile Ver";
    deviceMode_btn.href = "m_main.html";
  } else if (document.body.classList.contains("mobile")) {
    deviceMode_btn.innerText = "PC Ver";
    deviceMode_btn.href = "m_main.html";
  }

  deviceMode.appendChild(deviceMode_btn);
  side_nav_menu_wrap.appendChild(deviceMode);


  deviceMode_btn.addEventListener("click", () => {
      let localStorage_value = localStorage.getItem("portfolio1012")[0];
      let localStorage_value2 = localStorage.getItem("portfolio1012")[1];

    // localStorage 변환
    if (document.body.classList.contains("pc")) {
      document.body.classList.add("mobile");
      document.body.classList.remove("pc");
      localStorage.setItem("portfolio1012", `${localStorage_value}${localStorage_value2}0`);
    } else if (document.body.classList.contains("mobile")) {
      document.body.classList.add("pc");
      document.body.classList.remove("mobile");
      localStorage.setItem("portfolio1012", `${localStorage_value}${localStorage_value2}1`);
    }
  }, false); // click 이벤트 종료



  let side_nav_click = (display, opacity) => {
    side_nav.style.display = display;
    side_nav_overlay.style.display = display;
    if (opacity == 1) {
      menu_btn_line[0].style.transform = "translateY(10.5px) rotate(-45deg)";
      menu_btn_line[1].style.opacity = 0;
      menu_btn_line[2].style.transform = "translateY(-10.5px) rotate(45deg)";
    } else if (opacity == 0){
      menu_btn_line[0].style.transform = "";
      menu_btn_line[1].style.opacity = 1;
      menu_btn_line[2].style.transform = "";
    }

    setTimeout(() => {
      side_nav.style.opacity = opacity;
      side_nav_overlay.style.opacity = opacity;
    }, 10);
  }

  menu_btn.addEventListener("click", () => {
    if (side_nav.style.display == "none") {
      side_nav_click("block", 1);
    } else if (side_nav.style.display == "block") {
      side_nav_click("none", 0);
    } else {
      side_nav_click("block", 1);
    }
  }, false);
  side_nav_overlay.addEventListener("click", () => {
    if (side_nav.style.display == "none") {
      side_nav_click("block", 1);
    } else if (side_nav.style.display == "block") {
      side_nav_click("none", 0);
    } else {
      side_nav_click("block", 1);
    }
  })

})
