const textBox = document.getElementById('textBox');
const sendButton = document.getElementById('sendButton');
const data = document.getElementById('data');
const copyBtn = document.getElementById('copy');

function Display_API() {
    if (textBox.value !== "") {
        const input = textBox.value.split('\n').map(std => std.trim()).filter(std => std);
        const Data = input.map(std => ({ std: std.toLowerCase() }));

        data.innerHTML = "";

        Data.forEach(e => {
            let pre = document.createElement('pre');
            pre.innerHTML = `
            {
                std: "${e.std}"
            },
            `
            data.appendChild(pre);
        });

        textBox.value = "";
        clipBoardFun();
    } else {
        alert('Your textBox field is empty!!');
    }
}

function clipBoardFun() {
    copyBtn.style.display = 'block';

    copyBtn.addEventListener('click', () => {
        const allPreElements = data.querySelectorAll('pre');
        const allText = Array.from(allPreElements).map(pre => pre.innerText).join('\n');
        navigator.clipboard.writeText(allText).then(() => {
            copyBtn.style.display = 'none';
            document.getElementById('check').style.display = 'block';

            setTimeout(() => {
                copyBtn.style.display = 'block';
                document.getElementById('check').style.display = 'none';
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
}

sendButton.addEventListener('click', Display_API);
