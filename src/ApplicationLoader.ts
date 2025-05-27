import { ApplicationManager } from './ApplicationManager.js';


document.addEventListener('DOMContentLoaded', async () => {
    console.log("Application initialized");
    const applicationManager = ApplicationManager.getInstance();
    await applicationManager.init();

});
