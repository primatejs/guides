import file from "@rcompat/fs/file";
import { mp4 } from "@rcompat/http/mime";
import spawn from "@rcompat/stdio/spawn";

const command = "ffmpeg";
const input = "-i pipe:0";
const flags = "-acodec aac -vcodec libx264 -movflags frag_keyframe+empty_moov";
const output = "-f mp4 pipe:1";
const repo = "primatejs/guides";
const url = `https://raw.githubusercontent.com/${repo}/ffmpeg/assets/test.avi`;

export default {
  async get(request) {
    const { stdout, stdin } = spawn(`${command} ${input} ${flags} ${output}`);

    (await fetch(url)).body.pipeTo(stdin);

    return new Response(stdout, { headers: { "content-type": mp4 }});
  }
}
