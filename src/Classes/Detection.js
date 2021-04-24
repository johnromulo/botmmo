const cv = require("opencv4nodejs");
// const { Worker,  isMainThread, parentPort } = require("worker_threads");

class Detection {
    stopped = true;
    screenshot= null;
    objects = [];
    points = [];
    worker = null;

    constructor(img_obj_path, tagname,threshold){
        const img  = cv.imread(img_obj_path, cv.IMREAD_UNCHANGED);   
        this.objects.push({img, tagname: tagname, threshold});
    }

    // {'path': './images/battledetect/my_hp_2.jpg', 'name': 'myhp' , 'threshold': 0.9 }
    // constructor(imgs){
    //     this.objcts = imgs.map(img => {
    //         const img = cv.imread(img_obj_pathm, cv.TM_CCOEFF_NORMED);
    //         return {img, tagname: img.tagname, threshold: img.threshold};            
    //     })
    // }

    start(){
        console.log('start');            
        this.stopped = false;
    }

    stop(){
        this.stopped = true;
    }

    run(screenshot){
        // this.screenshot = cv.imread(screenshot, cv.IMREAD_UNCHANGED);
        this.screenshot = cv.imdecode(screenshot, cv.IMREAD_UNCHANGED);
        // console.log('this.screenshot' , this.screenshot)
        if(!this.stopped && this.screenshot){
            this.points = this.objects.map(obj => {
                const matched = this.screenshot.matchTemplate(obj.img, cv.TM_CCOEFF_NORMED);

                // threshold tested 0.98
                const locations = matched
                    .threshold(obj.threshold, 1, cv.THRESH_BINARY)
                    .convertTo(cv.CV_8U)
                    .findNonZero();

                    return ({locations, tagname: obj.tagname, w: obj.img.cols, h: obj.img.rows });
            }); 
        }       
    }
}

module.exports = Detection;
