export class StyleDebug {
    static view = () => {
        return {
            //backgroundColor: "white",
            borderColor: StyleDebug.getRandomColor(),
            borderWidth: 1
        };
    };
    
    static getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color   = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
