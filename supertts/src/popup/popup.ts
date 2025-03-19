// This file contains the TypeScript code for the popup. It handles user interactions and communicates with the background script.
import { KokoroTTS, TextSplitterStream } from "kokoro-js";

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', async () => {
            try {
                const script = `
                    (async () => {
                        const { KokoroTTS, TextSplitterStream } = await import("kokoro-js");

                        const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
                        const tts = await KokoroTTS.from_pretrained(model_id, {
                            dtype: "fp32", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
                            device: "wasm", // Explicitly set the device to "wasm"
                        });

                        // First, set up the stream
                        const splitter = new TextSplitterStream();
                        const stream = tts.stream(splitter);
                        (async () => {
                            let i = 0;
                            for await (const { text, phonemes, audio } of stream) {
                                console.log({ text, phonemes });
                                audio.save(\`audio-\${i++}.wav\`);
                            }
                        })();

                        // Next, add text to the stream. Note that the text can be added at different times.
                        // For this example, let's pretend we're consuming text from an LLM, one word at a time.
                        const text = "BOMBACLAAT!";
                        const tokens = text.match(/\\s*\\S+/g);
                        for (const token of tokens) {
                            splitter.push(token);
                            await new Promise((resolve) => setTimeout(resolve, 10));
                        }

                        // Finally, close the stream to signal that no more text will be added.
                        splitter.close();
                    })().catch(console.error);
                `;

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0].id) {
                        chrome.scripting.executeScript({
                            target: { tabId: tabs[0].id },
                            func: () => {
                                (async () => {
                                    const { KokoroTTS, TextSplitterStream } = await import("kokoro-js");

                                    const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
                                    const tts = await KokoroTTS.from_pretrained(model_id, {
                                        dtype: "fp32", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
                                        device: "wasm", // Explicitly set the device to "wasm"
                                    });

                                    // First, set up the stream
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
                                    const text = "BOMBACLAAT!";
                                    const tokens = text.match(/\s*\S+/g);
                                    for (const token of tokens) {
                                        splitter.push(token);
                                        await new Promise((resolve) => setTimeout(resolve, 10));
                                    }

                                    // Finally, close the stream to signal that no more text will be added.
                                    splitter.close();
                                })().catch(console.error);
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Error loading module:', error);
            }
        });
    }
});