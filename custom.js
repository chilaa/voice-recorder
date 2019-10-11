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
        let formData = [];
        console.log(mediaRecorder)
        console.log(mediaRecorder.state);
        // visualize(stream);

        start.addEventListener('click', function() {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
        })

        pause.addEventListener('click', function() {
            mediaRecorder.pause()
            console.log(mediaRecorder.state)
        })

        resume.addEventListener('click',function() {
            mediaRecorder.resume()
            console.log(mediaRecorder.state)
        })

        stopMedia.addEventListener('click', function(){
            mediaRecorder.stop()
            console.log(mediaRecorder.state)
        })
        upload.addEventListener('click', function(){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200){
                    console.log(xhttp.responseText)
                }
            }
            xhttp.open("POST", "/save", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send('audio='+formData['blob_audio']);
            console.log(formData)
        })

        mediaRecorder.onstop = function(e) {     
            audio.controls = true
            let blob = new Blob(chunks, {'type' : 'audio/ogg; codecs=opus'})
            chunks = [];
            let audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log(audio.src)
            formData['blob_audio'] =  blob;
            stream.getTracks().forEach( track => track.stop() )


        }

        mediaRecorder.ondataavailable = function(e){
            chunks.push(e.data)
            console.log(chunks)
        }

        mediaRecorder.addEventListener('error', function(e){
            console.log(e)
        })

    })

}

start.addEventListener("click",startRecording);
resume.addEventListener('click', resumeRecording);
stopMedia.addEventListener('click', stopRecording);
pause.addEventListener('click', pauseRecording)
upload.addEventListener('click', uploadRecord);

function startRecording() {
    document.getElementById('start').classList.add('disabled')
    document.getElementById('stop').classList.remove('disabled')
    document.getElementById('pause').classList.remove('disabled')
    document.getElementById('resume').classList.add('disabled')
    document.getElementById('upload').classList.add('disabled')


}

function uploadRecord() {
}

function stopRecording() {
    document.getElementById('stop').classList.add('disabled')
    document.getElementById('start').classList.remove('disabled')
    document.getElementById('pause').classList.add('disabled')
    document.getElementById('upload').classList.remove('disabled')


}
function resumeRecording() {
    document.getElementById('stop').classList.remove('disabled')
    document.getElementById('resume').classList.add('disabled')
    document.getElementById('pause').classList.remove('disabled')

}

function pauseRecording() {
    document.getElementById('pause').classList.add('disabled')
    document.getElementById('resume').classList.remove('disabled')

}
