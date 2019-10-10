let start = document.getElementById("start");
let resume = document.getElementById("resume");
let stopMedia = document.getElementById("stop");
let upload = document.getElementById("upload");
let pause = document.getElementById("pause");


if (navigator.mediaDevices){
    console.log("is");

    let constraints = { audio: true};
    let chunks = [];

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){

        let mediaRecorder = new MediaRecorder(stream);
        console.log(mediaRecorder)
        console.log(mediaRecorder.state);
        // visualize(stream);

        console.log(start)
        start.addEventListener('click', function() {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
        })

        pause.addEventListener('clikc', function() {
            mediaRecorder.pause()
        })

        resume.addEventListener('click',function() {
            mediaRecorder.resume()
        })

        stopMedia.addEventListener('click', function(){
            mediaRecorder.stop()
            console.log(mediaRecorder.state)
        })

        mediaRecorder.onstop = function(e) {     
            let blob = new Blob(chunks, {'type' : 'audio/ogg; codecs=opus'})
            chunks = [];
            let audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log("stoped")

        }

        mediaRecorder.ondataavailable = function(e){
            chunks.push(e.data)
            console.log(chunks)
        }

        

    })

}

start.addEventListener("click",startRecording);
resume.addEventListener('click', resumeRecording);
stopMedia.addEventListener('click', stopRecording);
upload.addEventListener('click', uploadRecord);

function startRecording() {
    document.getElementById('start').classList.add('disabled')
    document.getElementById('stop').classList.remove('disabled')
    document.getElementById('pause').classList.remove('disabled')
}

function uploadRecord() {
}

function stopRecording() {

}
function resumeRecording() {
}
