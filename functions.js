function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}

function swap (alphabets, index1, index2) {
    var temp = alphabets[index1];
    alphabets[index1] = alphabets[index2];
    alphabets[index2] = temp;
    return alphabets;
}

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }

function totDist(nodes){
    if(nodes.length <= 1){
        return 0
    }

    let td = 0

    for(i = 1 ; i<nodes.length;i++){
        td += distance(nodes[i-1].lat,nodes[i-1].lng,nodes[i].lat,nodes[i].lng)
    }

    return td
}

function bestDist (shop,home,nodes){
    nodeperms = permutator(nodes)
    if(nodes.length == 0){
        return distance(home.lat,home.lng,shop.lat,shop.lng)*2
    }
    bd = distance(home.lat,home.lng,shop.lat,shop.lng)
    minpermd = Number.MAX_VALUE
    minperm = null

    for (perm in nodeperms){
        permd = distance(shop.lat,shop.lng,nodeperms[perm][0].lat,nodeperms[perm][0].lng) + distance(nodeperms[perm][perm.length - 1].lat,nodeperms[perm][perm.length - 1].lng,home.lat,home.lng)
        permd += totDist(nodeperms[perm])

        if(permd < minpermd){
            minpermd = permd
            minperm = [home,shop,...nodeperms[perm],home]
        }
    } 

    return {route:minperm,distance:minpermd}

}
loclst = [{name:"3432florida",lat:33.981078,lng:-117.328670},{name:"1402avocado",lat:33.981786,lng:-117.326646},{name:"3360 Utah Street",lat:33.980299,lng:-117.327117},{name:"848peach",lat:33.980257,lng:-117.329830},{name:"861cherry",lat:33.981744,lng: -117.330150}]
shop = {name:"mcd",lat:33.975300,lng: -117.359168}
for(x in loclst){
    nlst = [...loclst]
    nlst.splice(x,1)
    console.log(bestDist(shop,loclst[x],nlst))
}

console.log(JSON.parse(JSON.stringify({name:"fuck",lng:1,lat:2})))