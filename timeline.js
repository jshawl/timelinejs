Timeline = (function(global){
  return function( selector, data, options ){
    var target = document.querySelector(selector)
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.setAttribute("preserveAspectRatio", "none")
    var path = document.createElementNS('http://www.w3.org/2000/svg',"path")
    path.setAttribute("d",line(data))
    path.setAttribute("vector-effect","non-scaling-stroke")
    path.setAttribute("width","100")
    path.setAttribute("height","100")
    svg.appendChild(path)
    target.appendChild(svg)
  }

  function scale(domain, range){
    var istart = domain[0],
	istop  = domain[1],
	ostart = range[0],
	ostop  = range[1]

    return function (value) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
    }
  }

  function line(points){
    var scaleX = scale([0,5],[0,100])
    var scaleY = scale([0,4],[0,100])
    var start = points.shift()
    return `M ${start.x} ${start.y} L ${start.x} ${start.y} ` + points.map( point => {
      return `L ${scaleX(point.x)} ${scaleY(point.y)}`
    })
  }

})(window)
