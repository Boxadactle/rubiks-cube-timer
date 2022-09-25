const popup = document.querySelector('.alert');
const header = document.querySelector('.alert .header');
const body = document.querySelector('.alert .body');
const ok = document.querySelector('.alert .close');

const hideAlert = () => popup.style.display = 'none';

function showAlert(h, b) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = "<p>" + b.split('\n').join("<br>") + "</p>";
    ok.style.display = 'block';
    ok.onclick = hideAlert;
}

async function showPrompt(h, b, callback) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}</p><button class="yes">Yes</button><button class="no">Cancel</button>`;
    ok.style.display = 'none';
    
    document.querySelector('.yes').onclick = () => {
        callback(true);
        hideAlert();
    };

    document.querySelector('.no').onclick = () => {
        callback(false);
        hideAlert();
    }
}

async function showFileAlert(h, b, callback, ...accepted) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}<p><input type="file" size="30" class="file-selector" accept="${accepted.join(' ')}">`;
    document.querySelector(".file-selector").addEventListener('change', function (event) {
        const files = event.target.files;

        console.log(files);

        const f = files[0];
        const reader = new FileReader();
 
        reader.readAsText(f);

        reader.onload = (function(file) {
            return function(e) {
                hideAlert();
                callback(e);
            }
        })(f);
    });

    ok.style.display = 'none';
}

function showInput(h, b, callback) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}</p><textarea class="alertinput" cols="72" rows="10"></textarea>`;
    ok.onclick = () => {
        hideAlert();
        callback(document.querySelector(".alertinput").value)
    };
    ok.style.display = 'block';
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