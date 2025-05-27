import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./abstractPOM.js";
import { ImpresssumLogedOutPOM } from "./impressumLogedOutPOM.js";
import { StartingPagePOM } from "./StartPagePOM.js";

export class LandingPagePOM {


    public async init(): Promise<void> {

        const appContent = document.getElementById('appContent') as HTMLElement;

        /*
        try {
            const response = await fetch('./html/landingPage.html',); 
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
            console.error('Failed to load StartingPage:', error);
        }
        */

        // show HTML
        await AbstractPOM.showPage('./html/landingPage.html');


        // DOM-Elemente abrufen
        const formSignup = document.getElementById('FormSignup') as HTMLFormElement;
        const formLogin = document.getElementById('FormLogin') as HTMLFormElement;
        console.log(formSignup); // nur test
        const linkShowSignupDialog = document.getElementById('LinkShowSignupDialog');
        const linkShowLoginDialog = document.getElementById('LinkShowLoginDialog');
        const linkImpressum = document.getElementById('LinkImpressum');
        const buttonSignupUser = document.getElementById('ButtonSignupUser');
        const buttonLoginUser = document.getElementById('ButtonLoginUser');


        // Event Listener hinzufügen
        linkShowSignupDialog?.addEventListener('click', (event) => {
            event.preventDefault();
            if (formLogin && formSignup) {
                formLogin.style.display = 'none';
                formSignup.style.display = 'block';
            }
        });

        // Event Listener hinzufügen
        linkShowLoginDialog?.addEventListener('click', (event) => {
            event.preventDefault();
            if (formLogin && formSignup) {
                formLogin.style.display = 'block';
                formSignup.style.display = 'none';
            }
        });

        // Link ImpressumLogedOut
        linkImpressum?.addEventListener('click', (event) =>{
            const appContent = document.getElementById('appContent');
            if (appContent) {
                const impressumLogedOutPOM = new ImpresssumLogedOutPOM();
                appContent.innerHTML = ''; 
                impressumLogedOutPOM.init(); 
            }
        });




        // Button --> Signup new user
        formSignup.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Signup Button pressed')

            const userNameInput = (document.getElementById('FormSignupUsername') as HTMLInputElement).value;
            const firstNameInput = (document.getElementById('FormSignupFirstName') as HTMLInputElement).value;
            const lastNameInput = (document.getElementById('FormSignupLastName') as HTMLInputElement).value;
            const passwordInput = (document.getElementById('FormSignupPassword') as HTMLInputElement).value;
            


            const applicationManager = ApplicationManager.getInstance();
            var checkUser = applicationManager.signupUser(userNameInput, firstNameInput, lastNameInput, passwordInput);

            if (!checkUser) { 
                applicationManager.showToast("User already exists", "rgb(197, 71, 71)")
                return null
            }


            formSignup?.reset(); // clear form after submit

            // Switch to login form after registration
            /*
            if (formLogin && formSignup) {
                formLogin.style.display = 'block';
                formSignup.style.display = 'none';
            }
            */

            applicationManager.showToast("Successfully created user", "rgb(72, 194, 72)") //call Methode to show toast message

        });


        // Button --> Login existing user
        formLogin?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const userNameInput = (document.getElementById('FormLoginUsername') as HTMLInputElement).value;
            const passwordInput = (document.getElementById('FormLoginPassword') as HTMLInputElement).value;

            const applicationManager = ApplicationManager.getInstance();

            // Log the user in --> Check if the name and password are correct
            var checkUser = applicationManager.login(userNameInput, passwordInput);

            if (!checkUser) {
                console.log("Wrong username or password")
                applicationManager.showToast("Wrong username or password", "rgb(197, 71, 71)")
                return null
            }


            formLogin?.reset(); // clear form after submit

            applicationManager.showToast("Successfully logged in", "rgb(72, 194, 72)") //call Methode to show toast message

            // Then show the starting page
            // First clear the current page
            const appContent = document.getElementById('appContent');
            if (appContent) {
                const startingPage = new StartingPagePOM(); // Create a new instance of StartingPage
                appContent.innerHTML = ''; // Clear the current content
                startingPage.init(); // Show startingPage
            }


        });

    }

}
