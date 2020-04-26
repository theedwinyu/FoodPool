const uniqid = require('uniqid');
const router = require('express').Router();
let Room = require('../models/rooms.model');


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

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/join').post((req, res) => {
  const shoplng = req.body.shoplng
  const shoplat = req.body.shoplat
  const userlng = req.body.lng
  const userlat = req.body.lat
  const username = req.body.name
  const usergid = req.body.gid
  const userorders = req.body.orders

  Room.find({gid:usergid}).then(rooms => {

    for(i in rooms){
      console.log(rooms[i])
      console.log(distance(rooms[i].lat,rooms[i].lng,userlat,userlng))
      if((distance(rooms[i].lat,rooms[i].lng,userlat,userlng) < 0.5) && rooms[i].users.length < 5){
        rooms[i].users.push(JSON.stringify({name:username,lat:userlat,lng:userlng}))
        rooms[i].orders.push(userorders)
        rooms[i].save()
          .then(()=>res.json(rooms[i].roomid))
          .catch(err => res.status(400).json('Error: ' + err));
        return
      }else{

      }
    }

    const lng = userlng
    const lat = userlat
    const gid = usergid
    const orders = [userorders]
    const roomid = uniqid()
    const users = [JSON.stringify({name:username,lat:userlat,lng:userlng})]

    const newRoom = new Room({
      shoplng,
      shoplat,
      orders,
      lng,
      lat,
      gid,
      roomid,
      users
    })

    newRoom.save()
      .then(() => res.json(roomid))
      .catch(err => res.status(400).json('Error: ' + err));
  })
});


router.route('/get').post((req, res) => {
  const roomid = req.body.roomid
  Room.findOne({roomid:roomid})
    .then(room=>{
      res.json(room)
    })
})


module.exports = router;