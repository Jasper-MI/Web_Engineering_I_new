import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";
import { UserManagemantPOM } from "./UserManagementPagePOM.js";

export class ImpresssumPOM {
    
    public async init(): Promise<void> {

        const appContent = document.getElementById('appContent') as HTMLElement;

        /*
        try {
            const response = await fetch('./html/ImpressumPage.html',); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const htmlContent = await response.text();

            if (appContent) {
                appContent.innerHTML = '';
                appContent.innerHTML = htmlContent;
            } else {
                console.error(`Container with id=appContent not found.`);
            }
        } catch (error) {
            console.error('Failed to load Impressum:', error);
        }
        */

        // show HTML
        await AbstractPOM.showPage('./html/ImpressumPage.html');

        // DOM-Elemente 
        const linkBackToStartingPage = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');
        const logoutButton = document.getElementById('LinkLogout') as HTMLElement;
        const linkUserManagemant = document.getElementById('LinkUserManagement') as HTMLAnchorElement;


        // Event Listener hinzufügen
        linkBackToStartingPage?.addEventListener('click', (event) => {
            event.preventDefault();
            const startingPagePOM = new StartingPagePOM();
            startingPagePOM.init();
        });

        linkImpressum?.addEventListener('click', (event) => {
            event.preventDefault();
            const impressumPOM = new ImpresssumPOM();
            impressumPOM.init();
        });

        logoutButton.addEventListener('click', async (event) => {
            console.log("logoutButton pressed")
            event.preventDefault();

            const applicationManager = ApplicationManager.getInstance();
            applicationManager.loadLandingPage()
        
        })

        linkUserManagemant?.addEventListener('click', (event) => {
            event.preventDefault();
            const userManagemantPOM = new UserManagemantPOM();
            userManagemantPOM.init();
        });

    }
}