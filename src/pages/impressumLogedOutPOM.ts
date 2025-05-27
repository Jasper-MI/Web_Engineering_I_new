import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";

export class ImpresssumLogedOutPOM {
        public async init(): Promise<void> {

        const appContent = document.getElementById('appContent') as HTMLElement;

        /*
        try {
            const response = await fetch('./html/ImpressumLogedOut.html',); 
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
        await AbstractPOM.showPage('./html/ImpressumLogedOut.html');

        // DOM-Elemente 
        const linkBackToLandingPage = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');

        // Event Listener hinzufügen
        linkBackToLandingPage?.addEventListener('click', (event) => {
            event.preventDefault();
            const landingPagePOM = new LandingPagePOM();
            landingPagePOM.init();
        });

        linkImpressum?.addEventListener('click', (event) => {
            event.preventDefault();
            const impressumLogedOutPOM = new ImpresssumLogedOutPOM();
            impressumLogedOutPOM.init();
        });

    }
}
