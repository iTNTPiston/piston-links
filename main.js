(()=>{
    var assemble = function(uobj, query){
        if(uobj["_q"] && query){
            return `${uobj["_u"]}${uobj["_q"]}&${query.substring(1)}`;
        }else{
            return `${uobj["_u"]}${uobj["_q"] || ""}${query || ""}`;
        }
    }
    var dump = function(obj, query, path){
        if(obj["_u"]){
            document.write(`<div><a href="${assemble(obj, query)}" rel="noreferrer" target="_blank">${path}</a></div>`);
        }else{
            for(var k in obj){
                dump(obj[k], query, path+"/"+k);
            }
        }
    }
    console.log(routes);
    console.log(window.location);
    // Get hash
    var hash = window.location.hash;
    var cleanHash = hash.replace(/[^a-zA-Z0-9\/?\-]/g, "");
    if(cleanHash.length && cleanHash[0] === "/"){
        cleanHash = cleanHash.substring(1);
    }
    // parse query part
    var qIndex = cleanHash.indexOf("?");
    var query = "";
    if(qIndex >= 0) {
        query = cleanHash.substring(qIndex);
        cleanHash = cleanHash.substring(0, qIndex);
    }
    var paths = cleanHash.split("/").filter(x=>x);
    var target = paths.reduce((acc, val)=>{
        return acc ? (acc[val] || undefined) : undefined;
    }, routes)
    console.log(paths);
    console.log(target);
    console.log(query);
    if(!target){
        document.write("<div>ln: cannot resolve path</div>");
        document.write("<div>Available:</div>");
        dump(routes, query, "");
    }else if(target["_u"]){
        window.location.replace(assemble(target, query));
    }else{
        document.write("<div>ln: partially resolved path</div>");
        document.write("<div>Available subpaths:</div>");
        dump(target, query, "");
    }
})();
