export default function FeatureBox({ isUnlimited, handleToggleChange, loadIME, userC }) {

    const dictUrl = [
        'https://www.archchinese.com/chinese_english_dictionary.html?find=',
        'https://mandarinspot.com/dict?phs=pinyin&sort=rel&word=',
        'https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=1&wdqb=',
        'https://dict.revised.moe.edu.tw/search.jsp?word='
    ]
    function handleClickDictBtn(){
        const defineC = document.getElementById("defineC");
        const defaultShadow = defineC.style.boxShadow;
        const dictSelect = document.getElementById("dict-select");
        const dictValue = dictSelect.value;
        defineC.style.boxShadow = "0 0 1px 1px lightseagreen";
        setTimeout(() => {
            defineC.style.boxShadow = defaultShadow;            
        }, 50);
        setTimeout(() => {
            window.open(dictUrl[dictValue - 1] + userC, '_blank')
        }, 100);
    }
    return (
        <div className="featureBox">
            {/* <!-- Top flex row with two columns --> */}
            <div className="flex-row-top">
                <div className="flex-column">
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" id="removeLimit" checked={isUnlimited} onChange={handleToggleChange} />
                            <span className="slider"></span>
                        </label>
                        <span className="switch-label">Remove Limit</span>
                    </div>

                </div>
            </div>
            {/* <!-- Bottom flex column --> */}
            {/* onClick={() => { window.open(`https://www.archchinese.com/chinese_english_dictionary.html?find=${userC}`, '_blank') }} */}
            <div className="flex-column-bottom">
                <div>
                    <button className="font-[Arial] text-[13px] px-[5px] cursor-pointer" id="toggleInput" onClick={loadIME}>Load Online Input(minimal version)</button>
                    
                    <div className="dict-btn-container px-[0px] bg-[#f0f0f0] cursor-pointer inline-block" id="defineC">
                        <span className=" pl-[5px] inline-block" onClick={handleClickDictBtn}> Search</span> <select id="dict-select" name="dict-select" title="dict-select">
                                <option value="1">ArchCh</option>
                                <option value="2">MandrnSpot</option>
                                <option value="3">MDGB</option>
                                <option value="4">TW MOE Dict</option>
                            </select> <span className="pr-[5px]" onClick={handleClickDictBtn}>for current character: {userC}, {PinyinHelper.convertToPinyinString(userC, '', PinyinFormat.WITH_TONE_MARK)}</span>
                        {/* onClick={() => { window.open(`https://www.twpen.com/${userC}.html`, '_blank') }} */}
                        </div>
                    
                    <button className="px-[5px] bg-[#f0f0f0] cursor-pointer" id="strokeC" onClick={() => { window.open(`https://www.twpen.com/${userC}.html`, '_blank') }}>TWPEN筆順字典</button>
                </div>
                <div id="textBox">
                    <textarea id="textarea1" className="chinese px-[3px]" autoComplete="off" spellCheck="false" placeholder="Control+Shift to toggle Chinese input | Use number/space/left right arrows to select | , or . to go back or next page | Type here:"></textarea>
                </div>

            </div>
        </div>
    )
}