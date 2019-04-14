//Add if page show "Inventory issues", or basically when sold out, refresh and wait for it to change.

const puppeteer = require('puppeteer');
var randomWords = require('random-words');


var cookiess


	var start = +new Date(); //This and console.log at sucesss were added to check for time



function runAllTasks(){
	var ID = null;
	for (ID = 0; taskNum.length > ID; ID += 1) {			//START ASLL TASKS
				console.log(taskNum[ID])
				runs[ID] = true;
				main(taskNum[ID])

	}
}

function stopAllTasks(){
	var ID = null;
	for (ID = 0; taskNum.length > ID; ID += 1) {			//START ASLL TASKS
		console.log(taskNum[ID])
				runs[ID] = false
				stopTask(taskNum[ID])
	}
}

	function main(ID){
		console.log(ID)

		var el = document.querySelector('#actions'+ID+' .startTask');

		var newEl = document.createElement('a');
		newEl.innerHTML = '<a class="stopTask" onclick="runs[taskNum.indexOf('+ID+')] = false;stopTask('+ID+')" style="margin-right:8px;"><img src="images/stopTask_button.png" style="width: 10px;height: 12px;margin: auto;"></a>';

		// replace el with newEL
		el.parentNode.replaceChild(newEl, el);

		document.getElementById("results"+ID).innerHTML = "Starting...";


		if((runs[taskNum.indexOf(ID)]) == false){
			document.getElementById("results"+ID).innerHTML = "Stopped";
    		return;  // Function will terminate here if this is encountered
  		}
	// We'll use Puppeteer is our browser automation framework.
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

		(async () => {
		  // Launch the browser in headless mode and set up a page.

		 	if(cookies[taskNum.indexOf(ID)] == ""){
		 		const browser = await puppeteer.launch({
		              args: ['--no-sandbox', '--window-size=300,500', '--disable-infobars'],
		              headless: true,
		              defaultViewport: {
		                  width: 400,
		                  height: 500
		              },
		          });
				  const page = await browser.newPage();
				  
				  // Prepare for the tests (not yet implemented).
				  await preparePageForTests(page);
			  // log in the account
			    await page.goto("https://www.gmail.com");
			    document.getElementById("loginStatus").innerHTML = "Logging In...";
			    await page.waitForSelector('#identifierId');
			    await page.waitFor(100);
			    document.getElementById("loginStatus").innerHTML = "Typing Email...";
				await page.type('#identifierId', emails[taskNum.indexOf(ID)])
				await page.waitFor(100);
				await page.click('#identifierNext');
	  			//
				await page.waitFor(100);
				document.getElementById("loginStatus").innerHTML = "Typing password...";
				await page.type('input[type=password]', passes[taskNum.indexOf(ID)])
				await page.waitFor(100);
				await page.click('#passwordNext');
				document.getElementById("loginStatus").innerHTML = "Logging In...";
				await page.waitFor(100);

				try {
				  await page.waitForSelector('.aAU')
				  document.getElementById("loginStatus").innerHTML = "Sucessfully logged in";
				  // ...
				} catch (error) {
					await browser.close()
				  	document.getElementById("loginStatus").innerHTML = "Failed to log in";
				}

				var cookiess = await page.cookies("https://www.youtube.com","https://www.google.com")

				console.log(cookiess)
				cookies[taskNum.indexOf(ID)] = cookiess
				
				EditInstances()

				await browser.close()

				await videoWatching(ID, cookies[taskNum.indexOf(ID)])


				if(proxies[taskNum.indexOf(ID)].split(":").length > 1){
					var IP_PORT = proxies[taskNum.indexOf(ID)].split(":")[0] + ':' + proxies[taskNum.indexOf(ID)].split(":")[1]
				}else{
					var IP_PORT = ''
				}

					//Search random stuff in google x 1
					const browser1 = await puppeteer.launch({
					    args: ['--no-sandbox', '--proxy-server='+IP_PORT],
					    headless: true,
					  });
					const page1 = await browser.newPage();
					if(proxies[taskNum.indexOf(ID)].split(":").length > 3){
						await page1.authenticate({'username': proxies[taskNum.indexOf(ID)].split(":")[2], 'password': proxies[taskNum.indexOf(ID)].split(":")[3]});
						await page1.setExtraHTTPHeaders({
							'Proxy-Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64'),
						})
					}
					await preparePageForTests(page1)

				await googleSurfing(ID, browser1, page1, cookies[taskNum.indexOf(ID)])

				// Stop function if user asks for it
				if((runs[taskNum.indexOf(ID)]) == false){
					document.getElementById("results"+ID).innerHTML = "Idle";
					await browser.close()
	    			return;  // Function will terminate here if this is encountered
  				}

				}else{

				

			  			//

						await videoWatching(ID, cookies[taskNum.indexOf(ID)])


					if(proxies[taskNum.indexOf(ID)].split(":").length > 1){
						var IP_PORT = proxies[taskNum.indexOf(ID)].split(":")[0] + ':' + proxies[taskNum.indexOf(ID)].split(":")[1]
					}else{
						var IP_PORT = ''
					}

						//Search random stuff in google x 1
						const browser1 = await puppeteer.launch({
						    args: ['--no-sandbox', '--proxy-server='+IP_PORT],
						    headless: true,
						  });
						const page1 = await browser1.newPage();
						if(proxies[taskNum.indexOf(ID)].split(":").length > 3){
							await page1.authenticate({'username': proxies[taskNum.indexOf(ID)].split(":")[2], 'password': proxies[taskNum.indexOf(ID)].split(":")[3]});
							await page1.setExtraHTTPHeaders({
								'Proxy-Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64'),
							})
						}

						await googleSurfing(ID, browser1, page1, cookies[taskNum.indexOf(ID)])
						


					  
					  // Clean up.
					  //await browser.close()
				}
		})();

	}

async function googleSurfing(ID, browser, page, savedCookies){

	try { 
		let cookie = savedCookies
	    await page.setCookie(...cookie)
	    await page.goto("https://www.google.com");
		await page.waitFor(4000);
		document.getElementById("results"+ID).innerHTML = "Running...";
		// Stop function if user asks for it

		if((runs[taskNum.indexOf(ID)]) == false){
			document.getElementById("results"+ID).innerHTML = "Idle";
			await browser.close()
	    	return;  // Function will terminate here if this is encountered
	  	}

	  	//
		var numberOfWords = Math.floor(Math.random() * 6);

		const elementHandle=await page.$('input[title=Search]');
		await elementHandle.click();
		await elementHandle.focus();
		// click three times to select all
		await elementHandle.click({clickCount: 3});
		await elementHandle.press('Backspace');

		await page.type('input[title=Search]', randomWords({ exactly: numberOfWords, join: ' ' }))
		await page.waitFor(4000);
		await page.keyboard.press('Enter')
		await page.waitFor(420000);
		await googleSurfing(ID, browser, page, savedCookies)
	} catch (error) {
		await browser.close()
		console.log('Error')
	}
}


async function videoWatching(ID, savedCookies){

	if(proxies[taskNum.indexOf(ID)].split(":").length > 1){
		var IP_PORT = proxies[taskNum.indexOf(ID)].split(":")[0] + ':' + proxies[taskNum.indexOf(ID)].split(":")[1]
	}else{
		var IP_PORT = ''
	}

		//Search random stuff in google x 1
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--proxy-server='+IP_PORT],
			headless: true,
		});
		const page = await browser.newPage();
			if(proxies[taskNum.indexOf(ID)].split(":").length > 3){
				await page.authenticate({'username': proxies[taskNum.indexOf(ID)].split(":")[2], 'password': proxies[taskNum.indexOf(ID)].split(":")[3]});
				await page.setExtraHTTPHeaders({
					'Proxy-Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64'),
				})
			}

    let cookie = savedCookies
    await page.setCookie(...cookie)
    await page.goto("https://www.youtube.com/feed/trending")

    await page.evaluate(() => {
    	var items = document.querySelectorAll('#grid-container .yt-img-shadow')


		var item = items[Math.floor(Math.random()*items.length)];

		item.click()
    })
    checkIfStopped()
// Stop function if user asks for it
	async function checkIfStopped(){
		if((runs[taskNum.indexOf(ID)]) == false){
			document.getElementById("results"+ID).innerHTML = "Idle";
			await browser.close()
	    	return;  // Function will terminate here if this is encountered
	  	}else{
	  		if(document.getElementById("results"+ID) == null){
	  			await browser.close()
	    		return;
	  		}else{
	  			setTimeout(function(){ checkIfStopped() }, 15000);
	  		}
	  	}
	 }

//

}