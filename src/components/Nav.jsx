import { useEffect } from "react";

export default function Nav() {
    useEffect(() => {
        // Base URL for the PDF viewer
        const PDFUrl = 'https://mozilla.github.io/pdf.js/legacy/web/viewer.html?file=';
        const baseUrl = 'https://cs235-fall2024-77b6fa.gitlab.io/';
        // Get all anchor tags within the paragraph
        const links = Array.from(document.querySelectorAll('#pdf-views a:not([self_made])'));
        // Loop through each link and update its href attribute
        links.forEach(function (link) {
            // Extract the file name from the current href attribute
            const fileName = link.getAttribute('href');
            let str = PDFUrl + baseUrl + encodeURIComponent(fileName);
            link.setAttribute('href', str);
        });
        document.getElementById('doc').href = PDFUrl + encodeURIComponent(document.getElementById('doc').href);
        // console.log('once');
    }, []);

    function toggleNav() {
        const sideNav = document.getElementById('sideNav');
        sideNav.classList.toggle('active');
    }


    return (
        <>
            {/* <!-- Hamburger Icon --> */}
            <div className="hamburger" id="hamburger">
                <input type="checkbox" onClick={toggleNav} />
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* <!-- Side Navigation Menu --> */}
            <nav className="side-nav" id="sideNav">
                <div className="nav-box">
                    <div className="nav-title">
                        Temp<br />Short Link:<wbr />
                    </div>
                    <p>
                        <a href="https://7i.se/" target="_blank">-7i.se</a><br />
                        <a href="https://typit.in/" target="_blank">-typit</a><br />
                    </p>
                </div>

                <div className="nav-box">
                    <div className="nav-title">
                        Dictionaries:<wbr />
                    </div>
                    <p>
                        <a href="https://www.pleco.com/" target="_blank">-Pleco</a><br />
                        <a href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=1" target="_blank">-MDBG</a><br />
                        <a href="https://mandarinspot.com/dict?phs=pinyin&sort=freq" target="_blank">-mandarinSpot</a><br />
                    </p>
                </div>
                {/* https://mozilla.github.io/pdf.js/legacy/web/viewer.html?file= */}
                <div className="nav-box">
                    <div className="nav-title">
                        Chin303Pdf:<wbr />
                    </div>
                    <p id="pdf-views">
                        <a href="https://docs.google.com/document/d/11ZoqP_I9um_QFqZEMOlL_RXFGfb0QTMNc-hBGt7tzAw/export?format=pdf" id="doc" self_made="true" target="_blank">-taoyuanming-doc</a><br />
                        <a href="/taoyuanming-edited.pdf" target="_blank">-taoyuanming-edit</a><br />
                        <a href="/Chin303_textBooklet-bookmarked.pdf" target="_blank">-classical-chinese-read</a><br />
                        <a href="/Chin303_glossary-bookmarked.pdf" target="_blank">-Gloss + outline</a><br />
                        <a href="/303.html" self_made="true" target="_blank">-Incomplete Dict</a><br />
                        <a href="/Chin303_grammar.pdf" target="_blank">-grammar</a><br />
                        <a href="/Chin303_analysis.pdf" target="_blank">-analysis</a><br />
                        <a href="/Chin303_exercise.pdf" target="_blank">-exercises</a><br />
                    </p>
                </div>
                <div style={{ verticalAlign: "start", display: "flex", justifyContent: "center", }} className="nav-box">
                    <a href="https://quizlet.com/user/greenstory/folders/a-trip-to-china-traditional/sets" target="_blank">Quizlet(not 100% right)
                        <br /> A Trip To China Flashcards-greenstory</a>
                </div>
                <div style={{ verticalAlign: "start", display: "flex", justifyContent: "center", }} className="nav-box">
                    <a href="https://materials1.chineseforall.org/Webmaterials/toc.html" target="_blank">Webmaterial</a>
                </div>
                <div className="nav-box">
                    <div className="nav-title">
                        AdBlockers:<wbr />
                    </div>
                    <p>
                        <a href="https://github.com/gorhill/uBlock" target="_blank">-uBlock Origin</a><br />
                        <a href="https://github.com/AdguardTeam" target="_blank">-AdGuard</a><br />
                        <a href="https://apps.apple.com/us/app/ad-block-one-tube-ad-blocker/id1491889901" target="_blank">-Ad Block One ios</a>
                    </p>

                </div>
                <div className="nav-box">
                    <div className="nav-title">
                        Films<br />(with ads):<wbr />
                    </div>
                    <p>
                        <a href="https://asianc.sh" target="_blank">-Dramacool(ch/kr/jp/th)</a><br />
                        <a href="https://www.iyf.tv" target="_blank">-爱壹帆</a><br />
                        <a href="https://xiaoxintv.com" target="_blank">-小宝影院</a><br />
                        <a href="https://freemoviesfull.cc" target="_blank">-FreeMovies EN</a><br />
                    </p>
                </div>
                <div className="nav-box">
                    <div className="nav-title">
                        Manhua<br />(ads?):<wbr />
                    </div>
                    <p>
                        <a href="https://www.kuaikanmanhua.com" target="_blank">-快看漫画 CN</a><br />
                        <a href="https://manga.bilibili.com/" target="_blank">-bilibili漫画 CN</a><br />
                    </p>
                </div>
                <div className="nav-box">
                    <div className="nav-title">
                        Media:<br /><wbr />
                    </div>
                    <p>
                        <a href="https://douyin.com" target="_blank">-抖音</a><br />
                        <a href="https://youtube.com" target="_blank">-YouTube</a><br />
                        <a href="https://open.spotify.com/" target="_blank">-Spotify</a><br />
                        <a href="https://soundcloud.com/" target="_blank">-Soundcloud</a><br />
                        <a href="https://music.163.com/" target="_blank">-Netease163</a><br />
                    </p>
                </div>
            </nav>
        </>
    )
}