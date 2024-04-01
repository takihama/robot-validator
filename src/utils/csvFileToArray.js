export const csvFileToArray = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        if (!file) {
            reject(new Error("A file should be passed"));
        }

        fileReader.onload = function (event) {
            const fileAsText = event.target.result;
            resolve(fileAsText.split("\n"));
        };

        fileReader.readAsText(file);
    });
};

export const csvFileWithHeadersToArray = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        if (!file) {
            reject(new Error("A file should be passed"));
        }

        fileReader.onload = function (event) {
            const fileAsText = event.target.result;
            const headerIdx = fileAsText.indexOf("\n");
            const csvHeader = fileAsText.slice(0, headerIdx).split(",");
            const csvRows = fileAsText.slice(headerIdx + 1).split("\n");
            const dataArray = csvRows.map((r) => {
                const cells = r.split(",");
                return csvHeader.reduce((acc, curr, index) => {
                    acc[curr] = cells[index];
                    return acc;
                }, {});
            });
            resolve(dataArray);
        };

        fileReader.readAsText(file);
    });
};
