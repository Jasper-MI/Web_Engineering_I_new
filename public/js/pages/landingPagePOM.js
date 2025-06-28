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
import { ImpresssumLogedOutPOM } from "./impressumLogedOutPOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";
export class LandingPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const appContent = document.getElementById('appContent');
            // show HTML
            yield AbstractPOM.showPage('./html/landingPage.html');
            // DOM-Elemente abrufen
            const formSignup = document.getElementById('FormSignup');
            const formLogin = document.getElementById('FormLogin');
            console.log(formSignup); // nur test
            const linkShowSignupDialog = document.getElementById('LinkShowSignupDialog');
            const linkShowLoginDialog = document.getElementById('LinkShowLoginDialog');
            const linkImpressum = document.getElementById('LinkImpressum');
            const buttonSignupUser = document.getElementById('ButtonSignupUser');
            const buttonLoginUser = document.getElementById('ButtonLoginUser');
            // Event Listener hinzufügen
            linkShowSignupDialog === null || linkShowSignupDialog === void 0 ? void 0 : linkShowSignupDialog.addEventListener('click', (event) => {
                event.preventDefault();
                if (formLogin && formSignup) {
                    formLogin.style.display = 'none';
                    formSignup.style.display = 'block';
                }
            });
            // Event Listener hinzufügen
            linkShowLoginDialog === null || linkShowLoginDialog === void 0 ? void 0 : linkShowLoginDialog.addEventListener('click', (event) => {
                event.preventDefault();
                if (formLogin && formSignup) {
                    formLogin.style.display = 'block';
                    formSignup.style.display = 'none';
                }
            });
            // Link ImpressumLogedOut
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                const appContent = document.getElementById('appContent');
                if (appContent) {
                    const impressumLogedOutPOM = new ImpresssumLogedOutPOM();
                    appContent.innerHTML = '';
                    impressumLogedOutPOM.init();
                }
            });
            // Button --> Signup new user
            formSignup.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                console.log('Signup Button pressed');
                const userIdInput = document.getElementById('FormSignupUsername').value;
                const firstNameInput = document.getElementById('FormSignupFirstName').value;
                const lastNameInput = document.getElementById('FormSignupLastName').value;
                const passwordInput = document.getElementById('FormSignupPassword').value;
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
                formSignup === null || formSignup === void 0 ? void 0 : formSignup.reset(); // clear form after submit
                // Switch to login form after registration
                /*
                if (formLogin && formSignup) {
                    formLogin.style.display = 'block';
                    formSignup.style.display = 'none';
                }
                */
                applicationManager.showToast("Successfully created user", "rgb(72, 194, 72)"); //call Methode to show toast message
            }));
            // Button --> Login existing user
            formLogin === null || formLogin === void 0 ? void 0 : formLogin.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const userNameInput = document.getElementById('FormLoginUsername').value;
                const passwordInput = document.getElementById('FormLoginPassword').value;
                const applicationManager = ApplicationManager.getInstance();
                const response = yield fetch('http://localhost:80/api/login', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(userNameInput + ':' + passwordInput)
                    }
                });
                if (!response.ok) {
                    console.log("Wrong username or password");
                    applicationManager.showToast("Wrong username or password", "rgb(197, 71, 71)");
                    return null;
                }
                formLogin === null || formLogin === void 0 ? void 0 : formLogin.reset(); // clear form after submit
                applicationManager.showToast("Successfully logged in", "rgb(72, 194, 72)"); //call Methode to show toast message
                // Then show the starting page
                // First clear the current page
                const appContent = document.getElementById('appContent');
                if (appContent) {
                    const startingPage = new StartingPagePOM(); // Create a new instance of StartingPage
                    appContent.innerHTML = ''; // Clear the current content
                    startingPage.init(); // Show startingPage
                }
            }));
        });
    }
}
