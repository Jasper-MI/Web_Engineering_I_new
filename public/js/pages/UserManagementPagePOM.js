var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { ImpresssumPOM } from "./impressumPOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";
//import  { UserManagemantPOM } from "./userManagemantPOM.js";
export class UserManagemantPOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // show HTML
            yield AbstractPOM.showPage('./html/userManagement.html');
            // DOM-Elemente 
            const linkBackToStartingPage = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkUserManagemant = document.getElementById('LinkUserManagemant');
            const logoutButton = document.getElementById('LinkLogout');
            const tableUsersBody = document.getElementById('TableUsersBody');
            // show Table with registered users
            const response = yield fetch('http://localhost:80/api/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                var users = yield response.json();
                users.forEach((user) => {
                    var rowTr = document.createElement("tr");
                    var cellUsername = document.createElement("td");
                    var cellUsernameText = document.createTextNode(user.userID);
                    cellUsername.appendChild(cellUsernameText);
                    cellUsername.setAttribute('id', `${user.userID}TableItemUsername`);
                    rowTr.appendChild(cellUsername);
                    var cellFirstName = document.createElement("td");
                    if (user.firstName) {
                        var cellFirstNameText = document.createTextNode(user.firstName);
                        cellFirstName.appendChild(cellFirstNameText);
                    }
                    cellFirstName.setAttribute('id', `${user.userID}TableItemFirstName`);
                    rowTr.appendChild(cellFirstName);
                    var cellLastName = document.createElement("td");
                    if (user.lastName) {
                        var cellLastNameText = document.createTextNode(user.lastName);
                        cellLastName.appendChild(cellLastNameText);
                    }
                    cellLastName.setAttribute('id', `${user.userID}TableItemLastName`);
                    rowTr.appendChild(cellLastName);
                    var cellButtons = document.createElement("td");
                    cellButtons.innerHTML = `
                    <button id="${user.userID}TableItemEditButton" type="button" class="btn btn-success btn-edit">Edit</button>
                    <button id="${user.userID}TableItemDeleteButton" type="button" class="btn btn-danger btn-delete">Delete</button>
                `;
                    rowTr.appendChild(cellButtons);
                    tableUsersBody.appendChild(rowTr);
                });
            }
            else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Event Listener hinzufügen
            linkBackToStartingPage === null || linkBackToStartingPage === void 0 ? void 0 : linkBackToStartingPage.addEventListener('click', (event) => {
                const startingPagePOM = new StartingPagePOM();
                startingPagePOM.init();
            });
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                const impressumPOM = new ImpresssumPOM();
                impressumPOM.init();
            });
            linkUserManagemant === null || linkUserManagemant === void 0 ? void 0 : linkUserManagemant.addEventListener('click', (event) => {
                const userManagemantPOM = new UserManagemantPOM();
                userManagemantPOM.init();
            });
            logoutButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log("logoutButton pressed");
                const applicationManager = ApplicationManager.getInstance();
                applicationManager.loadLandingPage();
            }));
        });
    }
}
