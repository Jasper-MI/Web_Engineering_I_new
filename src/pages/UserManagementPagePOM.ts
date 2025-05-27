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
        const applicationManager = ApplicationManager.getInstance();
        const usersMap = applicationManager.getRegisteredUsers();

        for(const user of usersMap.values()) {
            var rowTr = document.createElement("tr");
            
            var cellUsername = document.createElement("td");
            var cellUsernameText = document.createTextNode(user.userId);
            cellUsername.appendChild(cellUsernameText);
            cellUsername.setAttribute('id', `${user.userId}TableItemUsername`);
            rowTr.appendChild(cellUsername);
            

            var cellFirstName = document.createElement("td");
            if(user.firstName) {
                var cellFirstNameText = document.createTextNode(user.firstName);
                cellFirstName.appendChild(cellFirstNameText);
            }
            cellFirstName.setAttribute('id', `${user.userId}TableItemFirstName`);
            rowTr.appendChild(cellFirstName);

            var cellLastName = document.createElement("td");
            if(user.lastName) {
            var cellLastNameText = document.createTextNode(user.lastName);
                cellLastName.appendChild(cellLastNameText);
            }
            cellLastName.setAttribute('id', `${user.userId}TableItemLastName`);
            rowTr.appendChild(cellLastName);

            var cellButtons = document.createElement("td");
            cellButtons.innerHTML = `
                <button id="${user.userId}TableItemEditButton" type="button" class="btn btn-success btn-edit">Edit</button>
                <button id="${user.userId}TableItemDeleteButton" type="button" class="btn btn-danger btn-delete">Delete</button>
            `;
            rowTr.appendChild(cellButtons);

            tableUsersBody.appendChild(rowTr);
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