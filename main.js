const cv = require("opencv4nodejs");

const Detection = require("./src/Classes/Detection");
const Vision = require("./src/Classes/Vision");
const WindowCapture = require("./src/Classes/WindowCapture");


const wincap = new WindowCapture("PokeMMO\0");
const vision = new Vision();
const detector = new Detection("./images/battledetect/horder.jpg", 'horda', 0.98);
detector.start();

async function run() {
    console.log('start main');
    let time = new Date().getTime();
    // await wincap.print();
    
    while(true){
        const print = await wincap.print();
        // console.log('print',print);

        // detector.run("./images/horder.jpg");
        // detector.run("screenshot.jpg");

        const base64Data = print.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
        // const screenshot = cv.imdecode(base64Data, cv.IMREAD_UNCHANGED)
        detector.run(Buffer.from(base64Data, 'base64'));

        if(detector.points){
            // console.log('detector.points', detector.points)
            const pointsHorder = detector.points.find(point => point.tagname === 'horda');
            // console.log('pointsHorder', pointsHorder);

            if(pointsHorder){
                pointsHorder.locations.forEach(point => {
                    vision.draw_rectangles(detector.screenshot,{
                        x: point.x, y: point.y, w: pointsHorder.w, h: pointsHorder.h
                    },{B: 0, G:255, B:0});                    
                });
            }
        }

        cv.imshow("Matches", detector.screenshot);
        // cv.imshow("Matches", screenshot);
        const key = cv.waitKey(1)
        // if(key !== -1){
        //     console.log('key', key)
        // }
        if (key === 113){        
            detector.stop();
            cv.destroyAllWindows();
            break;
        }
        console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
        time = new Date().getTime();
    }
}

run();