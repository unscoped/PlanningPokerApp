"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/PlanningPokerApp/expo-service-worker.js",{scope:"/PlanningPokerApp/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}));