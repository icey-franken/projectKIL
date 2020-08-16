const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const { Project } = require('../../db/models');

const { awsAccessId, awsSecret, awsRegion, awsBucket } = require('../../config').awsConfig

aws.config.setPromisesDependency();

aws.config.update({
    secretAccessKey: awsSecret,
    accessKeyId: awsAccessId,
    region: awsRegion
});

const s3 = new aws.S3();

async function uploadFile(source, targetName, res, imageArray, projectId) {
    console.log('preparing to upload...');
    console.log('source and target name:------------------------------------', source)
    await fs.readFile(source, function (err, filedata) {
        if (!err) {
            const putParams = {
                Bucket: 'destructables-storage-dev',
                Key: targetName,
                Body: filedata,
                ACL: 'public-read',
            };
            s3.putObject(putParams, async function (err, data) {
                if (err) {
                    console.log('Could nor upload the file. Error :', err);
                    return res.send({ success: false });
                }
                else {
                    fs.unlinkSync(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
                    let filenameAndType = source.split('uploads/')[1];
                    console.log('Successfully uploaded the file');
                    if (imageArray.includes(filenameAndType)) {
                        console.log('Ovewriting a file!');
                        imageArray = imageArray.filter((image) => {
                            return image !== filenameAndType
                        }
                        );
                    }
                    const fileUrl = `https://${awsBucket}.s3-${awsRegion}.amazonaws.com/${filenameAndType}`
                    imageArray.push(filenameAndType);
                    await Project.update({ images: imageArray }, { where: { id: projectId } });
                    return res.send({ fileUrl });
                }
            });
        }
        else {
            console.log({ 'err': err });
        }
    });
}

//The retrieveFile function
function retrieveFile(filename, res) {

    const getParams = {
        Bucket: 'destructables-storage-dev',
        Key: filename
    };

    s3.getObject(getParams, function (err, data) {
        if (err) {
            return res.status(400).send({ success: false, err: err });
        }
        else {
            return res.send(data.Body);
        }
    });
}

module.exports = { uploadFile, retrieveFile };
