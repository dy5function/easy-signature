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

// Event listeners
signatureTextarea.addEventListener('input', updateSignature);

// Log an error to the console
function onError(error) {
    console.log(error);
}

// Initialize popup with current signature
function initialize() {
    var loadingSignature = browser.storage.local.get('signature');
    loadingSignature.then((results) => {
        signatureTextarea.value = (typeof results['signature'] === 'undefined' ? '' : results['signature']);
    }, onError);
}

// Update signature
function updateSignature() {
    // get signature from textarea
    var currentSignature = signatureTextarea.value;
    var storingSignature = browser.storage.local.set({ "signature": currentSignature });
    storingSignature.then(() => {
        // nothing to do
    }, onError);
}

// Initialize signature textarea
initialize();
