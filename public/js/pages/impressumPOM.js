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
import { StartingPagePOM } from "./StartPagePOM.js";
import { UserManagemantPOM } from "./UserManagementPagePOM.js";
export class ImpresssumPOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const appContent = document.getElementById('appContent');
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
            yield AbstractPOM.showPage('./html/ImpressumPage.html');
            // DOM-Elemente 
            const linkBackToStartingPage = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            const logoutButton = document.getElementById('LinkLogout');
            const linkUserManagemant = document.getElementById('LinkUserManagement');
            // Event Listener hinzufügen
            linkBackToStartingPage === null || linkBackToStartingPage === void 0 ? void 0 : linkBackToStartingPage.addEventListener('click', (event) => {
                event.preventDefault();
                const startingPagePOM = new StartingPagePOM();
                startingPagePOM.init();
            });
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                event.preventDefault();
                const impressumPOM = new ImpresssumPOM();
                impressumPOM.init();
            });
            logoutButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log("logoutButton pressed");
                event.preventDefault();
                const applicationManager = ApplicationManager.getInstance();
                applicationManager.loadLandingPage();
            }));
            linkUserManagemant === null || linkUserManagemant === void 0 ? void 0 : linkUserManagemant.addEventListener('click', (event) => {
                event.preventDefault();
                const userManagemantPOM = new UserManagemantPOM();
                userManagemantPOM.init();
            });
        });
    }
}
