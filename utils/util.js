function covertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=1;i<=5;i++){
    if(i <= num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

function processData(data){
  var movies = [];
  //解析获取的电影数据
  for (var idx in data.subjects) {
    var subject = data.subjects[idx];
    var title = subject.title;
    if (title.length >= 6) {
      title = title.substring(0, 6) + "...";
    }

    var temp = {
      title: title,
      coverageUrl: subject.images.large,
      average: subject.rating.average,
      moveId: subject.id,
      stars: covertToStarsArray(subject.rating.stars)
    };
    movies.push(temp);
  }
  return movies;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "content-type": "application/xml;"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  processData: processData,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  covertToStarsArray: covertToStarsArray
}