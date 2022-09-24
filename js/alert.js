const popup = document.querySelector('.alert');
const header = document.querySelector('.alert .header');
const body = document.querySelector('.alert .body');
const ok = document.querySelector('.alert .close');

const hideAlert = () => popup.style.display = 'none';

function showAlert(h, b) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = "<p>" + b.split('\n').join("<br>") + "</p>";
    ok.onclick = hideAlert;
}

function showInput(h, b, callback) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<textarea class="alertinput" cols="72" rows="10" placeholder="${b}"></textarea>`;
    ok.onclick = () => {
        hideAlert();
        callback(document.querySelector(".alertinput").value)
    };
}

function downloadFile(filename, content) {
    var a = document.createElement("a");

    a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    a.setAttribute("download", filename);

    a.style.display = "none";
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}