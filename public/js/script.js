// to create createBox for image
function createBox(){
    const stickyPad = document.createElement("div");
    const navBar = document.createElement("div");
    const writePad = document.createElement("div");
    const minimize = document.createElement("div");
    const close = document.createElement("div");
    const canBg = document.querySelector("div");
    stickyPad.setAttribute("class", "sticky-pad");
    navBar.setAttribute("class", "nav");
    writePad.setAttribute("class", "writing-pad");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    canBg.setAttribute("class","canBg");
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(writePad);
    body.appendChild(stickyPad);
    
    close.addEventListener("click", function() {
      stickyPad.remove();
    });
    canBg.addEventListener("click", function(){

    });
  
    let isMinimized = false;
    minimize.addEventListener("click", function() {
      isMinimized == false
        ? (writePad.style.display = "none")
        : (writePad.style.display = "block");
      isMinimized = !isMinimized;
    });

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
  
    navBar.addEventListener("mousedown", function(e) {
      initialX = e.clientX;
      initialY = e.clientY;
      isStickyDown = true;
    });
  
    navBar.addEventListener("mousemove", function(e) {
      if (isStickyDown == true) {
        let finalX = e.clientX;
        let finalY = e.clientY; 
        let diffX = finalX - initialX;
        let diffY = finalY - initialY;  
        let { top, left } = stickyPad.getBoundingClientRect();
        stickyPad.style.top = top + diffY + "px";
        stickyPad.style.left = left + diffX + "px"; 
        initialX = finalX;
        initialY = finalY;
      }
    });

    // sticky => mouseup
    navBar.addEventListener("mouseup", function() {
      isStickyDown = false;
    });

    // pointer => moved off sticky
    navBar.addEventListener("mouseleave", function() {
      isStickyDown = false;
    });

    document.body.appendChild(stickyPad);
    return writePad;
  }
  
  // to handle handleslider icon
  let isActive = true;
  function handleslider() {
    if (isActive == true) {
      slider.classList.remove("is-active");
      toolPanel.classList.remove("addAnimation");
    } else {
      slider.classList.add("is-active");
      toolPanel.classList.add("addAnimation");
    }
    isActive = !isActive;
  } 

  let Activetool = "pencil";

  const pencilOptions = document.querySelector(".tool-options.pencil");
  const eraserOptions = document.querySelector(".tool-options.eraser");
  const tools = document.querySelectorAll(".tool");
  const inputs = document.querySelectorAll("input[type=range]");
  const bgOptions=document.querySelectorAll(".canBg");

  const ImageInput = document.querySelector(".upload-img");
  function handleToolChange(tool) {
    if (tool == "pencil") {
      if (Activetool == "pencil") {      
        pencilOptions.classList.add("show");
      } else {
        Activetool = "pencil";
        eraserOptions.classList.remove("show");
        tools[1].classList.remove("active");
        tools[0].classList.add("active");
        ctx.strokeStyle = "blue";
        ctx.lineWidth = inputs[0].value;
        ctx.globalCompositeOperation = "source-over";
      }
    } else if (tool == "eraser") {
      if (Activetool == "eraser") {
        eraserOptions.classList.add("show");
      } else {
        Activetool = "eraser";
        tools[0].classList.remove("active");
        tools[1].classList.add("active");
        pencilOptions.classList.remove("show");
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = inputs[0].value;
      }
    } else if (tool == "sticky") {
      createSticky();
    }
  }
  
  //undo stack
  let undoStack = [];
  let redoStack = [];
  function undoMaker() {
    if (undoStack.length > 0) {
      redoStack.push(undoStack.pop());
      redraw();
      return true;
    }
    return false;
  }
  
  // redo Stack
  function redoMaker() {
    if (redoStack.length > 0) {
      undoStack.push(redoStack.pop());
      redraw();
      return true;
    }
    return false;
  }
  