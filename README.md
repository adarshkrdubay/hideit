# Hideit - File Encryption/Decryption Web Tool

Hideit is a simple web tool for encrypting and decrypting files using client-side JavaScript. It provides a straightforward interface for users to secure their files with an encryption key and later decrypt them when needed.

## Features

- Drag and drop or choose a file for encryption or decryption.
- Secure file handling with client-side encryption.
- XOR encryption algorithm used for educational purposes (not suitable for real-world encryption).
- Download the encrypted/decrypted file with a modified filename for easy identification.

## Usage

1. **Drag and Drop / Choose File**: Drag and drop a file into the designated area or click to choose a file.

2. **Encryption Key**: Enter a secure encryption key to protect your file.

3. **Encrypt / Decrypt**: Click the respective button based on whether you want to encrypt or decrypt the file.

4. **Download**: Once the process is complete, click the download link to obtain the encrypted or decrypted file.

## File Naming Convention

- Files encrypted will have the suffix `_hideit_encrypt` added to their names.
- Files decrypted will have the suffix `_hideit_decrypt` added to their names.

## Security Notice

- This tool uses a basic XOR encryption algorithm for educational purposes only. It is not suitable for real-world secure encryption.

## How to Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/adarshkrdubay/hideit.git
    ```

2. Open `index.html` in a web browser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
