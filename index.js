/**
 * rewrite file-loader
 * add path arguments to change require path
 */
	
var loaderUtils = require("loader-utils");

module.exports = function(content) {
    this.cacheable && this.cacheable();
    if(!this.emitFile) throw new Error("emitFile is required from module system");
    var query = loaderUtils.parseQuery(this.query);

	// console.log(query)
    var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
        context: query.context || this.options.context,
        content: content,
        regExp: query.regExp
    });

    var path = (query.path)&& loaderUtils.interpolateName(this, query.path, {
        context: query.context || this.options.context,
        content: content,
        regExp: query.regExp
    });
	// console.log(path)
	// console.log(url)
	path = path || url 
    this.emitFile(url, content);
    return "module.exports = __webpack_public_path__ + " + JSON.stringify(path);
}
module.exports.raw = true;
