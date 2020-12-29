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

browser.menus.create({
    id: "append-signature",
    title: "Append Signature",
    contexts: ["editable"],
});

browser.menus.onClicked.addListener((info, tab) => {
    browser.tabs.sendMessage(tab.id, {
        command: "append-signature",
        targetElementId: info.targetElementId
    });
});
