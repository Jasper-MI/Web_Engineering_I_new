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
            let currentEditUserId = null;
            // show HTML
            yield AbstractPOM.showPage('./html/userManagement.html');
            // DOM-Elemente 
            const linkBackToStartingPage = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkUserManagemant = document.getElementById('LinkUserManagemant');
            const logoutButton = document.getElementById('LinkLogout');
            const tableUsersBody = document.getElementById('TableUsersBody');
            const formAddUser = document.getElementById('FormAddUser');
            const formAddUserSubmit = document.getElementById('FormAddUserSubmit');
            console.log("Loaded fomrAddUserSubmit: " + formAddUserSubmit);
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
                <button id="${user.userID}TableItemEditButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#ModalEditUser">
                Edit user ${user.userID}
                </button>
                <button id="${user.userID}TableItemDeleteButton" type="button" class="btn btn-danger btn-delete">Delete</button>
                `;
                    rowTr.appendChild(cellButtons);
                    tableUsersBody.appendChild(rowTr);
                    // Edit and Delete Button
                    const tableItemEditButton = document.getElementById(`${user.userID}TableItemEditButton`);
                    const tableItemDeleteButton = document.getElementById(user.userID + 'TableItemDeleteButton');
                    // Edit User Button
                    tableItemEditButton === null || tableItemEditButton === void 0 ? void 0 : tableItemEditButton.addEventListener('click', () => {
                        currentEditUserId = user.userID;
                        console.log('Current User: ' + user.userID);
                        document.getElementById('FormEditUserFirstName').value = user.firstName || '';
                        document.getElementById('FormEditUserLastName').value = user.lastName || '';
                        document.getElementById('FormEditUserPassword').value = '';
                    });
                    // Delete User Button
                    tableItemDeleteButton === null || tableItemDeleteButton === void 0 ? void 0 : tableItemDeleteButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        console.log('Delete-Button pressed');
                        const response = yield fetch(`http://localhost:80/api/users/${user.userID}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        });
                        this.init();
                    }));
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
                event.preventDefault();
                const applicationManager = ApplicationManager.getInstance();
                applicationManager.logOut();
            }));
            // add new user
            formAddUser.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                console.log("Add-User-Button pressed");
                const userIdInput = document.getElementById('FormAddUserUsername').value;
                const firstNameInput = document.getElementById('FormAddUserFirstName').value;
                const lastNameInput = document.getElementById('FormAddUserLastName').value;
                const passwordInput = document.getElementById('FormAddUserPassword').value;
                const applicationManager = ApplicationManager.getInstance();
                const response = yield fetch('http://localhost:80/api/users', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        userID: userIdInput,
                        password: passwordInput,
                        firstName: firstNameInput,
                        lastName: lastNameInput
                    })
                });
                if (!response.ok) {
                    applicationManager.showToast("User already exists", "rgb(197, 71, 71)");
                    return null;
                }
                formAddUser.reset();
                applicationManager.showToast("Successfully created user", "rgb(72, 194, 72)"); //call Methode to show toast message
                this.init();
            }));
            // Ansatz von https://stackoverflow.com/questions/26863003/how-to-reset-the-bootstrap-modal-when-it-gets-closed-and-open-it-fresh-again An Bootstrap 5 angepasst durch ChatGPT
            const modalElement = document.getElementById('exampleModal');
            if (modalElement) {
                modalElement.addEventListener('hidden.bs.modal', function () {
                    const usernameInput = document.getElementById('FormAddUserUsername');
                    const firstNameInput = document.getElementById('FormAddUserFirstName');
                    const lastNameInput = document.getElementById('FormAddUserLastName');
                    const passwordInput = document.getElementById('FormAddUserPassword');
                    usernameInput.value = "";
                    firstNameInput.value = "";
                    lastNameInput.value = "";
                    passwordInput.value = "";
                });
            }
            // PUT Methode to upadte user
            const tableFormEditUserSubmit = document.getElementById('FormEditUserSubmit');
            tableFormEditUserSubmit.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                console.log('Edit-Button pressed');
                if (!currentEditUserId)
                    return;
                const firstNameInput = document.getElementById('FormEditUserFirstName').value;
                const lastNameInput = document.getElementById('FormEditUserLastName').value;
                const passwordInput = document.getElementById('FormEditUserPassword').value;
                console.log('sending request...');
                const response = yield fetch(`http://localhost:80/api/users/${currentEditUserId}`, {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        userID: currentEditUserId,
                        password: passwordInput,
                        firstName: firstNameInput,
                        lastName: lastNameInput
                    })
                });
                console.log('request send!');
                currentEditUserId = null;
                this.init();
            }));
        });
    }
}
