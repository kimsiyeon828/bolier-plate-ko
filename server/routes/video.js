const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    
     cb(null, 'uploads/')
    
    },
    
    filename: (req, file, cb) => {
    
       cb(null, `${Date.now()}_${file.originalname}`)
    
    }
    
})
    
    const fileFilter = (req, file, cb) => {
    
     // mime type 체크하여 원하는 타입만 필터링
    
    if (file.mimetype == 'video/mp4' ) {
    
        cb(null, true);
    
    } else {
    
        cb({msg:'mp4 파일만 업로드 가능합니다.'}, false);
    
    }
}
    
    
    
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")



//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {

    upload(req, res, err => {
   
    if(err) {
        return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
   
});

router.post('/uploadVideo', (req, res) => {

    //비디오 정보들을 저장한다.
    const video = new Video(req.body)
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        res.status(200).json({ success: true })
    })
    

   
});

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성하고 비디오 러닝 타임도 가져오기

    let filePath = ""
    let fileDuration = ""
    
    ffmpeg.setFfmpegPath('C:\\Users\\e1\\Desktop\\sykim\\ffmpeg\\bin\\ffmpeg.exe')

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.log(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    })


    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    .on('error', function (err) {
        console.error(err);
        return res.json({ success: false, err });})
    })
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename:'thumbnail-%b.png'
    })
   
});   
   
module.exports = router;
