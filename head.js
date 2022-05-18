// head.js
// Runs before the body loads to handle error redirects

if (!window.location.hash){
    console.log("Redirecting to hash routes...");
    window.location.replace(`${window.location.origin}/#/${window.location.search}`);
}
