module.exports = function(source, inputSourceMap) {
  this.cacheable();
  const transformedCode = 'export default ' + JSON.stringify(
    source.replace(/[ \t]*\/\/.*\n/g, '') // remove //
     .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
     .replace(/\n{2,}/g, '\n') // # \n+ to \n
  ) + ';';
  this.callback(null, transformedCode, inputSourceMap);
};