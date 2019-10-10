let start = document.getElementById("start");
let resume = document.getElementById("resume");
let stop = document.getElementById("stop");
let upload = document.getElementById("upload");

console.log(navigator);
if (navigator.mediaDevices){
    console.log("is");

    let constraints = { audio: true};
    let chunks = [];

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        let mediaRecorder = new MediaRecorder(stream);
        visualize(stream);

        record.onClick = function() {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
        }
    })
}

start.addEventListener("click",startRecording);
resume.addEventListener('click', resumeRecording);
stop.addEventListener('click', stopRecording);
upload.addEventListener('click', uploadRecord);

function startRecording() {
}

function uploadRecord() {
}

function stopRecording() {

}
function resumeRecording() {
}
