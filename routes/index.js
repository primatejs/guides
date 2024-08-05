import ffmpeg from "fluent-ffmpeg";

export default {
  get() {
    ffmpeg("/tmp/test.avi")
      .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
      });
    return "hi";
  }
}
