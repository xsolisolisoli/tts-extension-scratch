// This file contains the TypeScript code for the popup. It handles user interactions and communicates with the background script.
import { KokoroTTS, TextSplitterStream } from "kokoro-js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('Getting button');
    const button = document.getElementById('myButton');
    console.log('Button:', button);
    if (button) {
        button.addEventListener('click', async () => {
            console.log('Setting up model...')
            const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
            const tts = await KokoroTTS.from_pretrained(model_id, {
            dtype: "fp32", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
            // device: "webgpu", // Options: "wasm", "webgpu" (web) or "cpu" (node).
            });

            console.log('Setting up Splitter...')
            const splitter = new TextSplitterStream();
            const stream = tts.stream(splitter);
            (async () => {
            let i = 0;
            for await (const { text, phonemes, audio } of stream) {
                console.log({ text, phonemes });
                audio.save(`audio-${i++}.wav`);
            }
            })();

            // Next, add text to the stream. Note that the text can be added at different times.
            // For this example, let's pretend we're consuming text from an LLM, one word at a time.
            const text = "TestString!";
            const tokens = text.match(/\s*\S+/g);
            for (const token of tokens) {
            splitter.push(token);
            await new Promise((resolve) => setTimeout(resolve, 10));
            }

            // Finally, close the stream to signal that no more text will be added.
            splitter.close();
        });
    }
});