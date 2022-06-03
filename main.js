function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}
function preload(){

}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}

function modelLoaded(){
  console.log("modelLoaded");

}
var previousResult=" ";

function gotResult(error,results){
if(error){
  console.error(error);
}
else{
  if((results[0].confidence>0.5)&&(previousResult!=results[0].label) ){
console.log(results);
previousResult=results[0].label;
var synth=window.speechSynthesis;
speakData="Object detected is- "+results[0].label;
var Utterthis=new SpeechSynthesisUtterance(speakData);
synth.speak(Utterthis);
document.getElementById("result_obj_name").innerHTML=results[0].label;
document.getElementById("result_obj_acc").innerHTML=results[0].confidence.toFixed(3);
  }
}
}