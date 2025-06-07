import { ApplicationManager } from "../ApplicationManager.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { ImpresssumPOM } from "./impressumPOM.js";
import { UserManagemantPOM } from "./UserManagementPagePOM.js";
import { AbstractPOM } from "./abstractPOM.js";

export class StartingPagePOM {
    private containerId: string;

    constructor(containerId: string = 'appContent') {
        this.containerId = containerId;
    }

    public async init(): Promise<void> {
        const appContent = document.getElementById(this.containerId);
        const applicationManager = ApplicationManager.getInstance(); // Instance of ApplicationManager to make method calls

        /*
        try {
            const response = await fetch('./html/startingPage.html',);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const htmlContent = await response.text();

            if (appContent) {
                appContent.innerHTML = '';
                appContent.innerHTML = htmlContent;
            } else {
                console.error(`Container with id "${this.containerId}" not found.`);
            }
        } catch (error) {
            console.error('Failed to load StartingPage:', error);
        }
        */

        // show HTML 
        await AbstractPOM.showPage('./html/startingPage.html');
        


        

        // DOM-Elemente abrufen
        const logoutButton = document.getElementById('LinkLogout') as HTMLElement;
        const userCount = document.getElementById('UserCount') as HTMLSpanElement;
        const linkImpressum = document.getElementById('LinkImpressum') as HTMLAnchorElement;
        const linkUserManagemant = document.getElementById('LinkUserManagement') as HTMLAnchorElement;
        const linkEditUserData = document.getElementById('StartPageLinkUserManagement') as HTMLAnchorElement;


        // Event listener for the Impressum link
        linkImpressum?.addEventListener('click', (event) => {
            event.preventDefault();
            const impressumPOM = new ImpresssumPOM();
            impressumPOM.init();
        });

        linkUserManagemant?.addEventListener('click', (event) => {
            event.preventDefault();
            const userManagemantPOM = new UserManagemantPOM();
            userManagemantPOM.init();
        });

        linkEditUserData?.addEventListener('click', (event) => {
            event.preventDefault();
            const userManagemantPOM = new UserManagemantPOM();
            userManagemantPOM.init();
        });

        // Logout button event listener
        logoutButton?.addEventListener('click', async (event) => {
            console.log("logoutButton pressed");
            applicationManager.loadLandingPage();
        });


        userCount.innerHTML = await applicationManager.getUserNumber();

        const currentUser = applicationManager.getCurrentUser();

        if (currentUser && currentUser.firstName) {
            const alertElement = document.querySelector('.alert.alert-success');
            if (alertElement) {
                alertElement.innerHTML = `Hallo ${currentUser.firstName}. Wir haben aktuell <span id="UserCount">${applicationManager.getUserNumber()}</span> Benutzer.`;
            }

            const heading = document.querySelector('.container.mt-5 h1');
            if (heading) {
                heading.textContent = `Willkommen, ${currentUser.firstName}!`;
            }
        }
    }
}
