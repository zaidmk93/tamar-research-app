window.onload = function() {
      try {
        var url_string = "https://research-tasks-multi-lang.herokuapp.com/".toLowerCase();
        var url = new URL(url_string);
        var i.project = url.searchParams.get("i.project");
        var i.user1 = url.searchParams.get("i.user1");
        var id = url.searchParams.get("id");
        console.log(i.project+ " and "+i.user1+ " and "+id);
      } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
      }
}

