/*
 * Copyright 2020 Christoph Groß
 *
 * This file is part of Easy Signature.
 *
 * Easy Signature is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Easy Signature is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Easy Signature. If not, see <https://www.gnu.org/licenses/>.
 */

// Popup input elements
var signatureTextarea = document.querySelector('#signature');
var updateButton = document.querySelector('#update');
var resetButton = document.querySelector('#reset');

// Event listeners
signatureTextarea.addEventListener('input', markChange);
updateButton.addEventListener('click', updateSignature);
resetButton.addEventListener('click', resetSignature);

console.log("Test");

// Log an error to the console
function onError(error) {
    console.log(error);
}

// Initialize popup with current signature
function initialize() {
    var loadingSignature = browser.storage.local.get(null);
    loadingSignature.then((results) => {
        // insert signature text
        signatureTextarea.value = results['signature'];
        markUpdate();
    }, onError);
}

// Mark changes in the signature textarea
function markChange() {
    // This will update the styling of the textarea to indicate unstored changed
    signatureTextarea.classList.add('changed');
    signatureTextarea.classList.remove('unchanged');
}

// Mark update in the signature textarea
function markUpdate() {
    // This will update the styling of the textarea to indicate stored changes
    signatureTextarea.classList.add('unchanged');
    signatureTextarea.classList.remove('changed');
}

// Update button event listener
function updateSignature() {
    // get signature from textarea
    var currentSignature = signatureTextarea.value;
    var storingSignature = browser.storage.local.set({ "signature": currentSignature });
    storingSignature.then(() => {
        markUpdate();
    }, onError);
}

// Reser button event listener
function resetSignature() {
    var loadingSignature = browser.storage.local.get('signature');
    loadingSignature.then((results) => {
        signatureTextarea.value = results['signature'];
        markUpdate();
    }, onError);
}

// Initialize signature textarea
initialize();
