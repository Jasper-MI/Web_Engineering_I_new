var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbstractPOM } from "./abstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
export class ImpresssumLogedOutPOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const appContent = document.getElementById('appContent');
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
            yield AbstractPOM.showPage('./html/ImpressumLogedOut.html');
            // DOM-Elemente 
            const linkBackToLandingPage = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            // Event Listener hinzufügen
            linkBackToLandingPage === null || linkBackToLandingPage === void 0 ? void 0 : linkBackToLandingPage.addEventListener('click', (event) => {
                event.preventDefault();
                const landingPagePOM = new LandingPagePOM();
                landingPagePOM.init();
            });
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                event.preventDefault();
                const impressumLogedOutPOM = new ImpresssumLogedOutPOM();
                impressumLogedOutPOM.init();
            });
        });
    }
}
