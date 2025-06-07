var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LandingPagePOM } from "./pages/LandingPagePOM.js";
import { StartingPagePOM } from "./pages/StartPagePOM.js";
import { User } from "./domain/User.js";
export class ApplicationManager {
    constructor() {
        this.toastMessage = null;
        this.toastMessageText = null;
        // private userMap: Map<string, User> = new Map<string, User>(); //not needed anymore
        //private userId: number = 0;
        this.currentUser = null;
        console.log("ApplicationManager constructor aufgerufen");
    }
    static getInstance() {
        if (!ApplicationManager.instance) {
            ApplicationManager.instance = new ApplicationManager();
        }
        return ApplicationManager.instance;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Application Manager initialized");
            this.toastMessage = document.getElementById('toastMessage');
            this.toastMessageText = document.getElementById('toastMessageText');
            // standard admin user
            const adminUser = new User("admin", "Manfred", "Mustermann", "123");
            const response = yield fetch('http://localhost:80/api/users', {
                method: 'POST',
                headers: { 'Conttent-Type': 'application/json' },
                body: JSON.stringify(adminUser)
            });
            if (response.ok) {
                const data = yield response.json();
                console.log("Rest-Server registriert: ", data);
            }
            yield this.loadLandingPage();
        });
    }
    // Loading Pages //
    loadLandingPage() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('LandingPage is loading');
            const landingPage = new LandingPagePOM();
            yield landingPage.init();
        });
    }
    loadStartPage() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('StartPage is loading');
            const startingPage = new StartingPagePOM();
            yield startingPage.init();
        });
    }
    // Methode --> Signup new user
    /*
    async signupUser (useridInput: string, firstNameInput: string, lastNameInput: string,  passwordInput: string) {
        
        const newUser = {
            userID: useridInput,
            password: passwordInput,
            firstName: firstNameInput,
            lastName: lastNameInput
        };

        const response = await fetch('http://localhost:80/api/users', {
            method: 'POST',
            headers: { 'Conttent-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });

        if(response.ok) {
            const data = await response.json();
            console.log("Rest-Server registriert: ", data);
        }
        
    }
        */
    // Methode --> Login existing user 
    /*
    async login(useridInput: string, passwordInput: string) {
        const response = await fetch('http://localhost:80/api/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic' + btoa(useridInput + ':' + passwordInput)
            }
        });
    }
    */
    // Methode --> show toast message
    showToast(message, color) {
        if (this.toastMessage && this.toastMessageText) {
            this.toastMessageText.innerHTML = message;
            this.toastMessage.style.backgroundColor = color;
            this.toastMessage.style.color = 'white'; // <--- Schriftfarbe weiß
            this.toastMessage.style.display = 'block';
            console.log(message + color);
            setTimeout(() => {
                this.toastMessage.style.display = "none";
            }, 3000);
        }
    }
    getUserNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:80/api/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = yield response.json();
                return Object.keys(data).length.toString();
            }
            else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        });
    }
}
// User-Class //
/* // als neue classe in scr/domain angelegt
class User {
    userId: string;
    firstName?: string;
    lastName?: string;
    password: string;

    constructor (userId: string, firstName: string, lastName: string, password: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
    
}
*/ 
