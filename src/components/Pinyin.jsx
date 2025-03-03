import { use, useEffect } from "react";

export default function Pinyin() {
    function convertInput() {
        const inputText = document.getElementById('inputText');
        let text = inputText.value;
        // console.log(text);
        // console.log(/^[\u4e00-\u9fff\s]+$/.test(text));
        if (/^[\u4e00-\u9fff\s]+$/.test(text)) {
            text = PinyinHelper.convertToPinyinString(text, '', PinyinFormat.WITH_TONE_MARK);
            document.getElementById('inputText').value = text;
        }
        text = pinyinify(text);
        document.getElementById('inputText').value = text;
    }

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.target === document.getElementById('inputText') && event.key === 'Enter') {
                event.preventDefault(); // Prevents the default action of adding a new line
                // console.log("enter pressed for convert");
                convertInput();

            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <section id="pinyin">
            <h1>Beta: Chinese Character and Pinyin Converter</h1>
            <textarea className="px-[10px] py-[5px]" id="inputText" placeholder="Enter Chinese characters(unlimited) or Pinyin with numbers(recommended converting 1 at a time)" width="100%" style={{ width: "-webkit-fill-available", height: "100px", outline: "1px solid red" }}></textarea>
            <button id="convertButton" onClick={() => { convertInput() }} className="inline-flex h-12 items-center justify-center rounded-md bg-purple-950 px-6 font-medium text-neutral-50 transition active:scale-110 ">Convert</button>
        </section>
    );
}

