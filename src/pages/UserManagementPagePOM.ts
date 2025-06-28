import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { ImpresssumPOM } from "./impressumPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";
//import  { UserManagemantPOM } from "./userManagemantPOM.js";

export class UserManagemantPOM {
    public async init(): Promise<void> {
        let currentEditUserId: string | null = null;

        // show HTML
        await AbstractPOM.showPage('./html/userManagement.html');

        // DOM-Elemente 
        const linkBackToStartingPage = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');
        const linkUserManagemant = document.getElementById('LinkUserManagemant');
        const logoutButton = document.getElementById('LinkLogout') as HTMLElement;
        const tableUsersBody = document.getElementById('TableUsersBody') as HTMLTableElement;
        const formAddUser = document.getElementById('FormAddUser') as HTMLFormElement;
        const formAddUserSubmit = document.getElementById('FormAddUserSubmit') as HTMLButtonElement;
        console.log("Loaded fomrAddUserSubmit: " + formAddUserSubmit);

        // show Table with registered users
        const response = await fetch('http://localhost:80/api/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            var users = await response.json();
            users.forEach((user: { userID: string; firstName: string; lastName: string; }) => {
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
                const tableItemEditButton = document.getElementById(`${user.userID}TableItemEditButton`) as HTMLButtonElement;
                const tableItemDeleteButton = document.getElementById(user.userID + 'TableItemDeleteButton') as HTMLButtonElement;

                // Edit User Button
                tableItemEditButton?.addEventListener('click', () => {
                    currentEditUserId = user.userID;
                    console.log('Current User: ' + user.userID);

                    (document.getElementById('FormEditUserFirstName') as HTMLInputElement).value = user.firstName || '';
                    (document.getElementById('FormEditUserLastName') as HTMLInputElement).value = user.lastName || '';
                    (document.getElementById('FormEditUserPassword') as HTMLInputElement).value = '';

                });


                // Delete User Button
                tableItemDeleteButton?.addEventListener('click', async (event) => {
                    console.log('Delete-Button pressed');
                    const response = await fetch(`http://localhost:80/api/users/${user.userID}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    this.init();
                });


            });

        } else {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }


        // Event Listener hinzufügen
        linkBackToStartingPage?.addEventListener('click', (event) => {
            const startingPagePOM = new StartingPagePOM();
            startingPagePOM.init();
        });

        linkImpressum?.addEventListener('click', (event) => {
            const impressumPOM = new ImpresssumPOM();
            impressumPOM.init();
        });

        linkUserManagemant?.addEventListener('click', (event) => {
            const userManagemantPOM = new UserManagemantPOM();
            userManagemantPOM.init();
        });

        logoutButton.addEventListener('click', async (event) => {
            console.log("logoutButton pressed");
            event.preventDefault();

            const applicationManager = ApplicationManager.getInstance();
            applicationManager.logOut();

        })

        // add new user
        formAddUser.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Add-User-Button pressed");

            const userIdInput = (document.getElementById('FormAddUserUsername') as HTMLInputElement).value;
            const firstNameInput = (document.getElementById('FormAddUserFirstName') as HTMLInputElement).value;
            const lastNameInput = (document.getElementById('FormAddUserLastName') as HTMLInputElement).value;
            const passwordInput = (document.getElementById('FormAddUserPassword') as HTMLInputElement).value;



            const applicationManager = ApplicationManager.getInstance();

            const response = await fetch('http://localhost:80/api/users', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    userID: userIdInput,
                    password: passwordInput,
                    firstName: firstNameInput,
                    lastName: lastNameInput
                })
            })

            if (!response.ok) {
                applicationManager.showToast("User already exists", "rgb(197, 71, 71)")
                return null
            }

            formAddUser.reset();

            applicationManager.showToast("Successfully created user", "rgb(72, 194, 72)") //call Methode to show toast message

            this.init();
        })

        // Ansatz von https://stackoverflow.com/questions/26863003/how-to-reset-the-bootstrap-modal-when-it-gets-closed-and-open-it-fresh-again An Bootstrap 5 angepasst durch ChatGPT
        const modalElement = document.getElementById('exampleModal');
        if (modalElement) {
            modalElement.addEventListener('hidden.bs.modal', function () {
                const usernameInput = document.getElementById('FormAddUserUsername') as HTMLInputElement;
                const firstNameInput = document.getElementById('FormAddUserFirstName') as HTMLInputElement;
                const lastNameInput = document.getElementById('FormAddUserLastName') as HTMLInputElement;
                const passwordInput = document.getElementById('FormAddUserPassword') as HTMLInputElement;

                usernameInput.value = "";
                firstNameInput.value = "";
                lastNameInput.value = "";
                passwordInput.value = "";
            });
        }

        // PUT Methode to upadte user
        const tableFormEditUserSubmit = document.getElementById('FormEditUserSubmit') as HTMLButtonElement;

        tableFormEditUserSubmit.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log('Edit-Button pressed');

            if (!currentEditUserId) return;

            const firstNameInput = (document.getElementById('FormEditUserFirstName') as HTMLInputElement).value;
            const lastNameInput = (document.getElementById('FormEditUserLastName') as HTMLInputElement).value;
            const passwordInput = (document.getElementById('FormEditUserPassword') as HTMLInputElement).value;
            console.log('sending request...')
            const response = await fetch(`http://localhost:80/api/users/${currentEditUserId}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    userID: currentEditUserId,
                    password: passwordInput,
                    firstName: firstNameInput,
                    lastName: lastNameInput
                })
            });
            console.log('request send!')

            currentEditUserId = null;
            this.init();
        });


    }
}