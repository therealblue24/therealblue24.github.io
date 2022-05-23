function displayAd(filename) {
    $(document).ready(function(){
        $("img").attr("src", filename);
    });
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function getBetterRandom(max) {
    return getRandom(getRandom(max) * max);
}

function append(str) {
    let src_image = "https://therealblue24.github.io/john/img/";
    let png_extent = ".png";
    let res = src_image.concat(str);
    res = res.concat(png_extent);
    return res;
}

function defaultAdList() {
    const ads = ["doge", "euler", "got-leg", "jean", "mama_mia", "meta-meta", "something-else", "truttlecities", "wiki-1", "wiki-5", "winpe4"];
    return ads;
}

function generateAd(list) {
    let len = list.length;
    let num = getBetterRandom(len);
    let ad_name = append(list[num % len]);
    displayAd(ad_name);
}

function john() {
    generateAd(defaultAdList());
}