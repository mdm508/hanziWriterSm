// this function runs when the DOM is ready, i.e. when the document has been parsed
document.addEventListener("DOMContentLoaded", handleQuery);

function renderFanningStrokes(target, strokes) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '75px';
    svg.style.height = '75px';
    svg.style.border = '1px solid #EEE'
    svg.style.marginRight = '3px'
    target.appendChild(svg);
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // set the transform property on the g element so the character renders at 75x75
    var transformData = HanziWriter.getScalingTransform(75, 75);
    group.setAttributeNS(null, 'transform', transformData.transform);
    svg.appendChild(group);

    strokes.forEach(function(strokePath) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', strokePath);
        // style the character paths
        path.style.fill = '#555';
        group.appendChild(path);
    });
}
function handleQuery(){
    const qStr = window.location.search;
    const urlParam = new URLSearchParams(qStr);
    const c = urlParam.get("q");
    loadCharacter(c);
}

function loadCharacter(c, options){
    var writer = HanziWriter.create('svg-target', c, options);
    if (options == null){
        // not called in recursive call
        options = {
            width: 200,
            height: 200, padding: 5, 
            showCharacter: false,
            showOutline: false,
            radicalColor: "#ff0000" 
        }
        HanziWriter.loadCharacterData(c).then(function(charData) {
            for (var i = 0; i < charData.strokes.length; i++) {
                var strokesPortion = charData.strokes.slice(0, i + 1);
                renderFanningStrokes(target, strokesPortion); 
                } 
        });
    }
    writer.quiz({onComplete: () => loadCharacter(c,
        options = {
            width: 201,
            height: 200,
            radicalColor: "#ff0000" 
        }
    )}) 
}
function handleChange(){
    let c = document.getElementById("input").value
    loadCharacter(c);
}

