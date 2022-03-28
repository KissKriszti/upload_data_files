const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();



app.use(fileUpload());
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});


const uploads = path.join(`${__dirname}/../frontend/upload/`);

app.post("/", (req, res) => {
    // Upload image
    const picture = req.files.picture;
    const answer = {};

    if (picture) {
        picture.mv(`${uploads}${picture.name}`);
    }
    
    answer.pictureName = picture.name
    res.send(answer)

    // Upload data from form
/*     const formData = req.body;
    formData.image_name = picture.name;
    jsonData.push(formData);

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
 */
});

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});