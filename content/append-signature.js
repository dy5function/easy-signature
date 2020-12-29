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

browser.runtime.onMessage.addListener((message) => {
    if (message.command == "append-signature") {
        var targetElement = browser.menus.getTargetElement(message.targetElementId);

        // Appending a signature can only be supported for textareas as these
        // are the only multiline input fields.
        if (targetElement.tagName.toLowerCase() == "textarea" ) {
            browser.storage.local.get("signature").then((results) => {
                // Add line breaks before the signature for better readability
                targetElement.value += '\r\n\r\n' + results['signature'];
            });
        }
        // Print a log message to the console if an attempt was made to append
        // a signature to a non-multiline input field.
        else {
            console.log(`Dropping 'append-signature' request for unsupported tag ${targetElement.tagName}`);
        }
    }
});
