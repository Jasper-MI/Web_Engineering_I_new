export class AbstractPOM {

    public static async showPage(path: string): Promise<void> {
        

        const appContent = document.getElementById('appContent');

        try {
            const response = await fetch(path, );
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const htmlContent = await response.text();

            if(appContent){
                appContent.innerHTML = '';
                appContent.innerHTML = htmlContent;
            } else {
                console.error(`Container with id "appContent" not found.`);
            }
        } catch (error) {
            console.error("Failed to showPage with path: " + path);
        }


        
    }


}