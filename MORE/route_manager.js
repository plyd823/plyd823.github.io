function importRoute(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith('.yaml')) {
        alert("Wasteland Error: Only .yaml or .yml files are accepted.");
        return;
    }

    reader.onload = function(e) {
        try {
            const content = e.target.result;
            // Use jsyaml to parse the file
            const importedData = jsyaml.load(content);

            if (Array.isArray(importedData)) {
                // Normalize the data: allow for both simple "ID" strings 
                // and complex {id: "ID", fast_travel: true} objects
                activeRoute = importedData.map(step => {
                    return typeof step === 'string' ? { id: step } : step;
                });

                currentStepIndex = 0;
                renderRoute();
                
                // Snap camera to start of the new route
                if (activeRoute.length > 0) {
                    selectStep(0);
                }
            }
        } catch (err) {
            console.error("YAML Parse Error:", err);
            alert("Broken YAML detected. Check your indentation!");
        }
    };

    reader.readAsText(file);
}