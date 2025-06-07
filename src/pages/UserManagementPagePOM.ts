import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { ImpresssumPOM } from "./impressumPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";
//import  { UserManagemantPOM } from "./userManagemantPOM.js";

export class UserManagemantPOM {
    public async init(): Promise<void> {

        // show HTML
        await AbstractPOM.showPage('./html/userManagement.html');

        // DOM-Elemente 
        const linkBackToStartingPage = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');
        const linkUserManagemant = document.getElementById('LinkUserManagemant');
        const logoutButton = document.getElementById('LinkLogout') as HTMLElement;
        const tableUsersBody = document.getElementById('TableUsersBody') as HTMLTableElement;

        // show Table with registered users
        const response = await fetch('http://localhost:80/api/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            var users = await response.json();
            users.forEach((user: { userID: string; firstName: string; lastName: string; }) => {
                var rowTr = document.createElement("tr");
                
                var cellUsername = document.createElement("td");
                var cellUsernameText = document.createTextNode(user.userID);
                cellUsername.appendChild(cellUsernameText);
                cellUsername.setAttribute('id', `${user.userID}TableItemUsername`);
                rowTr.appendChild(cellUsername);
                

                var cellFirstName = document.createElement("td");
                if(user.firstName) {
                    var cellFirstNameText = document.createTextNode(user.firstName);
                    cellFirstName.appendChild(cellFirstNameText);
                }
                cellFirstName.setAttribute('id', `${user.userID}TableItemFirstName`);
                rowTr.appendChild(cellFirstName);

                var cellLastName = document.createElement("td");
                if(user.lastName) {
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

        } else  {
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
            console.log("logoutButton pressed")

            const applicationManager = ApplicationManager.getInstance();
            applicationManager.loadLandingPage()

        })

    }
}