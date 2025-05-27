import { LandingPagePOM } from "./pages/LandingPagePOM.js";
import { StartingPagePOM } from "./pages/StartPagePOM.js";
import { User } from "./domain/User.js";

export class ApplicationManager {

    private static instance: ApplicationManager;

    private toastMessage: HTMLElement | null = null;
    private toastMessageText: HTMLElement | null = null;

    private userMap: Map<string, User> = new Map<string, User>();
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
        this.userMap.set(adminUser.userId, adminUser);

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
    signupUser (useridInput: string, firstNameInput: string, lastNameInput: string,  passwordInput: string) {

        if (!useridInput || !passwordInput) {
            console.log("Please fill in all fields");
            return null;
        }

        
        for (const user of this.userMap.values()) {
            if (user.userId === useridInput) {
                console.log("User already exists");
                return null;
            }
        }
        

        const newUser: User = new User (
            useridInput,
            firstNameInput,
            lastNameInput,
            passwordInput
        );
        this.userMap.set(newUser.userId, newUser);
        console.log("New user added");

        console.log(this.userMap);
        return newUser;
    }
    

    // Methode --> Login existing user 
    login(useridInput: string, passwordInput: string): User | null { 
        for( const user of this.userMap.values()) {
            if (user.userId === useridInput && user.password === passwordInput) {
                console.log("User logged in successfully"); 
                this.currentUser = user;
                return user;
        }
    }
    return null;
}

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

    public getUserNumber(): string {
        return ApplicationManager.getInstance().userMap.size.toString();
    }

    public getRegisteredUsers(): Map<string, User> {
        return this.userMap;
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