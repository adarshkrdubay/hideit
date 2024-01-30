function allowDrop(event) {
    event.preventDefault();
    document.getElementById('dropArea').style.border = '2px dashed #e1e1e1';
}
function handleDrop(event) {
    event.preventDefault();
    document.getElementById('dropArea').style.border = '2px dashed #3498db';
    const file = event.dataTransfer.files[0];
    handleFile(file);
    document.getElementById('options').style.display = 'block';
}
function handleFileSelect(event) {
    const file = event.target.files[0];
    handleFile(file);
    document.getElementById('options').style.display = 'block';
}
function handleFile(file) {
    const dropArea = document.getElementById('dropArea');
    const fileNameElement = document.getElementById('fileName');
    fileNameElement.innerHTML = `<p>${file.name}</p><p>Type: ${file.type}</p>`;
    dropArea.style.border = '2px dashed #e1e1e1';
}
async function encryptFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0] || document.getElementById('dropArea').files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }
    const encryptionKey = document.getElementById('encryptionKey').value;
    if (!encryptionKey) {
        alert('Please enter an encryption key.');
        return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
        const fileData = event.target.result;
        const encryptedData = xorEncrypt(fileData, encryptionKey);
        const encryptedBlob = new Blob([encryptedData], { type: file.type });
        setDownloadAttributes(encryptedBlob, file.name, 'encrypt');
        document.getElementById('downloadLink').style.display = 'inline-block';
    };
    reader.readAsArrayBuffer(file);
}
async function decryptFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0] || document.getElementById('dropArea').files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }
    const encryptionKey = document.getElementById('encryptionKey').value;
    if (!encryptionKey) {
        alert('Please enter an encryption key.');
        return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
        const fileData = event.target.result;
        const decryptedData = xorEncrypt(fileData, encryptionKey);
        const decryptedBlob = new Blob([decryptedData], { type: file.type });
        setDownloadAttributes(decryptedBlob, file.name, 'decrypt');
        document.getElementById('downloadLink').style.display = 'inline-block';
    };
    reader.readAsArrayBuffer(file);
}
function xorEncrypt(data, key) {
    const dataArray = new Uint8Array(data);
    const keyArray = new TextEncoder().encode(key);
    for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] ^= keyArray[i % keyArray.length];
    }
    return dataArray;
}
function setDownloadAttributes(blob, originalFileName, operation) {
    const downloadLink = document.getElementById('downloadLink');
    const extension = originalFileName.split('.').pop();
    let newFileName;
    if (operation === 'decrypt' && originalFileName.includes('hideit_encrypt')) {
        newFileName = originalFileName.replace('hideit_encrypt', 'hideit_decrypt');
    } else if (operation === 'encrypt' && originalFileName.includes('hideit_decrypt')) {
        newFileName = originalFileName.replace('hideit_decrypt', 'hideit_encrypt');
    } else {
        newFileName = originalFileName;
    }
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = newFileName;
}
function resetForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('encryptionKey').value = '';
    document.getElementById('fileName').innerHTML = 'Drag and drop a file here, or click to select a file.';
    document.getElementById('options').style.display = 'none';
    document.getElementById('downloadLink').style.display = 'none';
}
