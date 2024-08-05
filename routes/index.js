import file from "@rcompat/fs/file";
import { mp4 } from "@rcompat/http/mime";
import spawn from "@rcompat/stdio/spawn";

const command = "ffmpeg";
const input = "-i pipe:0";
const flags = "-acodec aac -vcodec libx264 -movflags frag_keyframe+empty_moov";
const output = "-f mp4 pipe:1";
const filename = "/tmp/test.avi";

export default {
  get(request) {
    const { stdout, stdin } = spawn(`${command} ${input} ${flags} ${output}`);

    file(filename).stream().pipeTo(stdin);

    return new Response(stdout, { headers: { "content-type": mp4 }});
  }
}
