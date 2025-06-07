import { LandingPagePOM } from "./pages/LandingPagePOM.js";
import { StartingPagePOM } from "./pages/StartPagePOM.js";
import { User } from "./domain/User.js";

export class ApplicationManager {

    private static instance: ApplicationManager;

    private toastMessage: HTMLElement | null = null;
    private toastMessageText: HTMLElement | null = null;

    // private userMap: Map<string, User> = new Map<string, User>(); //not needed anymore
    //private userId: number = 0;
    private currentUser: User | null = null;

    private constructor() {
        console.log("ApplicationManager constructor aufgerufen");
    }

    public static getInstance(): ApplicationManager {
        if (!ApplicationManager.instance) {
            ApplicationManager.instance = new ApplicationManager();
        }
        return ApplicationManager.instance;
    }

    public getCurrentUser(): User | null { 
    return this.currentUser;
}
    public async init(): Promise<void> {
        
        console.log("Application Manager initialized");
        
        this.toastMessage = document.getElementById('toastMessage');
        this.toastMessageText = document.getElementById('toastMessageText')

        // standard admin user
        const adminUser = new User("admin", "Manfred" , "Mustermann" , "123");
        const response = await fetch('http://localhost:80/api/users', {
            method: 'POST',
            headers: { 'Conttent-Type': 'application/json'},
            body: JSON.stringify(adminUser)
        });

        if(response.ok) {
            const data = await response.json();
            console.log("Rest-Server registriert: ", data);
        }

        await this.loadLandingPage();

    }

    
    
    // Loading Pages //
    
    async loadLandingPage(): Promise<void> {
        console.log('LandingPage is loading');
        
        const landingPage = new LandingPagePOM();
        await landingPage.init();
    }
    
    async loadStartPage(){
        console.log('StartPage is loading');

        const startingPage = new StartingPagePOM();
        await startingPage.init();
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
    showToast(message: string, color: string) {
        if(this.toastMessage && this.toastMessageText){
            this.toastMessageText.innerHTML = message;
            this.toastMessage.style.backgroundColor = color;
            this.toastMessage.style.color = 'white'; // <--- Schriftfarbe weiß
            this.toastMessage.style.display = 'block';
            console.log(message + color);

            setTimeout(() => {
                this.toastMessage!.style.display = "none";
            }, 3000);
        }
    }

    public async getUserNumber(): Promise<string> {

        const response = await fetch ('http://localhost:80/api/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            const data = await response.json();
            return Object.keys(data).length.toString();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }

    /*
    public getRegisteredUsers(): Map<string, User> {
        return this.userMap;
    }
    */

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