// NOTE: You may, but do not have to, modify this file, such as to create other
// classes or to call methods on `App`. You may not add any global state
// variables.
const app = new App();

if(typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {
    var resumeAudio = function() {
        if(typeof g_WebAudioContext == "undefined" || g_WebAudioContext == null) return;
        if(g_WebAudioContext.state == "suspended") g_WebAudioContext.resume();
        document.removeEventListener("click", resumeAudio);
    };
    document.addEventListener("click", resumeAudio);
}

