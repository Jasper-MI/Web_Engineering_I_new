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
import { ImpresssumPOM } from "./impressumPOM.js";
import { UserManagemantPOM } from "./UserManagementPagePOM.js";
import { AbstractPOM } from "./abstractPOM.js";
export class StartingPagePOM {
    constructor(containerId = 'appContent') {
        this.containerId = containerId;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield AbstractPOM.showPage('./html/startingPage.html');
            // DOM-Elemente abrufen
            const logoutButton = document.getElementById('LinkLogout');
            const userCount = document.getElementById('UserCount');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkUserManagemant = document.getElementById('LinkUserManagement');
            const linkEditUserData = document.getElementById('StartPageLinkUserManagement');
            // Event listener for the Impressum link
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                event.preventDefault();
                const impressumPOM = new ImpresssumPOM();
                impressumPOM.init();
            });
            linkUserManagemant === null || linkUserManagemant === void 0 ? void 0 : linkUserManagemant.addEventListener('click', (event) => {
                event.preventDefault();
                const userManagemantPOM = new UserManagemantPOM();
                userManagemantPOM.init();
            });
            linkEditUserData === null || linkEditUserData === void 0 ? void 0 : linkEditUserData.addEventListener('click', (event) => {
                event.preventDefault();
                const userManagemantPOM = new UserManagemantPOM();
                userManagemantPOM.init();
            });
            // Logout button event listener
            logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log("logoutButton pressed");
                applicationManager.loadLandingPage();
            }));
            userCount.innerHTML = yield applicationManager.getUserNumber();
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
        });
    }
}
