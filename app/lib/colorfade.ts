var startColor = [255, 0, 0];
var endColor = [185, 255, 15];

export function getColorFade(percent: number){
    const fraction = percent / 100;
    return colorString(
        average(startColor[0], endColor[0], fraction),
        average(startColor[1], endColor[1], fraction),
        average(startColor[2], endColor[2], fraction)
    );
}

function colorString(r: number, g: number, b: number){
    r = Math.min(255, Math.max(0, Math.round(r)));
    g = Math.min(255, Math.max(0, Math.round(g)));
    b = Math.min(255, Math.max(0, Math.round(b)));
    return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2)
}
    
function average(a: number, b: number, fraction: number) {
    var a_2 = Math.pow(a, 2);
    var b_2 = Math.pow(b, 2);
    var c_2 = a_2 + (b_2 - a_2) * fraction
    return Math.pow(c_2, 1/2);
}