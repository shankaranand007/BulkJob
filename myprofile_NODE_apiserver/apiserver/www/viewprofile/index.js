/**********************************************************************************************
 *	Filename	: viewproilfe - index.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	
	/* Models is a place to define data structures and methods to interact with your data store.*/		
	viewPrfModel	= require('./models/vpmodel');
	OnlineStatus 	= require('./models/onlinemodel');
	latestAction 	= require('./models/lastactionmodel');
	bmViewSimilar 	= require('./models/bmviewsimilarfunc');
	bmfunidelmatch 	= require('./models/bmfuncvpidealmatch');
	bmdaily6func 	= require('./models/bmdailymatchaction');
	bmwhoviewed 	= require('./models/bmwhoalsoviewed');
	
	/* View  is a place to manage everything the end user sees on his or her screen)*/
	comunitcatInfo 	= require('./views/communicationInfo');
	partprfInfo 	= require('./views/partnerprefInfo');	
	personalInfo 	= require('./views/personalInfo');
	religousInfo 	= require('./views/religiousInfo');
	lifestyleinfo 	= require('./views/lifestyleInfo');
	locationInfo	= require('./views/locationInfo');
	profnalInfo 	= require('./views/professionalInfo');
	MutMatchInfo 	= require('./views/bmmutualmatchvp');
	familyInfo 		= require('./views/familyInfo');
	hobbiesInfo 	= require('./views/hobbiesInfo');
	horoscopeInfo 	= require('./views/horoscopeInfo');
	photoInfo 		= require('./views/photoInfo');
	otherInfo		= require('./views/otherInfo');
	
	/*Controller is a place to take user requests, bring data from the model and pass it back to the view*/
	vpController = require('./controllers/bmViewProfileController');
	
	app.get('/viewprofile',vpController.ViewProfile);
	app.post('/viewprofile',vpController.ViewProfile);
	app.get('/appviewprofile/appviewprofile.php',vpController.ViewProfile);
	app.post('/appviewprofile/appviewprofile.php',vpController.ViewProfile);
		
	app.get('/viewsimilarprofile',vpController.viewSimilarProfile);	
	app.post('/viewsimilarprofile',vpController.viewSimilarProfile);
	app.get('/appviewprofile/appviewsimilarprofile.php',vpController.viewSimilarProfile);	
	app.post('/appviewprofile/appviewsimilarprofile.php',vpController.viewSimilarProfile);
	
	app.get('/whoalsoviewed',vpController.whoviewedalsoviewed);		
	app.post('/whoalsoviewed',vpController.whoviewedalsoviewed);	
	app.get('/appviewprofile/appwhoviewedalsoviewed.php',vpController.whoviewedalsoviewed);		
	app.post('/appviewprofile/appwhoviewedalsoviewed.php',vpController.whoviewedalsoviewed);
	app.get('/OnlineStatus', vpController.OnlineStatus);
	
	bmviewedinsert = require('./controllers/bmInsertController');
	app.get('/viewedprofiletrack',bmviewedinsert.ViewedProfCont);
	app.post('/viewedprofiletrack',bmviewedinsert.ViewedProfCont);
	app.get('/appviewprofile/appviewedprofileinsert.php',bmviewedinsert.ViewedProfCont);
	app.post('/appviewprofile/appviewedprofileinsert.php',bmviewedinsert.ViewedProfCont);
	
	bmviewedinsert = require('./controllers/bmInsertController');
	app.get('/appviewprofile/viewedmyprofilestatsinsert.php',bmviewedinsert.ViewedMyProfSt);
	app.post('/appviewprofile/viewedmyprofilestatsinsert.php',bmviewedinsert.ViewedMyProfSt);
	
	bmviewedinsert = require('./controllers/bmInsertController');
	app.get('/appviewprofile/viewdailymatch.php',bmviewedinsert.AppDaily6Func);
	app.post('/appviewprofile/viewdailymatch.php',bmviewedinsert.AppDaily6Func);