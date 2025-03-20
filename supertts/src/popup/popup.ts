// This file contains the TypeScript code for the popup. It handles user interactions and communicates with the background script.
import { KokoroTTS, TextSplitterStream } from "kokoro-js";

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', async () => {
            try {
                const script = `
                    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
                        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                        return new (P || (P = Promise))(function (resolve, reject) {
                            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    };
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
                            }
                        })();

                        // Next, add text to the stream. Note that the text can be added at different times.
                        // For this example, let's pretend we're consuming text from an LLM, one word at a time.
                        const text = "BOMBACLAAT!";
                        const tokens = text.match(/\\s*\\S+/g);
                        if (tokens) {
                            for (const token of tokens) {
                                splitter.push(token);
                                await new Promise((resolve) => setTimeout(resolve, 10));
                            }
                        }

                        // Finally, close the stream to signal that no more text will be added.
                        splitter.close();
                    })().catch(console.error);
                `;

                    if (tabs[0]) {
                        const tabId = tabs[0].id;
                        if (tabId) {
                    if (tabId) {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            func: (script) => {
                                var __awaiter = (thisArg: any = {}, _arguments: any, P: PromiseConstructor, generator: any) => {
                                    function adopt(value: any) { return value instanceof P ? value : new P(function (resolve: (arg0: any) => void) { resolve(value); }); }
                                    return new (P || (P = Promise))(function (resolve: (arg0: any) => any, reject: (arg0: any) => void) {
                                        function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                                        function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                                        function step(result: { done: any; value: any; }) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                                        step((generator = generator.apply(thisArg, _arguments || [])).next());
                                    });
                                };
                                eval(script);
                            },
                            args: [script]
                        });
                    }
                });
            } catch (error) {
                console.error('Error loading module:', error);
            }
        });
    }
});