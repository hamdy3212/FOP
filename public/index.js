// Profile Picture
const edit = document.getElementById("edit");
const uploadForm = document.getElementById("uploadForm");
const cancel = document.getElementById("cancel");
edit.addEventListener("click", () =>{
    uploadForm.style.display = "block";
})
cancel.addEventListener("click", ()=>{
    uploadForm.style.display = "none";
})