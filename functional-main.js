
function chromaKeyTransform(canvasElement,_2dcontext){
    _2dcontext.putImageData(
      chromaKey(ImageData(_2dcontext
        , canvasElement.width, canvasElement.height
        )), 0, 0
    )
}

function chromaKey(imageData){
    var l = CanvasPixelArray(imageData).length / 4
    for (var i = 0; i < l; i++) {
        var r = imageData.data[i * 4 + 0];
        var g = imageData.data[i * 4 + 1];
        var b = imageData.data[i * 4 + 2];
        if (g > 100 && r > 100 && b < 43){
            imageData.data[i * 4 + 3] = 0;
        }
    }
    return imageData
}

function frameData(video){
    return video.getImageData(0, 0, video.videoWidth, video.videoHeight).data
}

function doLoad(){

    setInterval(timerCallback(
        chromaKeyTransform
        , document.getElementById("video")
        , document.getElementById("c1")
        , document.getElementById("c1").getContext('2d')
    ),0)


    setInterval(timerCallback(
        chromaKeyTransform
        , document.getElementById("video")
        , document.getElementById("c2")
        , document.getElementById("c2").getContext('2d')
    ),0)
}

function timerCallback(transform,video,destinationCanvas,destinationContext){
    return function(){
        if (video.paused || video.ended) {
          return;
        }
        write(video,destinationContext)
        chromaKeyTransform(destinationCanvas,destinationContext)
        // replace(destination,chromaKey(destination))
        // transform(video,destination)

    }
}

function replace(context,imageData){
    context.putImageData(imageData)

}

function write(source,destination){
    // console.log("copy",source,destination)
    destination.drawImage(source,0,0
      ,source.videoWidth/2
      ,source.videoHeight/2)
}

function ImageData(context,width,height){
  
    //***
    // return context.createImageData(
    //     width,
    //     height
    //   );
    // var t = context
    return context.getImageData(0, 0,
      width, height)


}

function CanvasPixelArray(frame){
    return frame.data
}

function CanvasRenderingContext2D(canvasElement){
    return canvasElement ?
      canvasElement.getContext("2d")
      : undefined // todo
}

// function Image(){
//       return canvasElement ?
//         canvasElement.getContext("2d")
//         : undefined // todo
// }x`