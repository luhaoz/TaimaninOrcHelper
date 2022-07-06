import { app, BrowserWindow } from "electron"
import path from "path"
export  class Application{
    static path(){
        let _path = {
            root:"",
            runtime:""
        };

        if(process.env.NODE_ENV === "dev"){
            let _runtime_resolve =  path.resolve(app.getAppPath());
            _path.root = _runtime_resolve;
        }else{
            let _runtime = path.join(app.getAppPath(),"..","..");
            let _runtime_resolve =  path.resolve(_runtime);
            _path.root = _runtime_resolve;
        }

        _path.runtime = path.join(_path.root,"runtime");
        return _path;
    }
}