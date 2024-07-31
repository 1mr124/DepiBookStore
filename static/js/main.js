function loadHTML(elementID, filePath) { 
fetch(filePath) 
    .then(response => response.text()) 
    .then(data => { 
    document.getElementById(elementID).innerHTML = data; 
    }); 
} 

loadHTML('nav-placeholder', 'nav.html'); 
loadHTML('footer-placeholder', 'footer.html'); 