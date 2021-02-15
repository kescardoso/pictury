const makeObj = (jsonData) => {
    let retArr = jsonData.map((currObj, idx) => {
        let toMake = {}
        toMake.urls = currObj.urls
        toMake.downloads = currObj.links
        toMake.author = {
            username: currObj.user.username,
            full_name: currObj.user.name,
            profile_url: currObj.user.links.html
        }
        
        return toMake;
    })

    console.log(retArr);
}

module.exports = {
    makeObj
}