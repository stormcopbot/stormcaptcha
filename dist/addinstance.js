var fs = require('fs');
const storage = require('electron-json-storage');


var SaveDataP1 = function(){      //Removes previous task arrays before inserting the next one
    fs.readFile(`${__dirname}/dist/instances.js`, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var s = data.split(/ instances/)[1]
  var remove = data.replace(s, '');
  fs.writeFile(`${__dirname}/dist/instances.js`, remove, function(err){});;

});

}
var SaveData = function(ARRY,Id) {                //Saving each Array

  var theArray =  "\n"+Id + "=" + JSON.stringify(ARRY)
  fs.appendFile(`${__dirname}/dist/instances.js`, theArray, function(err){});

}

function loginAuto(){
    const puppeteer = require('puppeteer');

    // This is where we'll put the code to get around the tests.
    const preparePageForTests = async (page) => {
      // Pass the User-Agent Test.
      const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
      await page.setUserAgent(userAgent);

      // Pass the Webdriver Test.
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });

      // Pass the Chrome Test.
      await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        window.navigator.chrome = {
          runtime: {},
          // etc.
        };
      });

      // Pass the Permissions Test.
      await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
          parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
        );
      });

      // Pass the Plugins Length Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
          // This just needs to have `length > 0` for the current test,
          // but we could mock the plugins too if necessary.
          get: () => [1, 2, 3, 4, 5],
        });
      });

      // Pass the Languages Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en'],
        });
      });
    }

    a($("#email").val(), $("#pass").val())
    async function a(email, pass) {
      console.log('asd')
        const browser = await puppeteer.launch({
              args: ['--no-sandbox', '--window-size=300,500', '--disable-infobars'],
              headless: false,
              defaultViewport: {
                  width: 400,
                  height: 500
              },
          });
        const page = await browser.newPage();

         // log in the account
         document.getElementById("loginStatus").innerHTML = "Starting...";
          await page.goto("https://www.gmail.com");
          await page.waitForSelector('#identifierId');
          await page.waitFor(100);
          document.getElementById("loginStatus").innerHTML = "Typing Email...";
        await page.type('#identifierId', email)
        await page.waitFor(100);
        await page.click('#identifierNext');

        // Stop function if user asks for it

        await page.waitFor(2500);
        await page.waitForSelector('input[type=password]');
        document.getElementById("loginStatus").innerHTML = "Typing Password...";
        await page.type('input[type=password]', pass)
        await page.waitFor(100);
        await page.waitForSelector('#passwordNext');
        document.getElementById("loginStatus").innerHTML = "Loging In...";
        await page.click('#passwordNext');
        await page.waitFor(100);

        try {
          await page.waitForSelector('.aAU')
          document.getElementById("loginStatus").innerHTML = "Successfully Logged In...";
          // ...
        } catch (error) {
          removeTask(x)
          await browser.close()
          document.getElementById("loginStatus").innerHTML = "Failed to Log In...";
        }

        var cookiess = await page.cookies("https://www.youtube.com","https://www.google.com")
        await browser.close()
        console.log(cookiess)
        addIn(undefined,cookiess)
        
    }
}


function loginManual(){
    const puppeteer = require('puppeteer');

    // This is where we'll put the code to get around the tests.
    const preparePageForTests = async (page) => {
      // Pass the User-Agent Test.
      const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
      await page.setUserAgent(userAgent);

      // Pass the Webdriver Test.
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });

      // Pass the Chrome Test.
      await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        window.navigator.chrome = {
          runtime: {},
          // etc.
        };
      });

      // Pass the Permissions Test.
      await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
          parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
        );
      });

      // Pass the Plugins Length Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
          // This just needs to have `length > 0` for the current test,
          // but we could mock the plugins too if necessary.
          get: () => [1, 2, 3, 4, 5],
        });
      });

      // Pass the Languages Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en'],
        });
      });
    }

    a()
    async function a() {

        const browser = await puppeteer.launch({
              args: ['--no-sandbox', '--window-size=300,500', '--disable-infobars'],
              headless: false,
              defaultViewport: {
                  width: 400,
                  height: 500
              },
          });
        const page = await browser.newPage();

         // log in the account
          await page.goto("https://www.gmail.com");


        try {
          await page.waitForSelector('.aAU')
          // ...
        } catch (error) {
          removeTask(x)
          await browser.close()
        }

        var cookiess = await page.cookies("https://www.youtube.com","https://www.google.com")
        await browser.close()
        console.log(cookiess)
        addIn(undefined,cookiess)
        
    }
}

function addIn(y,cookiess){

  if(y == undefined){
    // add New Task if doesnt exist yet, otherwise edit the esiting tab
      x=x+1

    var taskNumer = x
    taskNum.push(taskNumer)

    var run = true
    runs.push(run)

  
    var email = $("#email").val()
    emails.push(email);

    var pass = $("#pass").val()
    passes.push(pass);

    var proxy = $('#proxy').val()
    proxies.push(proxy)

  if(cookiess == undefined){
    var cookie = ''
    cookies.push(cookie);
  }else{
    var cookie = cookiess
    cookies.push(cookiess);
  }

  }else{
    // edit array of existing tab
    var Task = '<tr id="instance'+y+'" ><td>'+y+'</td><td id="profileArr'+y+'">'+emails[taskNum.indexOf(y)]+'</td><td id="proxy'+y+'">'+proxies[taskNum.indexOf(y)]+'</td><td><div class="status" id="results'+y+'">'+'Idle'+'<div></td><td id="actions'+y+'"><a style="margin-right:8px;" class="startTask" onclick="runs[taskNum.indexOf('+y+')] = true;main('+y+')""><img src="images/startTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a><a onclick="removeTask('+y+')" class="Remove"><img src="images/deleteTask_button.png" style="width: 14px;height: 14px;margin: auto;"></a><a onclick="editProduct('+y+')" style="margin-left:8px;"><img src="images/editTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a></td></tr><div><script>$("#results'+y+'").on("click", function(e){$(this).addClass("statusclicked");e.stopPropagation()});$("#urlArr'+y+'").on("click", function(e){$(this).addClass("productclicked");e.stopPropagation()})</script></div>'
    var Task1 = '<tr id="instance'+y+'" ><td>'+y+'</td><td id="profileArr'+y+'">'+emails[taskNum.indexOf(y)]+'</td><td id="proxy'+y+'">'+$("#proxy").val()+'</td><td><div class="status" id="results'+y+'">'+'Idle'+'<div></td><td id="actions'+y+'"><a style="margin-right:8px;" class="startTask" onclick="runs[taskNum.indexOf('+y+')] = true;main('+y+')""><img src="images/startTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a><a onclick="removeTask('+y+')" class="Remove"><img src="images/deleteTask_button.png" style="width: 14px;height: 14px;margin: auto;"></a><a onclick="editProduct('+y+')" style="margin-left:8px;"><img src="images/editTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a></td></tr><div><script>$("#results'+y+'").on("click", function(e){$(this).addClass("statusclicked");e.stopPropagation()});$("#urlArr'+y+'").on("click", function(e){$(this).addClass("productclicked");e.stopPropagation()})</script></div>'

    console.log(y)
      proxies[taskNum.indexOf(y)] = $("#proxy").val()
      //passes[taskNum.indexOf(y)] = $("#pass").val()

    // Change email on UI AJAX style
    $('tr:has(#results'+y+') td')[2].innerHTML = $("#proxy").val()
    // Edit task in index.html file
       EditTask(Task , Task1);
  }

  if(y == undefined){

    var Task = '<tr id="instance'+x+'" ><td>'+x+'</td><td id="profileArr'+x+'">'+email+'</td><td id="proxy'+x+'">'+proxy+'</td><td><div class="status" id="results'+x+'">'+'Idle'+'<div></td><td id="actions'+x+'"><a style="margin-right:8px;" class="startTask" onclick="runs[taskNum.indexOf('+x+')] = true;main('+x+')""><img src="images/startTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a><a onclick="removeTask('+x+')" class="Remove"><img src="images/deleteTask_button.png" style="width: 14px;height: 14px;margin: auto;"></a><a onclick="editProduct('+x+')" style="margin-left:8px;"><img src="images/editTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a></td></tr><div><script>$("#results'+x+'").on("click", function(e){$(this).addClass("statusclicked");e.stopPropagation()});$("#urlArr'+x+'").on("click", function(e){$(this).addClass("productclicked");e.stopPropagation()})</script></div><div class="TaskGen"></div>'

 
    $(document).ready(function() {        //adding task in the spot (so user sees without refreshing)

        var t = $('#instances').DataTable();
     
            t.row.add( [
                x,
                email,
                proxy,
                '<div class="status" id="results'+x+'">Idle</div>',
                '<div id="actions'+x+'"><a class="startTask" onclick="runs[taskNum.indexOf('+x+')] = true;main('+x+')"" style="margin-right:8px;"><img src="images/startTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a><a onclick="removeTask('+x+')" class="Remove"><img src="images/deleteTask_button.png" style="width: 14px;height: 14px;margin: auto;"></a><a onclick="editProduct('+x+')" style="margin-left:8px;"><img src="images/editTask_button.png" style="width: 9px;height: 12px;margin: auto;"></a></div>'
            ] ).draw( false );


            $('#results'+x).on("click", function(e){$(this).addClass("statusclicked");e.stopPropagation()})

    } );

    AddTask(Task);

        fs.readFile(`${__dirname}/dist/instances.js`, 'utf8', function (err,data) {         // Adding the array to file
          if (err) {
            return console.log(err);
          }
          var xBefore = 'var x = '+ (x-1)
          var xAfter = 'var x = ' + x

          var s = data.split(/ instances/)[1]
          var remove = data.replace(s, '').replace(xBefore, xAfter);
          fs.writeFile(`${__dirname}/dist/instances.js`, remove, function(err){
            if (err) { return console.log(err); 
            }else{

                SaveData(taskNum, 'taskNum')
                SaveData(emails, 'emails')
                SaveData(passes, 'passes')
                SaveData(proxies, 'proxies')
                SaveData(runs, 'runs')
                SaveData(cookies, 'cookies')

            }
          });;

        });

        $(function() {
                    var tar = $('#targets');
                    tar.fadeOut().animate({top: 0}, {duration: 'slow', queue: false}, function() {
                        //Animation complete.
                    });
                });

  }else{

      EditInstances()
                $(function() {
                    var tar = $('#targets');
                    tar.fadeOut().animate({top: 0}, {duration: 'slow', queue: false}, function() {
                        //Animation complete.
                    });
                });

  }

}

var EditInstances = function(){
  fs.readFile(`${__dirname}/dist/instances.js`, 'utf8', function (err,data) {         // Adding the array to file
          if (err) {
            return console.log(err);
          }
          var xBefore = 'var x = '+ (x)
          var xAfter = 'var x = ' + x

          var s = data.split(/ instances/)[1]
          var remove = data.replace(s, '').replace(xBefore, xAfter);
          fs.writeFile(`${__dirname}/dist/instances.js`, remove, function(err){
            if (err) { return console.log(err); 
            }else{

                SaveData(taskNum, 'taskNum')
                SaveData(emails, 'emails')
                SaveData(passes, 'passes')
                SaveData(proxies, 'proxies')
                SaveData(runs, 'runs')
                SaveData(cookies, 'cookies')

            }
          });;

        });
}

var EditTask = function(Task, Task1){           //Editing task in files (so it saves for later)
fs.readFile(`${__dirname}/index.html`, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

   var result = data.replace(Task, Task1);

  fs.writeFile(`${__dirname}/index.html`, result, 'utf8', function (err) {
     if (err) { return console.log(err); }
  });
});
}

var AddTask = function(Task){           //Adding task in files (so it saves for later)
fs.readFile(`${__dirname}/index.html`, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

   var result = data.replace('<div class="TaskGen"></div>', Task);

  fs.writeFile(`${__dirname}/index.html`, result, 'utf8', function (err) {
     if (err) { return console.log(err); }
  });
});
}


function removeAllTasks(){
for (ID = 0; taskNum.length > ID; ID += 1) {
(function(index) {
   setTimeout(function() { removeTask(taskNum[0])
}, ID * 300);
    })(ID);

$('#instances').DataTable();
var table = $('#instances').DataTable();
     
table.row( $("a[onclick='removeTask("+taskNum[ID]+")']").parents('tr') ).remove().draw();

}

fs.readFile(`${__dirname}/dist/instances.js`, 'utf8', function (err,data) {         // Adding the array to file
  if (err) {
    return console.log(err);
  }
  var xBefore = 'var x = '+ x
  var xAfter = 'var x = ' + '0'

  var s = data.split(/ instances/)[1]
  var remove = data.replace(s, '').replace(xBefore, xAfter);
  fs.writeFile(`${__dirname}/dist/instances.js`, remove, function(err){
    if (err) { return console.log(err); 
    }else{

        SaveData(taskNum, 'taskNum')
        SaveData(emails, 'emails')
        SaveData(passes, 'passes')
        SaveData(proxies, 'proxies')
        SaveData(runs, 'runs')
        SaveData(cookies, 'cookies')


    }
  });
})
}

var removeTask = function(num){                           //Removes task from index.html


    fs.readFile(`${__dirname}/index.html`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

  var regex = new RegExp('<tr id="instance' + num +'[\\s\\S]*?</tr><div><script>[\\s\\S]*?</script></div>');
    var Task = regex
    var result = data.replace(Task, '');

    fs.writeFile(`${__dirname}/index.html`, result, 'utf8', function (err) {
       if (err) { return console.log(err); }else{RemoveData(num)}
    });
  })

}

var RemoveData = function(v) {                                        //removing data during ajax use and saves it in file

var index = taskNum.indexOf(v);


taskNum.splice(index, 1);
emails.splice(index,1);
passes.splice(index,1);
proxies.splice(index,1);
runs.splice(index,1);
cookies.splice(index,1);

  fs.readFile(`${__dirname}/dist/instances.js`, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var s = data.split(/ instances/)[1]
  var remove = data.replace(s, '')
  fs.writeFile(`${__dirname}/dist/instances.js`, remove, function(err){
    if (err) { return console.log(err); 
    }else{

        SaveData(taskNum, 'taskNum')
        SaveData(emails, 'emails')
        SaveData(passes, 'passes')
        SaveData(proxies, 'proxies')
        SaveData(runs, 'runs')
        SaveData(cookies, 'cookies')

    }
  });;


});
}


//Dactivate copy
function deactivate(){


storage.getMany([ 'password', 'username' ], function(error, data) {
          if (error) throw error;


  var confaig = {
    apiKey: "AIzaSyDKNCman0AZSkudLnqZ6ZLv-Y-Pp9jdhlw",
    authDomain: "stormcaptcha-dc67d.firebaseapp.com",
    databaseURL: "https://stormcaptcha-dc67d.firebaseio.com",
    projectId: "stormcaptcha-dc67d",
    storageBucket: "stormcaptcha-dc67d.appspot.com",
    messagingSenderId: "659785301892"
  };
  firebase.initializeApp(confaig);



  var username = data.username
  var password = data.password

firebase.auth().signInWithEmailAndPassword(username, password).then(function(user) {


      firebase.database().ref('users/' + user.uid).set({
                    deviceID: null,
                }).then(function(){
                  firebase.auth().signOut().then(function(){
                    window.resizeTo(300, 250);
                    window.location.replace(`${__dirname}/addTask.html`);
                  })

                })

      storage.remove('uuid', function(error) {
        if (error) throw error;
      });
      storage.remove('useruid', function(error) {
        if (error) throw error;
      });

      fs.readFile(`${__dirname}/main.js`, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                var s = data.split("/*login*")[0]
                var remove = data.replace(s, 'var userlog="' +"" +'";'+'var passwordlog="'+""+'";');
                fs.writeFile(`${__dirname}/main.js`, remove, function(err){});;

              });
        });
 //location.reload()
     // user signed in
})

  /*
  var confaig = {
    apiKey: "AIzaSyDBBt8cVR1dmk9sNf0Kiy3rBBVtihzG6Kc",
    authDomain: "stormcop-203622.firebaseapp.com",
    databaseURL: "https://stormcop-203622.firebaseio.com",
    projectId: "stormcop-203622",
    storageBucket: "stormcop-203622.appspot.com",
    messagingSenderId: "983079086163"
  };
  firebase.initializeApp(confaig);

firebase.database().ref('users/' + useruid).set({
              deviceID: null,
          }).then(function(){
            firebase.auth().signOut().then(function(){
              window.resizeTo(300, 355);
              window.location.replace(`${__dirname}/addTask.html`);
            })

          })

storage.remove('uuid', function(error) {
  if (error) throw error;
});
storage.remove('useruid', function(error) {
  if (error) throw error;
});

fs.readFile(`${__dirname}/main.js`, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          var s = data.split("/*login*")[0]
          var remove = data.replace(s, 'var userlog="' +"" +'";'+'var passwordlog="'+""+'";');
          fs.writeFile(`${__dirname}/main.js`, remove, function(err){});;

        });

//firebase.auth().signOut()

*/

}